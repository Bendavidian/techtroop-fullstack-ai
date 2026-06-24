function Item(props) {
  const finalPrice = props.shouldDiscount
    ? props.price * (1 - props.discount)
    : props.price

  return (
    <div className="item">
      <span className="item-name">{props.item}</span>
      <span className="item-price">${finalPrice}</span>
    </div>
  )
}

export default Item
