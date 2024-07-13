import { currentDiscount } from "..";
import { theHangtagDiscountDocument } from "../../CONSTANTS";

type xyz = {
    url: string
    was: string
    now: string
    item: string
    img: string
}

export function hangtagDocument({ was, now, item, url, img}: xyz) {
    const collection = currentDiscount()
    return theHangtagDiscountDocument
        .replaceAll(/{URL}/gi, url)
        .replaceAll(/{WAS}/gi, was)
        .replaceAll(/{NOW}/gi, now)
        .replaceAll(/{ITEM}/gi, item)
        .replaceAll(/{ITEMIMG}/gi, img)
        .replaceAll(/{FG}/gi, collection.fg)
        .replaceAll(/{BG}/gi, collection.bg)
}
