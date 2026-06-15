// Utility: generate a random string from given character sets
export function generateRandomString(length, options) {
  const { upper, lower, numbers, special } = options;
  let pool = '';
  if (upper) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lower) pool += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) pool += '0123456789';
  if (special) pool += "!@#$%^&*()_+-=[]{}|;:',.<>?/";

  if (!pool) return '';

  let result = '';
  const poolLength = pool.length;
  const cryptoObj = typeof window !== 'undefined' && window.crypto;

  // Use crypto.getRandomValues if available for better randomness
  if (cryptoObj && cryptoObj.getRandomValues) {
    const array = new Uint32Array(length);
    cryptoObj.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += pool[array[i] % poolLength];
    }
  } else {
    for (let i = 0; i < length; i++) {
      result += pool[Math.floor(Math.random() * poolLength)];
    }
  }

  return result;
}
