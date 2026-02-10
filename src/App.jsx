import './App.css'
import Navbar from './components/navbar/Navbar';
import { Outlet } from 'react-router';
import useCart from './hooks/useCart';

function App() {

  const cart = useCart();

  return (
    <>
      <Navbar numItems={cart.cartObj.size} />
      <Outlet context={cart} />
    </>
  )
}

export default App;