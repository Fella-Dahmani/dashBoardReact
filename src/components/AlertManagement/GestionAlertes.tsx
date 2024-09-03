/*
// GestionAlertes.tsx
import React, { useEffect, useState } from 'react';
import axios from "axios";
import './GestionAlertes.css';

interface Alert {
    id: number;
    type: string;
    dateCreation: Date;
    produit:{fournisseur:{nom: string}};
    message: string;
    statut:string;
    dateResolution: Date;
  }


const GestionAlertes: React.FC = () => {
  const [alertes, setAlertes] = useState<Alert[]>([]);
  const [filteredAlertes, setFilteredAlertes] = useState<Alert[]>([]);

  const[nom, setNom ] = useState("")
  const[status, setStatus] = useState("")
  const[fournisseur, setFournisseur] = useState("")
  const[dateCree, setDateCree] = useState("")
  const[dateReglee, setDateReglee] = useState("")
   

  const applyFilters =()=>{
    let params: any ={};
    if(nom){
        params.nom = nom.toUpperCase();
    }
    if(status){
        params.status = status.toUpperCase();
    }
    if(fournisseur){
        params.fournisseur = fournisseur.toUpperCase();
    }
    if(dateCree){
        params.dateCree = dateCree;
    }
    if(dateReglee){
        params.dateReglee = dateReglee;
    }

    axios.get("http://localhost:8080/api/alertes/filter",{params})
    .then(response =>{
        setFilteredAlertes(response.data);
        console.log(response.data);
       filteredAlertes.forEach(alert=>console.log(alert));
    })
    .catch(error => {
        console.error("Erreur lors du chargement des alertes", error)
    });

  }
  

  useEffect(() => {
    applyFilters()
  }, [nom, status, fournisseur, dateCree, dateReglee]);

  
  return (
    <div className="gestion-alertes">
      <h1>Gestion des Alertes</h1>
      <div className="filters">
        <label>Filtre:</label>
        <input
          type="text"
          placeholder="Statut Alerte"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Nom Alerte"
          value={nom}
          onChange={(e) =>
            setNom(e.target.value)}
          
        />
        <input
          type="text"
          placeholder="Fournisseur"
          value={fournisseur}
          onChange={(e) =>
            setFournisseur(e.target.value)
          }
        />
        <label>Date Créée:</label>
        <input
          type="date"
          placeholder="Date de creation"
          value={dateCree}
          onChange={(e) =>
            setDateCree(e.target.value)
          }
        />
        <label>Date Réglée:</label>
        <input
          type="date"
          placeholder="Date Réglée"
          value={dateReglee}
          onChange={(e) =>
            setDateReglee(e.target.value)
          }
        />
      </div>
      <table className="alertes-table">
        <thead>
          <tr>
            <th>Statut Alerte</th>
            <th>Nom Alerte</th>
            <th>Fournisseur</th>
            <th>Date Créée</th>
            <th>Date Réglée</th>
          </tr>
        </thead>
        <tbody>
            

        {filteredAlertes.map((alerte)=>(
                <tr key={alerte.id}>
                    <td>{alerte.statut}</td>
                    <td>{alerte.message}</td>
                    <td>{alerte.produit.fournisseur.nom}</td>

                </tr>
            ))
            }

         
          
        </tbody>
      </table>
    </div>
  );
};

export default GestionAlertes; */

/*
// GestionAlertes.tsx
import React, { useEffect, useState } from 'react';
import axios from "axios";
import './GestionAlertes.css';

interface Alert {
    id: number;
    type: string;
    dateCreation: Date;
    produit: { fournisseur: { nom: string } };
    message: string;
    statut: string;
    dateResolution: Date;
}

const GestionAlertes: React.FC = () => {
    const [alertes, setAlertes] = useState<Alert[]>([]);
    const [filteredAlertes, setFilteredAlertes] = useState<Alert[]>([]);

    const [nom, setNom] = useState("");
    const [status, setStatus] = useState("");
    const [fournisseur, setFournisseur] = useState("");
    const [dateCree, setDateCree] = useState("");
    const [dateReglee, setDateReglee] = useState("");

    const applyFilters = () => {
        let params: any = {};
        if (nom) {
            params.nom = nom.toUpperCase();
        }
        if (status) {
            params.status = status.toUpperCase();
        }
        if (fournisseur) {
            params.fournisseur = fournisseur.toUpperCase();
        }
        if (dateCree) {
            params.dateCree = dateCree;
        }
        if (dateReglee) {
            params.dateReglee = dateReglee;
        }

        axios.get("http://localhost:8080/api/alertes/filter", { params })
            .then(response => {
                setFilteredAlertes(response.data);
                console.log(response.data);
                filteredAlertes.forEach(alert => console.log(alert));
            })
            .catch(error => {
                console.error("Erreur lors du chargement des alertes", error);
            });
    }

    useEffect(() => {
        applyFilters();
    }, [nom, status, fournisseur, dateCree, dateReglee]);

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('fr-FR', options);
    }

    return (
        <div className="gestion-alertes">
            <h1>Gestion des Alertes</h1>
            <div className="filters">
                <label>Filtre:</label>
                <input
                    type="text"
                    placeholder="Statut Alerte"
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                />
                <input
                    type="text"
                    placeholder="Nom Alerte"
                    value={nom}
                    onChange={(e) =>
                        setNom(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Fournisseur"
                    value={fournisseur}
                    onChange={(e) =>
                        setFournisseur(e.target.value)
                    }
                />
                <label>Date Créée:</label>
                <input
                    type="date"
                    placeholder="Date de creation"
                    value={dateCree}
                    onChange={(e) =>
                        setDateCree(e.target.value)
                    }
                />
                <label>Date Réglée:</label>
                <input
                    type="date"
                    placeholder="Date Réglée"
                    value={dateReglee}
                    onChange={(e) =>
                        setDateReglee(e.target.value)
                    }
                />
            </div>
            <table className="alertes-table">
                <thead>
                    <tr>
                        <th>Statut Alerte</th>
                        <th>Nom Alerte</th>
                        <th>Fournisseur</th>
                        <th>Date Créée</th>
                        <th>Date Réglée</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAlertes.map((alerte) => (
                        <tr key={alerte.id}>
                            <td>{alerte.statut}</td>
                            <td>{alerte.message}</td>
                            <td>{alerte.produit.fournisseur.nom}</td>
                            <td>{formatDate(alerte.dateCreation)}</td>
                            <td>{formatDate(alerte.dateResolution)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionAlertes;
*/



