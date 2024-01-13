export default function CompleteString(value: string, totalWidth: number, paddingChar?: string) {
  return value.padStart(totalWidth, paddingChar || "0");
}