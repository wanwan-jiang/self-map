/**
 * @description 流式文案长时间仍为空时标记超时；收到非空正文后清除定时器并重置标记。
 */

export const STREAM_TEXT_LOADING_TIMEOUT_MS = 60_000;

export const STREAM_TEXT_TIMEOUT_HINT = '请稍候或刷新页面重试';

export interface UseStreamTextLoadingTimeoutOptions {
    /** @description 无正文判定为超时的毫秒数 */
    timeoutMs?: number;
}

/**
 * @description 挂载后若 `getText` 持续为空则 `timedOut` 为 true，适用于 AI 流式占位与重试提示。
 * @param getText 读取当前文案（如 `() => props.aiCareerText`）
 * @param options 可选超时毫秒数，默认 `STREAM_TEXT_LOADING_TIMEOUT_MS`
 * @returns 超时且仍为空时为 true 的 ref
 */
export const useStreamTextLoadingTimeout = (
    getText: () => string | undefined,
    options?: UseStreamTextLoadingTimeoutOptions,
) => {
    const timeoutMs = options?.timeoutMs ?? STREAM_TEXT_LOADING_TIMEOUT_MS;
    const timedOut = ref(false);
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const clearTimer = (): void => {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
            timeoutId = undefined;
        }
    };

    watch(
        () => getText()?.trim() ?? '',
        (trimmed) => {
            if (trimmed.length > 0) {
                timedOut.value = false;
                clearTimer();
            }
        },
        { immediate: true },
    );

    onMounted(() => {
        const trimmedOnMount = getText()?.trim() ?? '';
        if (trimmedOnMount.length > 0) {
            return;
        }
        timeoutId = setTimeout(() => {
            timeoutId = undefined;
            if ((getText()?.trim() ?? '').length === 0) {
                timedOut.value = true;
            }
        }, timeoutMs);
    });

    onBeforeUnmount(() => {
        clearTimer();
    });

    return timedOut;
};
