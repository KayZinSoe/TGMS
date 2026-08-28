/** Returns true when a string contains no visible characters. */
export function isEmptyString(value: string): boolean {
  const isEmpty = value.trim().length === 0;

  console.log("kay");
  return isEmpty;
}
