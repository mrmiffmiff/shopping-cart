import './App.css'
import ProductCard from './components/productCard/ProductCard'

function App() {

  return (
    <div className="appSample">
      <ProductCard
        itemId={1}
        itemName={"Sample Name of Product"}
        itemPrice={3.45}
        addToCartFunc={(id, amount) => console.log(`${id}: ${amount}`)}
      />
    </div>
  )
}

export default App
