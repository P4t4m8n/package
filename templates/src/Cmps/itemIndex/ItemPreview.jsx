

export function ItemPreview({ item }) {

    return (
        <section className="item-preview flex">
            <h2>{item.name}</h2>
            <img src={item.imgUrl}></img>
        </section>
    )
}