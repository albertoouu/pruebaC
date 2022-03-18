import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import Users from './pages/Users';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import User from './pages/User';
import RegisterPage from './pages/RegisterPage';
import PaymentsPage from './pages/PaymentsPage';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './auth/AuthProvider';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/dashboard/*' element={<PrivateRoute><Dashboard /></PrivateRoute>} >
            <Route path='comunity' element={<p>Comunidad</p>} />
            <Route path='form' element={<p>Formulario</p>} />
          </Route>
          <Route path='/payments' element={<PrivateRoute><PaymentsPage /></PrivateRoute>} />
          <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:userId' element={<User />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
