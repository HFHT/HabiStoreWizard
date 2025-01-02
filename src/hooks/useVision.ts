import { useState } from "react";
import { fetchJson } from "../helpers";
const VISIONPROMPT = 'Analyze the image. Generate a product title. Also generate a product description which includes the color and finish or fabric. Estimate the product weight in pounds, size in feet, and thrift store price in US dollars. Try to provide the manufacturer.  Categorize the product into one of the following:  Cabinet, Rug, Lighting, Art/Décor, Sporting Goods, Furniture, Appliance, Household, Tool, Electronics, Electrical, Plumbing, Flooring, Door, Window, or Building Materials. For the Furniture and Appliance categories provide the most appropriate room from the following choices: Living Room, Dining Room, Kitchen, Laundry, Patio & Outdoor Living, Office, Heating & Cooling, Garage, or Household. Return response in JSON format: {title: string, description: string, category: string, room: string, weight: number, size: {height: number, width: number, depth: number}, manufacturer: string, price: number}'
// const GROUPPROMPT = 'Analyze the image. Return a list of everything you see, exclude people and animals, in JSON format: [{item: string, quantity: number}]'
// const GROUPPROMPT = 'Analyze the image. Return a list of everything and estimate a Thrift Store price in US Dollars, excluding people or animals, you see in JSON format: {item: string, quantity: number, price: number}'
const GROUPPROMPT = 'Analyze the image. Return a list of all products you see (Exclude carts, people and animals) in JSON format: [{item: string, quantity: number}]'

const PRICE_ADJUST = -1
const AI_RESPONSE_EMPTY = { category: '', description: '', manufacturer: '', price: 0, room: '', title: '', weight: 0, size: { height: 0, width: 0, depth: 0 }, feature: false, product: false, guarantee: false, deliver: false, dimensions: false, qty: 1 }
export function useVision() {
    const [AIresponse, setAIresponse] = useState<null | responseFromAIType>(null)
    const [AIresponseList, setAIresponseList] = useState<null | string>(null)

    const [isAnalyzing, setIsAnalyzing] = useState(false)

    const analyze = async (imgUrl: string) => {
        const headers = new Headers()
        const optionsDesc = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                img: imgUrl,
                prompt: VISIONPROMPT
            })
        };
        setIsAnalyzing(true)
        setAIresponse(null)
        const res = await fetchJson(`${import.meta.env.VITE_OPENAI_VISION}/api/AnalyzeImage`, optionsDesc)
        const cleanedRes = res.choices[0].message.content.substring(res.choices[0].message.content.indexOf('{'), res.choices[0].message.content.lastIndexOf('}') + 1)
        if (cleanedRes === '' || cleanedRes === null || cleanedRes === undefined) {
            console.warn('useVision could not analyze image - ', res.choices[0].message.content)
            setIsAnalyzing(false)
            setAIresponse({ ...AI_RESPONSE_EMPTY })
            return
        }
        const objRes = JSON.parse(cleanedRes)
        console.log(cleanedRes)
        console.log(objRes)
        setIsAnalyzing(false)
        objRes.price = objRes.price > 50 ? objRes.price + PRICE_ADJUST : objRes.price
        objRes.manufacturer = objRes.manufacturer === 'Unknown' ? '' : objRes.manufacturer
        setAIresponse({ ...objRes, feature: false, product: false, guarantee: false, deliver: true, dimensions: true, qty: 1 })
    }

    const analyzeGroup = async (imgUrl: string) => {
        const headers = new Headers()
        const optionsDesc = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                img: imgUrl,
                prompt: GROUPPROMPT
            })
        };
        setIsAnalyzing(true)
        setAIresponseList(null)
        const res = await fetchJson(`${import.meta.env.VITE_OPENAI_VISION}/api/AnalyzeImage`, optionsDesc)
        console.log(res)
        const cleanedRes = res.choices[0].message.content.substring(res.choices[0].message.content.indexOf('['), res.choices[0].message.content.lastIndexOf(']') + 1)
        console.log(cleanedRes)
        const objRes = JSON.parse(cleanedRes)
        console.log(objRes)
        // setAIresponseList(objRes)  // old method of returning an array of items.
        if (objRes.length > 0) {
            setAIresponseList(objRes.reduce((list: string, item: any) => `${list}, ${item.quantity}-${item.item}`, '').slice(2))
        } else {
            setAIresponseList('')
        }
        setIsAnalyzing(false)
    }
    return { analyze, analyzeGroup, AIresponse, setAIresponse, AIresponseList, setAIresponseList, isAnalyzing } as const
}