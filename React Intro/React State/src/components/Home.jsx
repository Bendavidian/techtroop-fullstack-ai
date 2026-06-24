import Item from './Item'

function Home(props) {
  return (
    <div className="home">
      <h2>Store</h2>
      <div className="store-list">
        {props.store.map((storeItem) => (
          <Item
            key={storeItem.item}
            item={storeItem.item}
            price={storeItem.price}
            discount={storeItem.discount}
            shouldDiscount={props.shouldDiscount}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
