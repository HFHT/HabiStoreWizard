import { useState } from "react";
import { fetchJson } from "../helpers";
const VISIONPROMPT = 'Analyze the image. Generate a product title. Also generate a product description which includes the color, finish and condition. Estimate the product weight in pounds and thrift store price in US dollars. Try to provide the manufacturer.  Categorize the product into one of the following:  Cabinet, Rug, Art/Décor, Furniture, Appliance, Household, Tool, Electrical, Plumbing, Flooring, Door, Window, or Building Materials. For the Furniture and Appliance categories provide the most appropriate room from the following choices: Living, Dining, Kitchen, Laundry, Patio, Office, Heat/Cool, or Household. Return response in JSON format: {title: string, description: string, category: string, room: string, weight: number, manufacturer: string, price: number}'
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