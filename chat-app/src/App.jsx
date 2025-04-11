import React from 'react'
import  './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from "../src/pages/Login/Login"
import Chat from "../src/pages/Chat/Chat"
import ProfileUpdate from "../src/pages/ProfileUpdate/ProfileUpdate"
function App() {
  return (
    <>
<Routes>
  <Route path='/' element={<Login />}></Route>
  <Route path = "/chat" element ={<Chat />}></Route>
  <Route path = "/profileUpdate" element ={<ProfileUpdate />}></Route>
</Routes>
    

    </>
  )
}

export default App
