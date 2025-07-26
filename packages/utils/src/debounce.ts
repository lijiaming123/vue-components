/**
 * 防抖函数
 * @param fn 需要防抖的回调
 * @param wait 间隔时间（ms）
 * @returns 包装后的函数
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  wait = 300
): T {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  } as T;
}
