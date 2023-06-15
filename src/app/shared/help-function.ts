export function validateNo(e: any): boolean {
  const charCode = e.which ? e.which : e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false
  }
  return true
}

export function randomString() {
  return String(
    Date.now().toString(32) +
      Math.random().toString(16)
  ).replace(/\./g, '')
}
