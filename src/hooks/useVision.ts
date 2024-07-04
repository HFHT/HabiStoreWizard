import { useState } from "react";
import { convertImageToBase64, fetchJson } from "../helpers";
const VISIONPROMPT = 'Analyze the image. Generate a product title. Also generate a product description which includes the color and finish or fabric. Estimate the product weight in pounds, size in feet, and thrift store price in US dollars. Try to provide the manufacturer.  Categorize the product into one of the following:  Cabinet, Rug, Lighting, Art/Décor, Sporting Goods, Furniture, Appliance, Household, Tool, Electrical, Plumbing, Flooring, Door, Window, or Building Materials. For the Furniture and Appliance categories provide the most appropriate room from the following choices: Living Room, Dining Room, Kitchen, Laundry, Patio & Outdoor Living, Office, Heating & Cooling, Garage, or Household. Return response in JSON format: {title: string, description: string, category: string, room: string, weight: number, size: {height: number, width: number, depth: number}, manufacturer: string, price: number}'
export function useVision() {
    const [AIresponse, setAIresponse] = useState<null | {}>(null)
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
        const cleanedRes = res.choices[0].message.content.substring(res.choices[0].message.content.indexOf('{'), res.choices[0].message.content.lastIndexOf('}')+1)
        const objRes = JSON.parse(cleanedRes)
        console.log(cleanedRes)
        console.log(objRes)
        setIsAnalyzing(false)
        setAIresponse(objRes)
    }
    return [analyze, AIresponse, isAnalyzing] as const
}