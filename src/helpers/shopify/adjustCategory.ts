import { CONST_TYPES_TAGS } from "../../CONSTANTS"

export function adjustCategory(responseFromAI: responseFromAIType) {
    console.log('adjustCategory', responseFromAI, CONST_TYPES_TAGS)
    const filteredByCategory: any[] = CONST_TYPES_TAGS.filter((mapping: any) => mapping.cat === responseFromAI.category)
    const filteredByCategoryAndRoom: any[] = filteredByCategory.filter((mapping: any) => mapping.room === responseFromAI.room)
    console.log('adjustCategory', filteredByCategory, filteredByCategoryAndRoom)
    if (filteredByCategoryAndRoom.length === 0) {                           // room not found use blank room mapping
        filteredByCategoryAndRoom[0] = filteredByCategory.find((mapping: any) => mapping.room === '')
    }
    if (filteredByCategory.length === 0 || filteredByCategoryAndRoom.length === 0) {  // if no blank room mapping
        return { product_type: responseFromAI.category, tags: responseFromAI.guarantee ? ['guarantee', 'vision'] : ['vision'] }
    }
    return { product_type: filteredByCategoryAndRoom[0].type, tags: filteredByCategoryAndRoom[0].tag.concat(responseFromAI.guarantee ? ['guarantee', 'vision'] : ['vision']) }
}

