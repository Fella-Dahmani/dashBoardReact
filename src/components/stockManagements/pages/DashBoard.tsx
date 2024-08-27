import "../css/dashboard.css"
import * as d3 from "d3";
import React, { useState, useEffect } from "react";
import axios from "axios";

type Produit = {
    id: number;
    nom: String;
    code: String;
    description: String;
    categorie: String;
    qty: number;
    prix: number;
}

type Fournisseur = {
    code: String;
    prenom: String;
    nom: String;
    id: number;
}

type Client = {
    nom: String;
    id: number;
}

type Entree = {
    id: number;
    produitId: number;
    qty: number;
}

type Sortie = {
    id: number;
    produitId: number;
    qty: number;
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
    var fournisseurNoms: string[] = [];

    // Selector State Management
    const [years, setYears] = useState<number[]>([2022, 2023, 2024]); //availableYears
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<String | null>(null);
    const [selectedFournisseur,setSelectedFournisseur] = useState<String | null>(null); //state []
    const [selectedProducts,setSelectedProducts] = useState<String[] | null>(null); //state []

        


    // values for rendering Graphs and Cards
    var ventes = []
    var achats = []
    var surstock = []
    var ruptures = []
    var totalVentes = "test ventes"
    var augmentationVentes = "test ventes"
    var totalAchats = "test achats"
    var augmentationAchats = "test achats"
    var totalSurstocks = "test surstocks"
    var augmentationSurstocks = "test surstocks"
    var totalRuptures = "test ruptures"
    var augmentationRuptures = "test ruptures"

    /*  
    *   Most Likely missing product over time data.
    */

    //hanlde user input
    const updateSelectedYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(event.target.value));
    };

    const updateSelectedMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Update the state with the selected value
        setSelectedMonth(event.target.value);
    };

    const updateSelectedFournisseur = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
    }, [selectedYear, selectedMonth, selectedFournisseur, selectedProducts])

    const applyFilters = () =>{
        syncData();
        updateCards();
        updateGraphs();
        updateTables();
    } 

    const syncData = () => {

            // *** PUT THE REAL VALUE HERE ***
            axios.get("", {}).then(response => {
                setClients(response.data);
            }).catch();
            
                // *** PUT THE REAL VALUE HERE ***
            axios.get("", {}).then(response => {
                setFournisseurs(response.data);
            }).catch();
    
            // *** PUT THE REAL VALUE HERE ***
            axios.get("", {}).then(response => {
                setProduits(response.data);
            }).catch();
            
                // *** PUT THE REAL VALUE HERE ***
            axios.get("", {}).then(response => {
                setSorties(response.data);
            }).catch();
    
            // *** PUT THE REAL VALUE HERE ***
            axios.get("", {}).then(response => {
                setEntrees(response.data);
            }).catch();
                    
    }

    const updateCards = () => {

        //update each card one by one

        

    };
    const updateGraphs = () => {

    };
    const updateTables = () => {

    };


    //creates the stock over time graph
    useEffect(() => {
        console.log('useEffect running'); // Check if this runs more than once

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
    }, []);

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
    
    
    }, [])


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
                        defaultValue="Choisir le mois">
                        <option value="Choisir le mois" disabled>Choisir le mois</option>
                        {availableMonths.map(month => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                    </select>
                </div>
                <br />
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
                    className="FournisseurPicker" 
                    id="FournisseurPicker" 
                    onChange={updateSelectedFournisseur} 
                    defaultValue="Choisir le Fournisseur">
                    <option value="Choisir le Fournisseur" disabled>Choisir le Fournisseur</option>
                    {fournisseurNoms.map(nom => (
                            <option key={nom} value={nom}>
                                {nom}
                            </option>
                        ))}
                </select>

                <br />

                <div id="StockOverTime" className="report"></div>
            </div>
            <div className="reportFormat">
                
            <select 
                    className="ProductPicker"
                    id="ProductPicker"
                    multiple
                    onChange={updateSelectedProducts} 
                    defaultValue="Choisir le Fournisseur">
                    <option value="Choisir le Fournisseur" disabled>Choisir le Fournisseur</option>
                    {fournisseurNoms.map(nom => (
                            <option key={nom} value={nom}>
                                {nom}
                            </option>
                        ))}
                </select>

                <br />

                <div id="top5Clients" className="report"></div>
            </div>
            <br />
            <br />

            {/* 
                update dynamically 
                use the array.map() to create your rows.
            */}
            <div id="chiffreParProduit" className="report conatiner">
                <table className="table">
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
                        <tr className="row">
                            <td className="col"><div >test</div></td>
                            <td className="col"><div >test</div></td>
                            <td className="col"><div >test</div></td>
                            <td className="col"><div >test</div></td>
                            <td className="col"><div >test</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default DashBoard;