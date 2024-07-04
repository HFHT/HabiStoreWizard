export const CONST_DISCOUNTS = ['blue-discount-collection', 'yellow-collection', 'red-collection', 'green-collection']
export function currentDiscount() {
    var theDiscounts = CONST_DISCOUNTS
    theDiscounts = theDiscounts.concat(CONST_DISCOUNTS)
    theDiscounts = theDiscounts.concat(CONST_DISCOUNTS)
    const theMonth = new Date().getMonth()
    console.log(theDiscounts, theMonth, theDiscounts[theMonth])
    return theDiscounts[theMonth]
}