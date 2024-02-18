export default function useSeparatedString(string, schema) {
  const newString = string?.replace(/([a-z])([A-Z])/, schema);

  return newString;
}
