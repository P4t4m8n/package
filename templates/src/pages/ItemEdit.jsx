import { useParams } from "react-router";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import { useForm } from "../customHooks/useForm";
import { itemService } from "../services/server/item.service";
import { saveItem } from "../store/actions/item.actions";
import { useImageUpload } from "../customHooks/useImageUpload";


export function ItemEdit() {

    const [itemToEdit, setItemToEdit, handleChange] = useForm(itemService.getEmptyitem())
    const params = useParams()

    useEffectUpdate(loadItem, [params.itemId], params.itemId)
    const [uploadImg] = useImageUpload()

    async function loadItem(itemId) {
        if (!itemId) return
        try {
            const item = await itemService.getById(itemId)
            setItemToEdit(item)
            showSuccessMsg('Item load')
        } catch (err) { showErrorMsg('Cannot load item', err) }
    }

    const onUploadImg = async (ev) => {
        try {
            const imgUrl = await uploadImg(ev)
            setItemToEdit(prevItem => ({ ...prevItem, imgUrl }))

        } catch (err) { showErrorMsg('Cannot upload image', err) }
    }

    async function onSaveitem() {
        try {
            const saveditem = await saveItem(itemToEdit)
            showSuccessMsg(`item added (id: ${saveditem._id})`)
        } catch (err) {
            showErrorMsg('Cannot add item', err)
        }
    }

    const { name, imgUrl, description } = itemToEdit
    console.log("imgUrl:", imgUrl)
    return (
        <form onSubmit={onSaveitem} className="item-edit">
            <input name="name" value={name} placeholder="Enter item name" onChange={handleChange} />
            <textarea name="description" value={description} placeholder="Item description" onChange={handleChange} />
          
                <input type="file" id="file-input" name="image" onChange={onUploadImg} />
                <img src={imgUrl} alt="item-img"></img>
          
            <button>Save</button>
        </form>
    )
}