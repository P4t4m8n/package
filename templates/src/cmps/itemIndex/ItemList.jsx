import { Link } from "react-router-dom"
import { ItemPreview } from "./ItemPreview"

export function ItemList({ items, onRemoveItem }) {

    return (
        <ul className="item-list grid">
            {items.map((item, idx) =>
                <li className="flex" key={idx}>
                    <ItemPreview item={item} />
                    <div className="item-btns flex">
                        <Link to={'edit/' + item._id}>Details</Link>
                        <button onClick={() => onRemoveItem(item._id)}>Remove</button>
                    </div>
                </li>
            )}
        </ul>
    )
}