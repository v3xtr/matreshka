export function generateNumericId(length = 12) {
  let result: string = '';
  const chars = '0123456789';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
