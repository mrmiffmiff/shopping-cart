import { useState } from 'react'
import './App.css'
import Incrementer from './components/incrementer/Incrementer'

function App() {
  const [incrementerVal, setIncrementerVal] = useState(1)

  return (
    <div className="appSample">
      <Incrementer
        currentValue={incrementerVal}
        updateFn={setIncrementerVal}
      />
    </div>
  )
}

export default App
