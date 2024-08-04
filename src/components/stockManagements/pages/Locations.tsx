
const Locations = () => {
    return (
        <div>
            <h1 className="title">Emplacement</h1>

            <div className="subTitleContainerlocation">
                <h2 className="subtitle">Par produit</h2>
                <input type="text" placeholder="Recherche" />
                <button>Appliquer les filtres</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Categorie</th>
                        <th>Quantite</th>
                        <th>Fournisseur</th>
                        <th>Prix</th>
                        <th>Seuil Critique</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Locations;