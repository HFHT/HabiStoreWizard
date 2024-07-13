// export const CONST_DISCOUNTS_OLD = ['blue-discount-collection', 'yellow-collection', 'red-collection', 'green-collection']
export const CONST_DISCOUNTS = [{ col: 'blue-discount-collection', fg: '#000000', bg: '#EEEEEE' }, { col: 'yellow-collection', fg: '#FFFFFF', bg: '#FFCC00' }, { col: 'red-collection', fg: '#FFFFFF', bg: '#A63740' }, { col: 'green-collection', fg: '#FFFFFF', bg: '#43B02A' }]
export function currentDiscount(): { col: string, fg: string, bg: string } {
    var theDiscounts = CONST_DISCOUNTS
    theDiscounts = theDiscounts.concat(CONST_DISCOUNTS)
    theDiscounts = theDiscounts.concat(CONST_DISCOUNTS)
    const theMonth = new Date().getMonth()
    console.log(theDiscounts, theMonth, theDiscounts[theMonth])
    return theDiscounts[theMonth]
}