export function removeUndefined<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(removeUndefined) as unknown as T
  }

  if (
    obj !== null &&
    typeof obj === "object" &&
    obj.constructor === Object // 👈 SOLO objetos planos
  ) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        ;(acc as any)[key] = removeUndefined(value)
      }
      return acc
    }, {} as T)
  }

  // 👇 si no es objeto plano, devolver tal cual (ej: serverTimestamp)
  return obj
}

