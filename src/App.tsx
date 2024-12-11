import './App.css'
import {  HashRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import Profile from './pages/profile/profile'
import ForgotPassword from './pages/auth/login/ForgotPassword'

function App() {


  return (
    <>
      <div>
        <Router >
          <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
