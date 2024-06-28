export function useCompact(arr: any[]): any[] {
  return arr.filter(item => !!item)
}
