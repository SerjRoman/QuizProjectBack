export function isObjectEmpty(obj: Record<string, unknown>) {
    return !Object.keys(obj).length;
}
