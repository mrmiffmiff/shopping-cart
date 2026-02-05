import './App.css'
import ProductCard from './components/productCard/ProductCard'
import StorePage from './components/StorePage/StorePage'

function App() {

  return (
    <StorePage
      addToCartFunc={(id, amount) => console.log(`${id}: ${amount}`)}
    />
  )
}

export default App;