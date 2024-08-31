import "../css/dashboard.css"
import * as d3 from "d3";
import React, { useState, useEffect, useSyncExternalStore } from "react";
import axios from "axios";

/*
select *
from produits
*/



type Produit = {
    id: number;
    codeProduit: string;
    nom: string;
    description: string;
    categorie: {
        code: string;
        description: string;
    };
    seuilCritique: number;
    prixU: number;
    quantiteEnStock: number;
    quantiteMaximale: number;
    prixVente: number;
    fournisseur: {
        id: number;
        codeFournisseur: string;
        nom: string;
    };
};

type Categorie = {
    code: string;
    description: string;
}

/*
select *
from fournisseur
*/

type Fournisseur = {
    id: number;
    codeFournisseur: string;
    nom: string;
    prenom: string;
    statut: Boolean;
/*  
    email: String;
    tel: String;
    adresse: String;
    nrc: String;
 */
}

/*
    url: /api/client/dashboard/profits


select c.nom || ', ' || c.prenom as name, min(c.client_id), sum(lc.quantite*p.prix_u) as ventes 
from lignescommande lc
join produits p on p.produit_id = lc.produit_id
join commandes_clients cc on lc.commandes_clients_id = cc.commande_id
join clients c on c.client_id = cc.client_id
group by c.client_id
order by ventes desc
*/

type Client = {
    nom: string;
    id: number;
    profits: number;
}

/*
    /api/client/dashboard/entree
*/
type Entree = {
    id: number;
    produit: {id:number;}
    quantite: number;
    dateOperation: string;
}

/*
    /api/client/dashboard/sortie
*/
type Sortie = {
    id: number;
    produit: {id:number;}
    quantite: number;
    dateOperation: string;
}


    // the HTMl element to be sent for render into the index.html view
