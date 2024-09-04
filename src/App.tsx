
import NavBar from './components/navBar/pages/NavBar';
import VerticalNavBar from './components/navBar/pages/VerticalNavBar';
import AppRoutes from './routes';
import './App.css';
import './components/stockManagements/css/inventaires.css'
import { AuthProvider } from './context/AuthContext';
import {useLocation} from 'react-router-dom';


function App() {
  const location  = useLocation();

  const isLoginPage = location.pathname === '/login';
  
  return (
    <AuthProvider>
       {!isLoginPage &&  <NavBar /> }
       {!isLoginPage && <VerticalNavBar />}
      <div className="content">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
