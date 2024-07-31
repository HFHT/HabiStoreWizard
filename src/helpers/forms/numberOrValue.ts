
export function numberOrValue(value: any, returnValue: number): number {
    if (isNaN(Number(value))) return returnValue
    return (typeof value === 'number') ? value : returnValue
}
