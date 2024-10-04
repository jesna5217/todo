import { useState } from 'react'

import './App.css'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Done from './components/Done'
import Not from './components/Not'

function App() {
  

  return (
<>

<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/done' element={<Done/>}/>
<Route path='/not' element={<Not/>}/>
  </Routes>  
   </>
  )
}

export default App
