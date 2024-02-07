import { useEffect, useState } from "react"

export const MOBILE = 'MOBILE'
export const PC = 'PC'

export function useDeviceCheck() {

    const [device, setDevice] = useState('')

    useEffect(() => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            setDevice(MOBILE)

        else setDevice(PC)

    }, [device])

    return device
}