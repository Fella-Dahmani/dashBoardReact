

const SupplierOrders = () => {
    

    return (
        <div>
            <h1 className="title">Commandes Fournisseurs</h1>

               
            <div className="filterContainer">
                <h3>Filtres</h3>
                <input type="text" placeholder="Categorie..." />
                <input type="text" placeholder="Statut..." />
                <input type="text" placeholder="Fournisseur..." />
                <input type="date" placeholder="Quantite" />
                <button className="btnPrimary">Appliquer les filtres</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Categorie</th>
                        <th>Montant</th>
                        <th>Fournisseur</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Add your table rows here */}
                </tbody>
            </table>
        </div>
    );
};

export default SupplierOrders;