import { MantineContext } from "@mantine/core";
import { createContext, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useReducer, useState } from "react";

export type HeaderContextType = {
    state: { page: string }
    dispatch: Function
}
export type MainContextProviderType = {
    children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined,
}
const reducer = (state: { page: string }, action: string) => {
    console.log(action, action === 'print')
    switch (action) {
        case "wizard": return { ...state, page: 'Create Item' }
        case "print": return { ...state, page: 'Print' }
        case "donation": return { ...state, page: 'Donation' }
        case "settings": return { ...state, page: 'Settings' }
        default: return state
    }
}
export const HeaderContextProvider = (props: MainContextProviderType) => {
    const [state, dispatch] = useReducer(reducer, { page: 'Create Item' })

    return (
        <HeaderContext.Provider value={{
            state: state,
            dispatch: dispatch
        }}>
            {props.children}
        </HeaderContext.Provider>
    )
}

export const HeaderContext = createContext<HeaderContextType>({
    state: { page: '' },
    dispatch: () => { }
})