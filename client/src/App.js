import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PolicyPage from './pages/PolicyPage'
import PageNotFound from './pages/PageNotFound'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import Dashboard from './pages/user/Dashboard'
import Private from './components/routes/Private'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Admin from './components/routes/Admin'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateCategory from './pages/admin/CreateCategory'
import CreateProduct from './pages/admin/CreateProduct'
import Users from './pages/admin/Users'
import Profile from './pages/user/Profile'
import Order from './pages/user/Order'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<Private />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} / >
          <Route path='user/orders' element={<Order />} / >
        </Route>
        <Route path='/dashboard' element={<Admin />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/createcategory' element={<CreateCategory />} />
          <Route path='admin/createproduct' element={<CreateProduct />} />
          <Route path='admin/users' element={<Users />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/policy' element={<PolicyPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
