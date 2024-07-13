
interface usePrinterInterface {
    windowName?: string
    pause?: boolean
}

export function usePrinter({ windowName = 'PRINT', pause = false }: usePrinterInterface) {

    const print = (document: string) => {
        console.log('print', document)
        var mywindow = window.open('', /*windowName, /*`height=${height}, width=${width}`*/)
        if (mywindow) {
            mywindow.document.write(document)
            mywindow.document.close() // necessary for IE >= 10
            mywindow.focus() // necessary for IE >= 10*/
            mywindow.addEventListener('load', () => {
                //@ts-ignore
                mywindow.print();
                //@ts-ignore
                !pause && mywindow.close();
            })
        } else {
            alert('Could not open a print window, contact Support.')
        }
    }

    return print

}
