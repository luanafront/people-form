export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number): (...args: Parameters<F>) => void => {
  let timeout: NodeJS.Timeout;

  return function(...args: Parameters<F>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
}
