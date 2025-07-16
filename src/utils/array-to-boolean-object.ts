export function arrayToBooleanObject<K extends string>(
    arr: K[] | undefined,
): Record<K, boolean> {
    if (!arr) return {} as Record<K, boolean>;

    const obj: Record<string, boolean> = {};
    const items = Array.isArray(arr) ? arr : [arr];
    items.forEach((key) => {
        obj[key] = true;
    });
    return obj;
}
