import OpenAI from "openai";

interface AskQwenBody {
  message: string;
}

/**
 * @description 调用 Qwen 兼容接口，并以 SSE 方式流式返回文本片段。
 * @param event H3 请求事件
 * @returns SSE 响应流
 */
export default defineEventHandler(async (event): Promise<Response> => {
  const body = await readBody<AskQwenBody>(event);
  const message = body?.message?.trim();

  if (!message) {
    throw createError({
      statusCode: 400,
      message: "message 不能为空",
    });
  }

  const config = useRuntimeConfig(event);
  const apiKey = config.qwenApiKey;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: "服务端未配置 QWEN_API_KEY",
    });
  }

  const openai = new OpenAI({
    apiKey,
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const completion = await openai.chat.completions.create({
          model: "qwen-plus",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: message },
          ],
          stream: true,
        });

        for await (const chunk of completion) {
          const delta = chunk.choices?.[0]?.delta?.content ?? "";

          if (!delta) {
            continue;
          }
          const payload = JSON.stringify({ content: delta });

          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error: unknown) {
        const messageText = error instanceof Error ? error.message : "调用模型失败，请稍后重试";
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: messageText })}\n\n`));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
});
