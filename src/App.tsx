
import NavBar from './components/navBar/pages/NavBar';
import VerticalNavBar from './components/navBar/pages/VerticalNavBar';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <VerticalNavBar />
      <div className="content">
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
