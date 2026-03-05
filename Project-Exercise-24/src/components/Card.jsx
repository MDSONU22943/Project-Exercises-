function Card({card,handleClick, flipped}){
    return (
        <div onClick={()=> handleClick(card)} style={{width: "80px",
        height: "80px",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        cursor: "pointer",
        background: "#f2f2f2"}}>{flipped? card.value: "?"}</div>
    )
}

export default Card;