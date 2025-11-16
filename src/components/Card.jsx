import "../styles/Card.css";

function Card({id, name, img, clickHandler}) {
    return (
        <div className="card" onClick={() => clickHandler(id)}>
            <img src={img} alt="" />
            {name}
        </div>
    )
}

export default Card