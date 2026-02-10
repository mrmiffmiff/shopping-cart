import './App.css'
import Navbar from './components/navbar/Navbar';
import { Outlet } from 'react-router';

function App() {

  return (
    <>
      <Navbar numItems={5} />
      <Outlet />
    </>
  )
}

export default App;