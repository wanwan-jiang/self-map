import { onMounted, onUnmounted, ref, type Ref } from 'vue';

/**
 * @description 人格测评页公共逻辑：根据 localStorage 是否已有类型标记切换「完成页 / 测试页」，并监听 `storage` 与自定义提交成功事件以保持状态同步。
 * @param typeKey 与提交成功后写入的 localStorage 键名一致
 * @param submitEventName 提交成功后 `dispatch` 的自定义事件名
 */
export function usePersonTestCompletion(typeKey: string, submitEventName: string): { hasType: Ref<boolean> } {
    const hasType = ref(false);

    const syncFromStorage = (): void => {
        if (typeof window === 'undefined') {
            return;
        }
        hasType.value = Boolean(window.localStorage.getItem(typeKey));
    };

    onMounted(() => {
        syncFromStorage();
        window.addEventListener('storage', syncFromStorage);
        window.addEventListener(submitEventName, syncFromStorage);
    });

    onUnmounted(() => {
        window.removeEventListener('storage', syncFromStorage);
        window.removeEventListener(submitEventName, syncFromStorage);
    });

    return { hasType };
}
