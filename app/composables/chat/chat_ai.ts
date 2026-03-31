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

export interface UseChatAIReturn {
    isAsking: Ref<boolean>;
    errorMessage: Ref<string>;
    askQwen: (message: string) => Promise<string | null>;
    askQwenStream: (
        message: string,
        onDelta: (text: string, fullText: string) => void
    ) => Promise<string | null>;
}

export function useChatAI(): UseChatAIReturn {
    const isAsking = ref(false);
    const errorMessage = ref('');

    const askQwen = async (message: string): Promise<string | null> => {
        if (!message.trim()) {
            errorMessage.value = '请输入问题内容';
            return null;
        }

        isAsking.value = true;
        errorMessage.value = '';

        try {
            const res = await $fetch<AskQwenResponse | AskQwenError>('/api/chat/ask', {
                method: 'POST',
                body: { message: message.trim() },
            });

            if (!res.success) {
                errorMessage.value = res.message;
                return null;
            }

            return res.data.content;
        } catch (error: unknown) {
            errorMessage.value =
                error instanceof Error ? error.message : '请求失败，请稍后重试';
            return null;
        } finally {
            isAsking.value = false;
        }
    };

    const askQwenStream = async (
        message: string,
        onDelta: (text: string, fullText: string) => void
    ): Promise<string | null> => {
        if (!message.trim()) {
            errorMessage.value = '请输入问题内容';
            return null;
        }

        isAsking.value = true;
        errorMessage.value = '';

        try {
            const response = await fetch('/api/chat/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message.trim() }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                errorMessage.value = errorText || `请求失败：${response.status}`;
                return null;
            }

            if (!response.body) {
                errorMessage.value = '浏览器不支持流式读取';
                return null;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let fullText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }

                buffer += decoder.decode(value, { stream: true });
                const events = buffer.split('\n\n');
                buffer = events.pop() ?? '';

                for (const eventChunk of events) {
                    const line = eventChunk
                        .split('\n')
                        .find((eventLine) => eventLine.startsWith('data: '));
                    if (!line) {
                        continue;
                    }

                    const payload = line.slice(6).trim();
                    if (payload === '[DONE]') {
                        continue;
                    }

                    try {
                        const parsed = JSON.parse(payload) as {
                            content?: string;
                            error?: string;
                        };
                        if (parsed.error) {
                            errorMessage.value = parsed.error;
                            continue;
                        }

                        const delta = parsed.content ?? '';
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

            return fullText || null;
        } catch (error: unknown) {
            errorMessage.value =
                error instanceof Error ? error.message : '请求失败，请稍后重试';
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
