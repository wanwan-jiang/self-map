interface AskQwenResponse {
  success: true;
  data: {
    content: string;
  };
}

interface AskQwenError {
  success: false;
  message: string;
}

/** 流式对话最多尝试次数（含首次请求） */
const CHAT_STREAM_MAX_ATTEMPTS = 3;
/** 重试间隔基数（毫秒），实际为 base * 2^attemptIndex */
const CHAT_STREAM_RETRY_BASE_MS = 800;

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * @description 判断是否适合自动重试（瞬时故障、限流、服务端错误）。
 */
const isRetryableHttpStatus = (status: number): boolean =>
  status === 429 || (status >= 500 && status < 600);

type StreamAttemptResult =
  | { kind: "success"; fullText: string }
  | { kind: "retry"; detail: string }
  | { kind: "fatal"; detail: string };

/**
 * @description 单次拉流：成功返回全文；可重试的失败返回 retry；不应再试的返回 fatal。
 */
const consumeChatStreamOnce = async (
  message: string,
  onDelta: (text: string, fullText: string) => void,
): Promise<StreamAttemptResult> => {
  let response: Response;
  try {
    response = await fetch("/api/chat/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message.trim() }),
    });
  } catch {
    return { kind: "retry", detail: "网络异常，连接中断" };
  }

  if (!response.ok) {
    const errorText = await response.text();
    const detail = errorText || `请求失败：${response.status}`;
    if (isRetryableHttpStatus(response.status)) {
      return { kind: "retry", detail };
    }
    return { kind: "fatal", detail };
  }

  if (!response.body) {
    return { kind: "fatal", detail: "浏览器不支持流式读取" };
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";
  let sseErrorDetail = "";

  try {
    while (true) {
      let chunk: ReadableStreamReadResult<Uint8Array>;
      try {
        chunk = await reader.read();
      } catch {
        return fullText.trim().length > 0
          ? { kind: "success", fullText }
          : { kind: "retry", detail: "流式传输中断" };
      }

      const { done, value } = chunk;
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split("\n\n");
      buffer = events.pop() ?? "";

      for (const eventChunk of events) {
        const line = eventChunk.split("\n").find((eventLine) => eventLine.startsWith("data: "));
        if (!line) {
          continue;
        }

        const payload = line.slice(6).trim();
        if (payload === "[DONE]") {
          continue;
        }

        try {
          const parsed = JSON.parse(payload) as {
            content?: string;
            error?: string;
          };
          if (parsed.error) {
            sseErrorDetail = parsed.error;
            continue;
          }

          const delta = parsed.content ?? "";
          if (!delta) {
            continue;
          }

          fullText += delta;
          onDelta(delta, fullText);
        } catch {
          // 兜底忽略无效的 SSE 分片。
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  if (fullText.trim().length > 0) {
    return { kind: "success", fullText };
  }

  if (sseErrorDetail) {
    return { kind: "retry", detail: sseErrorDetail };
  }

  return { kind: "retry", detail: "未收到有效回复，可能是服务暂时不可用" };
};

export interface UseChatAIReturn {
  isAsking: Ref<boolean>;
  errorMessage: Ref<string>;
  askQwen: (message: string) => Promise<string | null>;
  askQwenStream: (message: string, onDelta: (text: string, fullText: string) => void) => Promise<string | null>;
}

export function useChatAI(): UseChatAIReturn {
  const isAsking = ref(false);
  const errorMessage = ref("");

  const askQwen = async (message: string): Promise<string | null> => {
    if (!message.trim()) {
      errorMessage.value = "请输入问题内容";
      return null;
    }

    isAsking.value = true;
    errorMessage.value = "";

    try {
      const res = await $fetch<AskQwenResponse | AskQwenError>("/api/chat/ask", {
        method: "POST",
        body: { message: message.trim() },
      });

      if (!res.success) {
        errorMessage.value = res.message;
        return null;
      }

      return res.data.content;
    } catch (error: unknown) {
      errorMessage.value = error instanceof Error ? error.message : "请求失败，请稍后重试";
      return null;
    } finally {
      isAsking.value = false;
    }
  };

  const askQwenStream = async (
    message: string,
    onDelta: (text: string, fullText: string) => void,
  ): Promise<string | null> => {
    if (!message.trim()) {
      errorMessage.value = "请输入问题内容";
      return null;
    }

    const trimmed = message.trim();
    isAsking.value = true;
    errorMessage.value = "";

    try {
      for (let attempt = 0; attempt < CHAT_STREAM_MAX_ATTEMPTS; attempt++) {
        if (attempt > 0) {
          const waitMs = CHAT_STREAM_RETRY_BASE_MS * 2 ** (attempt - 1);
          errorMessage.value = `请求失败，${Math.round(waitMs / 1000)} 秒后重试（${attempt + 1}/${CHAT_STREAM_MAX_ATTEMPTS}）…`;
          await sleep(waitMs);
          errorMessage.value = "";
          onDelta("", "");
        }

        const result = await consumeChatStreamOnce(trimmed, onDelta);

        if (result.kind === "success") {
          return result.fullText || null;
        }

        if (result.kind === "fatal") {
          errorMessage.value = result.detail;
          return null;
        }

        const isLast = attempt === CHAT_STREAM_MAX_ATTEMPTS - 1;
        if (isLast) {
          errorMessage.value = result.detail;
          return null;
        }
      }

      return null;
    } catch (error: unknown) {
      errorMessage.value = error instanceof Error ? error.message : "请求失败，请稍后重试";
      return null;
    } finally {
      isAsking.value = false;
    }
  };

  return {
    isAsking,
    errorMessage,
    askQwen,
    askQwenStream,
  };
}
