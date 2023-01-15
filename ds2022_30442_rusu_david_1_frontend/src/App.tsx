import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import AdminRoute from './components/adminRedirect.component';
import ProtectedRoute from './components/authRedirect.component';
import AdministrationPage from './pages/administration.page';
import HelpPage from './pages/help.page';
import HomePage from './pages/home.page';
import LoginPage from './pages/login.page';
import RegisterPage from './pages/register.page';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          

          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<HomePage />} />
            <Route path='/help' element={<HelpPage />} />
          {/* redirect to home if normal user tried to access admin page! */}
            <Route element={<AdminRoute />}>
              <Route path='/administration' element={<AdministrationPage />} />
            </Route>
          </Route>


          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;