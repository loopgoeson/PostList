import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import PostList from './pages/PostList'
import SignupPage from './pages/SignupPage'
export default function App() {
  return (
    <BrowserRouter>
   <Routes>
<Route path="/" element={<SignupPage/>} />
<Route path="/signin" element={<SignIn/>} />
<Route path="/postlist" element={<PostList/>} />
</Routes>
</BrowserRouter>
  )
}