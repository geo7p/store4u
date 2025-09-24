import './Card.css'

export default function Card({name, price, image, description, manufacturer, created_at, updated_at, clickHandler}) {

    return (
        <>
            <div className = "card-frame" onClick = {clickHandler}>
                <div className="product-title">{name}</div>
                <div className = "product-image">
                    <img src = {image}></img>
                </div>
                <div className = "product-price">
                    ${price}
                </div>
                <div className = "product-manufacturer">
                    Manufactured by: {manufacturer}
                </div>
            </div>
        </>
    )
}