// GestionAlertes.tsx
import React, { useEffect, useState } from 'react';
import axios from "axios";
import './GestionAlertes.css';

interface Alert {
    id: number;
    type: string;
    dateCreation: Date;
    produit: { fournisseur: { nom: string } };
    message: string;
    statut: string;
    dateResolution: Date;
}

const GestionAlertes: React.FC = () => {
    const [alertes, setAlertes] = useState<Alert[]>([]);
    const [filteredAlertes, setFilteredAlertes] = useState<Alert[]>([]);

    const [nom, setNom] = useState("");
    const [status, setStatus] = useState("");
    const [fournisseur, setFournisseur] = useState("");
    const [dateCree, setDateCree] = useState("");
    const [dateReglee, setDateReglee] = useState("");

    useEffect(() => {
        axios.get("https://stockvisiobackend.onrender.com/api/alertes")
            .then(response => {
                setAlertes(response.data);
                applyFilters(response.data);
            })
            .catch(error => {
                console.error("Erreur lors du chargement des alertes", error);
            });
    }, []);

    useEffect(() => {
        applyFilters(alertes);
    }, [nom, status, fournisseur, dateCree, dateReglee]);

    const applyFilters = (alertes: Alert[]) => {
        let filtered = alertes;

        if (nom) {
            filtered = filtered.filter(alerte =>
                alerte.message.toUpperCase().includes(nom.toUpperCase())
            );
        }

        if (status) {
            filtered = filtered.filter(alerte =>
                alerte.statut.toUpperCase().includes(status.toUpperCase())
            );
        }

        if (fournisseur) {
            filtered = filtered.filter(alerte =>
                alerte.produit.fournisseur.nom.toUpperCase().includes(fournisseur.toUpperCase())
            );
        }

        if (dateCree) {
            filtered = filtered.filter(alerte =>
                new Date(alerte.dateCreation).toLocaleDateString('en-CA') === dateCree
            );
        }

        if (dateReglee) {
            filtered = filtered.filter(alerte =>
                alerte.dateResolution && new Date(alerte.dateResolution).toLocaleDateString('en-CA') === dateReglee
            );
        }

        setFilteredAlertes(filtered);
    }

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('fr-FR', options);
    }

    return (
        <div className="gestion-alertes">
            <h1>Gestion des Alertes</h1>
            <div className="filters">
                <label>Filtre:</label>
                <input
                    type="text"
                    placeholder="Statut Alerte"
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                />
                <input
                    type="text"
                    placeholder="Nom Alerte"
                    value={nom}
                    onChange={(e) =>
                        setNom(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Fournisseur"
                    value={fournisseur}
                    onChange={(e) =>
                        setFournisseur(e.target.value)
                    }
                />
                <label>Date Créée:</label>
                <input
                    type="date"
                    placeholder="Date de creation"
                    value={dateCree}
                    onChange={(e) =>
                        setDateCree(e.target.value)
                    }
                />
                <label>Date Réglée:</label>
                <input
                    type="date"
                    placeholder="Date Réglée"
                    value={dateReglee}
                    onChange={(e) =>
                        setDateReglee(e.target.value)
                    }
                />
            </div>
            <table className="alertes-table">
                <thead>
                    <tr>
                        <th>Statut Alerte</th>
                        <th>Nom Alerte</th>
                        <th>Fournisseur</th>
                        <th>Date Créée</th>
                        <th>Date Réglée</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAlertes.map((alerte) => (
                        <tr key={alerte.id}>
                            <td>{alerte.statut}</td>
                            <td>{alerte.message}</td>
                            <td>{alerte.produit.fournisseur.nom}</td>
                            <td>{formatDate(alerte.dateCreation)}</td>
                            <td>{formatDate(alerte.dateResolution)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionAlertes;


