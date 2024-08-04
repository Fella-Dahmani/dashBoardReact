
import '../css/inventaires.css'; 
import listAsset from '../assets/liste.png';

const Inventaires = () => {
    return (
        <div>
            <h1 className="title">Inventaires</h1>

            <div className="subTitleContainer">
                <img src={listAsset} alt="" />
                <h2 className="subtitle">Liste des produits</h2>
            </div>

            <div className="filterContainer">
                <h3>Filtres</h3>
                <button>Repture de stock</button>
                <button>Surstock</button>
                <input type="text" placeholder="Categorie..." />
                <input type="text" placeholder="Fournisseur..." />
                <button className="btnPrimary">Appliquer les filtres</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Categorie</th>
                        <th>Quantite</th>
                        <th>Fournisseur</th>
                        <th>Prix Achat</th>
                        <th>Prix Vente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Inventaires;