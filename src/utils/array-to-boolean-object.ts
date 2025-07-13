export function arrayToBooleanObject(
    arr: string[] | undefined,
): Record<string, boolean> {
    if (!arr) return {};

    const obj: Record<string, boolean> = {};
    const items = Array.isArray(arr) ? arr : [arr];
    items.forEach((key) => {
        obj[key] = true;
    });
    return obj;
}
