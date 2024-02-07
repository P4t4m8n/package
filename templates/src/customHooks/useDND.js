import { itemService } from "../services/item.service"
import { setDragObj } from "../store/actions/app.actions"


export function useDragAndDrop() {

    const dragObj = useSelector(storeState => storeState.appMoudle.dragObj)

    const handleDragStart = (item, from) => {
        const data = { item, from }
        setDragObj(data)
    }

    const handleDragOver = (ev) => {
        ev.preventDefault()
    }

    const handleDrop = (ev, drop) => {
        ev.preventDefault()

        const idx = drop.items.findIndex(item => item.data === dragObj.item.data)
        if (idx > -1) return
        handleTransfer(drop)

    }

    async function handleTransfer(drop) {
        try {
            if (dragObj.from) {
                let newFrom = dragObj.from.songs.filter(song => song._id !== dragObj.item._id)
                newFrom = await saveStation(newFrom)
                showSuccessMsg({ itemName: dragObj.item.name, txt: ` was removed from ${dragObj.from.name}` })
            }

            let dropItem = drop.items
            dropItem.push(dragObj.item)
            const savedItem = await itemService.save(dropItem)
            setDragObj(null)
            showSuccessMsg({ itemName: dragObj.item.name, txt: ` was moved too ${stationDrop.name}` })

        } catch (err) {
            showSuccessMsg({ txt: 'Unable to move' })
            console.log(err)
        }
    }

    return [handleDragStart, handleDragOver, handleDrop]
}
