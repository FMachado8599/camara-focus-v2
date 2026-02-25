export function calculateChecksum(base12: string): string {
  const digits = base12.split("").map(Number)

  const sum = digits.reduce((acc, digit, index) => {
    return acc + digit * (index % 2 === 0 ? 1 : 3)
  }, 0)

  const mod = sum % 10
  return mod === 0 ? "0" : String(10 - mod)
}

export function resolveEAN(input: string) {
  if (input.length < 12) {
    return { valid: false, error: "El EAN13 requiere 12 dígitos base" }
  }

  if (input.length === 12) {
    const checksum = calculateChecksum(input)
    return { valid: true, value: input + checksum }
  }

  // length === 13
  const base = input.slice(0, 12)
  const expected = calculateChecksum(base)

  if (expected !== input[12]) {
    return { valid: false, error: `Dígito verificador incorrecto. Debe ser ${expected}` }
  }

  return { valid: true, value: input }
}