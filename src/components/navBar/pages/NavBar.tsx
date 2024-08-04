import { useState } from 'react';
import '../css/style.css';
import notificationAsset from '../assets/notifications.png';
import userAsset from '../assets/utilisateur.png';

const NavBar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="navbar">
            <div className="navbar-container">
                <div className="search">
                    <input type="text" placeholder="Rechercher..." />
                </div>

                <div
                    className="user"
                    onMouseOver={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <div className="user-info">
                        <img src={notificationAsset} alt="notification" />
                        <img src={userAsset} alt="user" />
                    </div>

                    <div className="user-text">
                        <p>Fella Dahmani</p>
                        <p>Analyste programmeur</p>
                    </div>

                    {showDropdown && (
                        <div
                            className="dropdown"
                            onMouseOver={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <a href="#">Profile</a>
                            <a href="#">Deconnexion</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;