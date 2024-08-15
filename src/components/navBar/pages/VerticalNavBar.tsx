
import { Link } from 'react-router-dom';
import '../css/verticalNavBar.css';
import dashboardAsset from '../assets/dashboard.png';

const VerticalNavBar = () => {
    return (
        <div className="vertical-nav">
            <div>
                <img src={dashboardAsset} alt="dashboard" />
                <Link to="/">Tableau de Bord</Link>
            </div>

            <p>Gestion des stocks</p>
            <div>
                <img src={dashboardAsset} alt="dashboard" />
                <a href="Inventaires">Inventaires</a>
            </div>

            <div>
                <img src={dashboardAsset} alt="dashboard" />
                <a href="StockMouvements">Mouvements de stock</a>
            </div>

            <div>
                <img src={dashboardAsset} alt="dashboard" />
                <a href="Locations">Emplacements</a>
            </div>

            <p>Gestion des Commandes</p>
            <div>
                <img src={dashboardAsset} alt="dashboard" />
                <a href="CustomerOrders">Commandes Clients</a>
            </div>
            <div>
                <img src={dashboardAsset} alt="dashboard" />
                <a href="SupplierOrders">Commandes Fournisseurs</a>
            </div>

            <p>Administration</p>
            <div>
                <img src={dashboardAsset} alt="dashboard" />
                <a href="UsersManagement">Gestion des utilisateurs</a>
            </div>
            <div>
                <img src={dashboardAsset} alt="dashboard" />
                <a href="BddManagement">Gestion de la base des donnees</a>
            </div>

            <p>Gestion des alertes</p>
            <div>
                <img src={dashboardAsset} alt="dashboard" />
                <a href="AlertsManagement">Gestion des alertes</a>
            </div>
        </div>
    );
};

export default VerticalNavBar;