const DashBoard = () => {

    //Retreived Data
    const [clients, setClients]  = useState<Client[]>([]);
    const [fournisseurs, setFournisseurs]  = useState<Fournisseur[]>([]);
    const [produits, setProduits]  = useState<Produit[]>([]);
    const [entrees, setEntrees]  = useState<Entree[]>([]);
    const [sorties, setSorties]  = useState<Sortie[]>([]);

    // Values and Lists for Selectors
    var firstYear;
    var availableYears;
    const availableMonths = [
        "Janvier","Fevrier","Mars","Avril",
        "Mai","Juin","Juillet","Août",
        "Septembre","Octobre","Novembre","Décembre"
    ]


    // Selector State Management
    const [years, setYears] = useState<string[]>(["2022", "2023", "2024"]); //availableYears
    const [selectedYear, setSelectedYear] = useState<string | null>("Tout");
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [selectedFournisseur,setSelectedFournisseur] = useState<string | null>(null); //state []
    const [selectedProducts,setSelectedProducts] = useState<string[] | null>(null); //state []

            // Ensure fournisseurNoms state is managed
    const [fournisseurNoms, setFournisseurNoms] = useState<string[]>([]);


    // values for rendering Graphs and Cards
    var ventes =[]
    var achats = []
    var surstock = []
    var ruptures = []
    var [totalVentes, setTotalVentes] = useState<string>("test ventes");
    var augmentationVentes = "test ventes"
    var [totalAchats, setTotalAchats] = useState<string>("test achats");
    var augmentationAchats = "test achats"
    var [totalSurstocks, setTotalSurstocks] = useState<string>("test surtock");
    var augmentationSurstocks = "test surstocks"
    var [totalRuptures, setTotalRuptures] = useState<string>("test rupture");
    var augmentationRuptures = "test ruptures"
    var produittableau : Produit[] = []

    /*  
    *   Most Likely missing product over time data.
    */



    //hanlde user input
    const updateSelectedYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    const updateSelectedMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Update the state with the selected value
        setSelectedMonth(event.target.value);
    };

    const updateSelectedFournisseur = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(updateSelectedFournisseur)
        setSelectedFournisseur(event.target.value);
    };

    const updateSelectedProducts = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Retrieve selected options
        const selectedOptions = Array.from(event.target.selectedOptions) as HTMLOptionElement[];
        
        // Extract values from selected options
        const selectedValues = selectedOptions.map(option => option.value);
        
        // Update the state with the selected values
        setSelectedProducts(selectedValues);
    };



    //refresh Logic
    useEffect(() => {
        applyFilters();
        console.log("applyfitler")
    }, [selectedYear, selectedMonth, selectedFournisseur, selectedProducts])

    const applyFilters = () =>{
        syncData();
        updateCards();
        updateGraphs();
        updateTables();
    } 

    // call to the BDD
    const syncData = () => {

        const host = "http://localhost:8080/"
        const rootApi = "api/"
        const baseURL = host + rootApi
        var targetUrl = ""

            targetUrl = baseURL+"clients/profits"
            axios.get(targetUrl, {}).then(response => {
                setClients(response.data);
            }).catch();

            targetUrl = baseURL+"fournisseurs"
            axios.get(targetUrl, {}).then(response => {
                setFournisseurs(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des fournisseurs :", error);}
            );

            targetUrl = baseURL+"produits"
            axios.get(targetUrl, {})
                .then(response => {
                    setProduits(response.data);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des produits :", error);
                });
             
            targetUrl = baseURL+"entree"
            axios.get(targetUrl, {})
                .then(response => {
                    setSorties(response.data);})
                .catch(error => {
                    console.error("Erreur lors de la récupération des sorties :", error);
                });
    
            targetUrl = baseURL+"sortie"
            axios.get(targetUrl, {})
                    .then(response => {
                    setEntrees(response.data);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des entrees:", error);
                });

                //set the list of selectable years
                var years = new Set<string>();
                entrees.forEach(entre => {
                    if(entre.dateOperation.length > 0){
                        years.add(entre.dateOperation.substring(0,4))
                    }
                })
                sorties.forEach(sortie => {
                    if(sortie.dateOperation.length > 0){
                        years.add(sortie.dateOperation.substring(0,4))
                    }
                })
                var displayYears :string[] = ["Tout"]
                years.forEach(date => 
                    displayYears.push(date)
                )
                years.forEach(date => 
                    console.log(date)
                )
                setYears(displayYears)

    

    
    };

    const updateCards = () => {

        let valueTotalVentes = 0;
        let valueTotalAchats = 0;
        let valueTotalSurstocks = 0;
        let valueTotalRuptures = 0;


        if (sorties.length > 0 && produits.length > 0 && produits[0] != null && produits[0] != undefined) {
            let sumVentes = 0;
            let sumAchats = 0;
            let sumSurStock = 0;
            let sumRupture = 0;

            var yearToMatch = selectedYear
            var monthToMatch = selectedMonth

            sumVentes = calculateSumVentes(sumVentes)
            sumAchats = calculateSumAchats(sumAchats)
            sumSurStock = calculateSumSurtock(sumSurStock)
            sumRupture = calculateSumRupture(sumRupture)
            
            /*             console.log("sum : "+ sumVentes) */
            valueTotalVentes = sumVentes; // Use a number directly if possible
            valueTotalAchats = sumAchats;
            valueTotalSurstocks = sumSurStock;
            valueTotalRuptures = sumRupture
        }

                //update each card one by one
                setTotalVentes(valueTotalVentes.toString());
                augmentationVentes = "aplha ventes"
                setTotalAchats(valueTotalAchats.toString());
                augmentationAchats = "test achats"
                setTotalSurstocks(valueTotalSurstocks.toString());
                augmentationSurstocks = "test surstocks"
                setTotalRuptures(valueTotalRuptures.toString());
                augmentationRuptures = "test ruptures"
        


        function calculateSumVentes(sumVentes: number): number{
            sorties.forEach(sortie => {
                // Find the product; if not found, default to { quantite: 0 }
                const produit = produits.find(produit => produit.id === sortie.produit.id);
                var prixProduit = 1
                var yearToCheck = "Tout"
                var monthToCheck = "Annee complete"

                if(sortie.dateOperation != undefined && sortie.dateOperation.length > 0)
                        var yearToCheck = sortie.dateOperation.substring(0,4)

                    if(sortie.dateOperation != undefined && sortie.dateOperation.length > 0){
                        var monthToCheck = sortie.dateOperation.substring(5,7)
                        monthToCheck = setProperMonth(monthToCheck)
                    }

                if(produit != undefined){
                    if(produit.prixVente != undefined){
                        prixProduit = produit.prixVente
                        if(yearToCheck === yearToMatch || yearToMatch == "Tout"){
                                if(monthToCheck === monthToMatch){
                                    sumVentes += sortie.quantite * prixProduit;
                                }
                                else if(monthToMatch == "Annee complete") {
                                    sumVentes += sortie.quantite * prixProduit;
                                }
                        }
                    }
                }
            })
            return sumVentes
        }

        function calculateSumAchats(sumAchats: number): number{
            entrees.forEach(entre => {
                // Find the product; if not found, default to { quantite: 0 }
                const produit = produits.find(produit => produit.id === entre.produit.id);
                var prixProduit = 1
                var yearToCheck = "Tout"
                var monthToCheck = "Annee complete"

                if(entre.dateOperation != undefined && entre.dateOperation.length > 0)
                        var yearToCheck = entre.dateOperation.substring(0,4)

                    if(entre.dateOperation != undefined && entre.dateOperation.length > 0){
                        var monthToCheck = entre.dateOperation.substring(5,7)
                        monthToCheck = setProperMonth(monthToCheck)
                    }

                if(produit != undefined){
                    if(produit.prixVente != undefined){
                        prixProduit = produit.prixVente
                        if(yearToCheck === yearToMatch || yearToMatch == "Tout"){
                            if(monthToCheck === monthToMatch){
                                sumAchats += entre.quantite * prixProduit;
                            }
                            else if(monthToMatch == "Annee complete") {
                                sumAchats += entre.quantite * prixProduit;
                            }
                        }
                    }
                }
            })
            return sumAchats
        }
        function calculateSumSurtock(sumSurStock: number): number{
            produits.forEach(produit => {
                // Find the product; if not found, default to { quantite: 0 }
                var prixProduit = 1
                var yearToCheck = "Tout"
                var monthToCheck = "Annee complete"

                if(produit.quantiteEnStock > produit.quantiteMaximale){
                    sumSurStock += produit.prixU*(produit.quantiteEnStock-produit.quantiteMaximale)
                }
            })
            return sumSurStock
        }
        function calculateSumRupture(sumRupture: number): number{
            produits.forEach(produit => {
                // Find the product; if not found, default to { quantite: 0 }
                var prixProduit = 1
                var yearToCheck = "Tout"
                var monthToCheck = "Annee complete"

                if(produit.quantiteEnStock < produit.seuilCritique){
                    sumRupture += produit.prixU*(produit.seuilCritique - produit.quantiteEnStock)
                }
            })
            return sumRupture
        }

            // convert a month in numeriuc(08) into a string(August)
            function setProperMonth(monthToCheck: string) : string{
                switch(monthToCheck){
                    case "01":
                        monthToCheck = "Janvier"
                        break;

                    case "02":
                        monthToCheck = "Fevrier"
                        break;

                    case "03":
                        monthToCheck = "Mars"
                        break;

                    case "04":
                        monthToCheck ="Avril"
                        break;

                    case "05":
                        monthToCheck = "Mai"
                        break;

                    case "06":
                        monthToCheck = "Juin"
                        break;

                    case "07":
                        monthToCheck = "Juillet"
                        break;

                    case "08":
                        monthToCheck = "Août"
                        break;

                    case "09":
                        monthToCheck = "Septembre"
                        break;

                    case "10":
                        monthToCheck = "Octobre"
                        break;

                    case "11":
                        monthToCheck = "Novembre"
                        break;

                    case "12":
                        monthToCheck = "Décembre"
                        break;
                }
                return monthToCheck
            }

        }


        



    const updateGraphs = () => {

    };
    const updateTables = () => {
        produittableau = [];
        const tableauProduits = d3.select("#chiffreParProduit tbody");
        tableauProduits.selectAll("tr").remove();

/*         console.log("produits: " + produits) */

    
        // Check for fournisseur selection
        if (selectedFournisseur == null || selectedFournisseur === "Choisir le Fournisseur") {
            for (let i = 0; i < 4 && i < produits.length; i++) {
                produittableau[i] = produits[i];
            }
/*             console.log("No selected fournisseur path, length: " + produittableau.length); */
        } else {
            for (let i = 0; i < 4 && i < produits.length; i++) {
                produittableau[i] = produits[i];
            }
/*             console.log("Selected fournisseur path, length: " + produittableau.length); */

        }
    
        // Append rows and cells for each produit
        produittableau.forEach(produit => {
            const row = tableauProduits.append("tr").attr("key", produit.id);
/*             console.log(row) */
            row.append("td").text(produit.codeProduit);
            row.append("td").text(produit.description);
            row.append("td").text(produit.categorie.description);
            row.append("td").text(produit.quantiteEnStock);
            row.append("td").text(produit.prixU);
/*             console.log(row) */
        });
    };




        // Make sure fournisseurNoms is populated correctly
    useEffect(() => {
        const noms = fournisseurs.map(fournisseur => fournisseur.nom);
        setFournisseurNoms(noms);
    }, [fournisseurs]);



    //creates the stock over time graph
    useEffect(() => {

        // Define chart dimensions and margins
        const width = 640;
        const height = 400;
        const marginTop = 20;
        const marginRight = 20;
        const marginBottom = 30;
        const marginLeft = 40;
        const lastYear = getLastYear();
        const startYear = getStartYear();
        const maxStock = getMaxStock();

        function getMaxStock() : number {
            // *** PUT THE REAL VALUE HERE ***
            return 100;
        }

        function getLastYear(): Date{
            // *** PUT THE REAL VALUE HERE ***
            return new Date;
        }

        function getStartYear(): Date{
            // *** PUT THE REAL VALUE HERE ***
            return new Date;
        }

        // Define scales
        const x = d3.scaleUtc()
            .domain([startYear, lastYear])
            .range([marginLeft, width - marginRight]);

        const y = d3.scaleLinear()
            .domain([0, maxStock])
            .range([height - marginBottom, marginTop]);

        // Create SVG container
        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height);

        // Add axes
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y));

        // Select chart container and clean up any previous SVG
        const chartContainer = d3.select("#StockOverTime");
        chartContainer.selectAll("*").remove(); // Remove any existing elements

        // Append new SVG
        chartContainer.append(() => svg.node());

        // Cleanup function to remove SVG when component unmounts
        return () => {
            chartContainer.selectAll("*").remove();
        };
    }, [selectedFournisseur]);

    //create the top 5 client graph
    useEffect(() => {
        const width = 640;
        const height = 400;
        const marginTop = 20;
        const marginRight = 20;
        const marginBottom = 30;
        const marginLeft = 40;
        const topClients = ["X","Y","Z","A","B"]

        const x = d3.scaleBand()
            .domain(topClients)
            .range(d3.range(topClients.length).map(i => marginLeft + i * (width / topClients.length)));

        const y = d3.scaleLinear()
            .domain([0,100])
            .range([height - marginBottom, marginTop]);

        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height);
        
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x));
        
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y));

        const chartContainer = d3.select("#top5Clients");
        chartContainer.selectAll("*").remove();

        chartContainer.append(() => svg.node());

        return () => {
            chartContainer.selectAll("*").remove();
        }
    
    
    }, [selectedFournisseur])


    //create the HTML Object.
    return (
        <div>
            <div>
                <div className="headerContainer">
                    <h1>Tableau de bord</h1> 
                    <div className="fadedLabel">Afficher :</div> 
                    <select 
                        className="timePicker"
                        id="yearPicker"
                        value={selectedYear ?? "Choisir l'année"} // Handle default value
                        onChange={updateSelectedYear} 
                    >
                            <option value="" disabled>Choisir l'année</option>
                            {years.map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                    </select>
                    <select 
                        className="timePicker" 
                        id="MonthPicker" 
                        onChange={updateSelectedMonth} 
                        defaultValue="Annee complete">
                        <option value="Annee complete">Annee complete</option>
                        {availableMonths.map(month => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                    </select>
                </div>
            </div>


            {/* update dynamically */}
            <div className="reportCards container">
                <table className="table">
                    <tbody>

                        <tr className="row">

                            {/*card ventes*/}
                            <td className="col">
                                <div className="card">
                                    Les Ventes<br /><br />
                                    {totalVentes + " : " + augmentationVentes + "%"} 
                                </div>
                            </td>

                            {/*card achats*/}
                            <td className="col">
                                <div className="card">
                                    Les Achats<br /><br />
                                    {totalAchats + " : " + augmentationAchats + "%"}
                                </div>
                            </td>
    
                            {/*card achats*/}
                            <td className="col">
                                <div className="card">
                                    Surstock<br /><br />
                                    {totalSurstocks + " : " + augmentationSurstocks + "%"}
                                </div>
                            </td>
    
                            {/*card achats*/}
                            <td className="col">
                                <div className="card">
                                    Rupture de stock<br /><br />
                                    {totalRuptures + " : " + augmentationRuptures + "%"}
                                </div>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>


            {/* Container for the D3 chart */}


            <div className="reportFormat">
                
                <select 
                    className="FournisseurPicker, dataPicker"
                    id="FournisseurPicker"
                    onChange={updateSelectedFournisseur}
                    defaultValue="Tout">
                    <option value="Tout">Tout</option>
                    {fournisseurNoms.map(nom => (
                            <option key={nom} value={nom}>
                                {nom}
                            </option>
                        ))}
                </select>
                
                <select 
                    className="ProductPicker, dataPicker"
                    id="ProductPicker"
                    multiple
                    onChange={updateSelectedProducts} 
                    defaultValue={["Choisir les Produits"]}>
                    <option value="Choisir les Produits" disabled>Choisir les Produits</option>
                    {produits.map(produit => (
                            <option key={produit.nom} value={produit.nom}>
                                {produit.nom}
                            </option>
                        ))}
                </select>


                <br />

                <div id="StockOverTime" className="report"></div>
            </div>
            <div className="reportFormat">
                <h3>Top 5 des Clients</h3><br /><br />
                <div id="top5Clients" className="report"></div>
            </div>

            <br />
            <br />

            {/* 
                update dynamically 
                use the array.map() to create your rows.
            */}
            <div id="chiffreParProduit" className="report container">
                <h3>Chiffre d'affaire par produit</h3>
                <table className="chiffreParProduit">
                    <thead>
                        <tr>
                            <td>code</td>
                            <td>description</td>
                            <td>categorie</td>
                            <td>Quantite</td>
                            <td>prix total</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>code</td>
                            <td>description</td>
                            <td>categorie</td>
                            <td>Quantite</td>
                            <td>prix total</td>
                        </tr>

                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default DashBoard;