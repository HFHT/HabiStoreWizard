import { currentDiscount } from "."
import { CONST_APPLIANCE_OBJ, CONST_CATS_OBJ, CONST_ROOMS_OBJ } from '../../CONSTANTS';

export function prepareCollections(theCollections: any, responseFromAI: responseFromAIType) {
    if (!theCollections) return []
    console.log(theCollections)
    const catStringAry = CONST_CATS_OBJ[responseFromAI.category]
    const roomStringAry = CONST_ROOMS_OBJ[responseFromAI.room]
    const applStringAry = responseFromAI.category === 'Appliance' ? CONST_APPLIANCE_OBJ[responseFromAI.category] : []
    var aryStringCol = ['newly-added-items'].concat(catStringAry).concat(roomStringAry).concat(applStringAry)
    const uniqueNames = [...new Set(aryStringCol)];                                         // remove duplicates
    console.log(uniqueNames)
    var aryNumberCol = [theCollections[currentDiscount()]]
    responseFromAI.feature && aryNumberCol.push(theCollections['featured-items'])
    for (let i = 0; i < uniqueNames.length; i++) {
        theCollections[uniqueNames[i]] && aryNumberCol.push(theCollections[uniqueNames[i]]) // remove undefined matches
    }
    console.log(aryNumberCol)
    return aryNumberCol
}

