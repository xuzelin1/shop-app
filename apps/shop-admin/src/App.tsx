import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProductList from './pages/Products/ProductList'
import ProductForm from './pages/Products/ProductForm'
import OrderList from './pages/Orders/OrderList'
import UserList from './pages/Users/UserList'
import { useAuthStore } from './store/auth'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductForm />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="users" element={<UserList />} />
      </Route>
    </Routes>
  )
}

export default App


