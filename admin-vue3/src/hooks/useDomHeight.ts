import { ref, watch } from 'vue';
export function useDomHeight() {
    const containerRef:any = ref(null);
    const containerHeight = ref(0);

    // 监听容器高度的变化
    watch(containerRef, () => {
        if (containerRef.value) {
            containerHeight.value = containerRef.value?.clientHeight;
        }
    }, { immediate: true }); // 立即执行以确保初始高度被正确设置

    return {
        containerRef,
        containerHeight
    };

}