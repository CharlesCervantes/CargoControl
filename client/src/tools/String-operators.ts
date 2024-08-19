export function Capitalize(word: string): string {
  return word
    .split(' ')
    .map(string => string.charAt(0).toUpperCase() + string.slice(1))
    .join(' ')
}
