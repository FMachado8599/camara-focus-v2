export function removeUndefined<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(removeUndefined) as unknown as T
  }

  if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        ;(acc as any)[key] = removeUndefined(value)
      }
      return acc
    }, {} as T)
  }

  return obj
}
