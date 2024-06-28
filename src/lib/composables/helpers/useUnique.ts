export function useUnique(arr: any[]) {
  return arr.reduce((a: any[], c: any) => {
    if (!a.includes(c)) {
      a.push(c)
    }
    return a
  }, [])
}
