export function fileType(filename: string | undefined | null):string {
    if (!filename) return ""
    var a = filename.split(".");
    if (a.length === 1 || (a[0] === "" && a.length === 2)) {
        return ""
    }
    return a[1].toUpperCase()
}