import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { setContextMenu } from "../../store/actions/app.actions"

export function useContextMenu({ item }) {

    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
    const activeContextMenuId = useSelector(storeState => storeState.appMoudle.playlistContextMenu)

    useEffect(() => {
        window.addEventListener('click', handleClickOutside)
        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    function handleContextMenu(ev) {

        ev.preventDefault()

        const menuWidth = 250
        const menuHeight = 50

        let xPosition = ev.clientX
        let yPosition = ev.clientY

        if (xPosition + menuWidth > window.innerWidth) {
            xPosition = ev.clientX - menuWidth
        }

        if (yPosition + menuHeight > window.innerHeight) {
            yPosition = ev.clientY - menuHeight
        }

        setContextMenu(item._id)
        setContextMenuPosition({ x: xPosition, y: yPosition })
    }

    function handleClickOutside(ev) {
        if (ev.srcElement.classList[0] === 'item-class') return
        setContextMenu(null)
    }

    return [activeContextMenuId, contextMenuPosition, handleContextMenu]

}