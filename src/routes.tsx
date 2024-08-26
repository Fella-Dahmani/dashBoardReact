import { Routes, Route } from 'react-router-dom';
import DashBoard from './components/stockManagements/pages/DashBoard';
import Inventaires from './components/stockManagements/pages/Inventaires';
import StockMouvements from './components/stockManagements/pages/StockMouvements';
import Locations from './components/stockManagements/pages/Locations';
import CustomerOrders from './components/ordersManagements/pages/CustomerOrders';
import SupplierOrders from './components/ordersManagements/pages/SupplierOrders';
import UsersManagement from './components/administration/pages/UsersManagement';
import BddManagement from './components/administration/pages/BddManagement';
import GestionAlertes from './components/AlertManagement/GestionAlertes';
import GestionBaseDeDonnees from './components/DatabaseManagement/GestionBaseDeDonnees';
import Login from './components/Login/Login';



function AppRoutes() {
    return (
        <Routes>
            
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inventaires" element={<Inventaires />} />
            <Route path="/stockMouvements" element={<StockMouvements />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/customerOrders" element={<CustomerOrders />} />
            <Route path="/supplierOrders" element={<SupplierOrders />} />
            <Route path="/usersManagement" element={<UsersManagement />} />
            <Route path="/bddManagement" element={<BddManagement />} />
            <Route path="/gestionAlertes" element={<GestionAlertes />} />
            <Route path="/gestionBaseDeDonnees" element={<GestionBaseDeDonnees />} />
            



            
        </Routes>
    );
}

export default AppRoutes;
