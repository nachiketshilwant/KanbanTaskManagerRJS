import './App.css'
import Nav from './component/nav'
import Home from './component/home'
import { useSelector } from 'react-redux'
import { useState } from 'react'

function App() {
  const data = useSelector(state => state.task.boards)
  const [i, setI] = useState();
  let id;
  for (let i = 0; i < data.length; i++) {
    if (data[i].isActive == true) {
      id=i;
      break;
    }
  }

  return (
    <div className='bg-[#20212c] h-screen'>
      <Nav act={id} />
      <Home act={id} />
    </div>
  )
}

export default App
