import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

// Hooks
import useAuth from './hooks/useAuth';
import { useUserContext } from './hooks/useUserContext';

// Components
import Menu from './components/Menu';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Registro/Register';
import { useEffect } from 'react';

function App() {

  const { checkToken } = useAuth()
  const { user, setUser } = useUserContext()

  useEffect(() => {
    async function check() {
      setUser(await checkToken())
    }
    check()
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
