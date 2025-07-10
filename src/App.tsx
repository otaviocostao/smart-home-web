import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';


const App = () => {

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
