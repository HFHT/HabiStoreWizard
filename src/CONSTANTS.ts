export const CONST_ROOMS = ['Bedroom', 'Dining Room', 'Garage', 'Heating & Cooling', 'Household', 'Kitchen', 'Laundry', 'Living Room', 'Office', 'Patio & Outdoor Living']
export const CONST_CATS = ['Appliance', 'Art/Décor', 'Building Materials', 'Cabinet', 'Door', 'Electrical', 'Electronics', 'Flooring', 'Furniture', 'Household', 'Lighting', 'Plumbing', 'Rug', 'Sporting Goods', 'Tool', 'Window',]

export const CONST_CATS_OBJ: any = {
    'Appliance': ['appliances'],
    'Art/Décor': ['art-home-decor', 'furniture'],
    'Building Materials': ['building-materials', 'home-improvement'],
    'Cabinet': ['cabinets', 'home-improvement'],
    'Door': ['doors-windows', 'home-improvement'],
    'Electrical': [],
    'Electronics': ['household-appliances', 'appliances'],
    'Flooring': ['flooring', 'home-improvement'],
    'Furniture': ['furniture'],
    'Household': [],
    'Lighting': ['lighting', 'home-improvement'],
    'Plumbing': ['plumbing', 'home-improvement'],
    'Rug': ['rugs', 'furniture'],
    'Sporting Goods': ['sporting-goods', 'furniture'],
    'Tool': ['tools', 'home-improvement'],
    'Window': ['doors-windows', 'home-improvement'],
}
export const CONST_ROOMS_OBJ: any = {
    'Bedroom': ['bedroom'],
    'Dining Room': ['dining-room'],
    'Garage': [],
    'Heating & Cooling': ['heating-cooling', 'appliances'],
    'Household': ['household-appliances', 'appliances'],
    'Kitchen': ['kitchen'],
    'Laundry': [],
    'Living Room': ['living-room'],
    'Office': ['office-furniture'],
    'Patio & Outdoor Living': ['patio-outdoor-living']
}
export const CONST_APPLIANCE_OBJ: any = {
    'Kitchen': ['kitchen-appliances'],
    'Laundry': ['laundy-appliances']
}

export const CONST_TYPES_TAGS = [
    { cat: 'Appliance', room: 'Heating & Cooling', type: 'Appliance-HeatCool', tag: ['Climate', 'Appliances'] },
    { cat: 'Appliance', room: 'Household', type: 'Appliance-Household', tag: ['Household', 'Appliances'] },
    { cat: 'Appliance', room: 'Kitchen', type: 'Appliance-Kitchen', tag: ['Kitchen', 'Appliances'] },
    { cat: 'Appliance', room: 'Laundry', type: 'Appliance-Laundry', tag: ['Laundry', 'Appliances'] },
    { cat: 'Appliance', room: 'Patio & Outdoor Living', type: 'Appliance-Outdoor', tag: ['Outdoor', 'Appliances'] },
    { cat: 'Appliance', room: '', type: 'Appliance', tag: ['Appliances'] },
    { cat: 'Door', room: '', type: 'BldgMat-Door', tag: ['Door', 'Home Improvement'] },
    { cat: 'Plumbing', room: '', type: 'BldgMat-Plumbing', tag: ['Bathroom'] },
    { cat: 'Tool', room: '', type: 'BldgMat-Tools', tag: ['Tools', 'Home Improvement'] },
    { cat: 'Window', room: '', type: 'BldgMat-Window', tag: ['Window', 'Home Improvement'] },
    { cat: 'Cabinet', room: 'Bathroom', type: 'Cabinets', tag: ['Bathroom', 'Cabinets', 'Home Improvement'] },
    { cat: 'Cabinet', room: 'Bedroom', type: 'Cabinets', tag: ['Bedroom', 'Cabinets', 'Home Improvement'] },
    { cat: 'Cabinet', room: 'Kitchen', type: 'Cabinets', tag: ['Kitchen', 'Cabinets', 'Home Improvement'] },
    { cat: 'Cabinet', room: 'Garage', type: 'Cabinets', tag: ['Storage', 'Cabinets', 'Home Improvement'] },
    { cat: 'Cabinet', room: 'Office', type: 'Cabinets', tag: ['Office', 'Cabinets', 'Home Improvement'] },
    { cat: 'Cabinet', room: '', type: 'Cabinets', tag: ['Cabinets', 'Home Improvement'] },
    { cat: 'Flooring', room: '', type: 'Flooring', tag: ['Rug', 'Home Improvement'] },
    { cat: 'Furniture', room: 'Bedroom', type: 'Furniture-Bedroom', tag: ['Bedroom', 'Furniture'] },
    { cat: 'Furniture', room: 'Dining Room', type: 'Furniture-Dining', tag: ['Dining Room', 'Furniture'] },
    { cat: 'Furniture', room: 'Living Room', type: 'Furniture-Living', tag: ['Living Room', 'Furniture'] },
    { cat: 'Furniture', room: 'Office', type: 'Furniture-Office', tag: ['Office', 'Furniture'] },
    { cat: 'Furniture', room: 'Patio & Outdoor Living', type: 'Furniture-Patio', tag: ['Living Room', 'Furniture'] },
    { cat: 'Furniture', room: '', type: 'Furniture', tag: ['Furniture'] },
    { cat: 'Art/Décor', room: '', type: 'Household-ArtDecor', tag: ['Art & Decor', 'Household'] },
    { cat: 'Sporting Goods', room: '', type: 'Household-Sporting', tag: ['Sporting Goods', 'Household'] },
]

export const theHangtagDiscountDocument =
    '<html>\
<head>\
    <title>Print</title>\
    <link rel="preconnect" href="https://fonts.googleapis.com">\
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\
    <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">\
</head>\
<body>\
    <div style="width:360px; "><img width="300" src="{URL}HabiStorelogo_stacked_black.png" /> \
        <div style="position:fixed; opacity:0.3; z-index:1">\
            <img width="300" src="{ITEMIMG}"/>\
        </div>\
        <table style="display:flex; align-items:baseline">\
            <tr style="display:flex; align-items:center ">\
                <td>\
                    <img height="60" style="margin-left:0.7rem;" src="{URL}WAS.png" />\
                </td>\
                <td>\
                    <h1 style="font-size:3rem; margin-left:3.6rem; text-decoration-line: underline;">{WAS}</h1> \
                </td>\
            </tr>\
            <tr style="display:flex; align-items:center ">\
                <td>\
                    <img height="60" style="margin-left:0.7rem;" src="{URL}NOW.png" />\
                </td>\
                <td>\
                    <h1 style="font-size:3rem; margin-left:3.6rem; text-decoration-line: underline;">{NOW}</h1>\
                </td>\
            </tr>\
            <tr style="display:flex; align-items:center ">\
                <td>\
                    <img height="60" style="margin-left:0.7rem;" src="{URL}ITEM.png" />\
                </td>\
                <td>\
                    <h1 style="font-size:3rem; margin-left:2.8rem; text-decoration-line: underline;">{ITEM}</h1>\
                </td>\
            </tr>\
        </table>\
        <div style="display:flex; justify-content:center; align-items:center; height:60px; color:{FG}; background-color:{BG}">\
            <h2 style="font-size:1.4rem; text-align:center">EVERY SALE BANGS A NAIL</h2>\
        </div>\
    </div>\
</body>\
</html>'