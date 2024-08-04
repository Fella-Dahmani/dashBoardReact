const StockMouvements = () => {
    return (
        <div>
            <h1 className="title">Mouvements des stocks</h1>

            <div className="subTitleContainer">
                <div>
                    <select>
                        <option value="1">Entrees de stock</option>
                        <option value="2">Sorties de stock</option>
                        <option value="3">Transfert de stock</option>
                    </select>
                </div>
            </div>

            <div className="filterContainer">
                <h3>Filtres</h3>
                <input type="text" placeholder="Categorie..." />
                <input type="text" placeholder="Statut..." />
                <input type="text" placeholder="Clients..." />
                <input type="date" placeholder="Date Debut" />
                <input type="date" placeholder="Date Fin" />
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
                    {/* Add your table rows here */}
                </tbody>
            </table>
        </div>
    );
};

export default StockMouvements;