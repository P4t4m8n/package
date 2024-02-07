import { useEffect, useRef } from "react"


export const useEffectUpdate = (callBack, dependencies, args) => {

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if (args) callBack(args)
        else callBack()
    }, dependencies)
}