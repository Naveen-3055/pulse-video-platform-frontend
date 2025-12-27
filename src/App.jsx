import React from 'react'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Protectedroutes from './components/Protectedroutes'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import UploadVideo from './pages/Upload'
import Home from './pages/Home'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/login' element={<Login/>}  />
        <Route path='/dashboard' element={
          <Protectedroutes>
            <Dashboard/>
          </Protectedroutes>
        }  />
        <Route path='/uploadvideo' element={<UploadVideo/>} />
      </Routes>
    </div>
  )
}

export default App
