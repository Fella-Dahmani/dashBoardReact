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
    produit: { id: number; }
    quantite: number;
    dateOperation: string;
}

/*
    /api/client/dashboard/sortie
*/
type Sortie = {
    id: number;
    produit: { id: number; }
    quantite: number;
    dateOperation: string;
}

class produitsOverTime {
    constructor(public produit: Produit, public stock: Record<number, yearArray>, public entrees: Entree[], public sorties: Sortie[]){}
}
type yearArray = number[]

/*
######################
######################

###      #    ### #  #                                                       
#  #    # #  #    #  #                                          
#   #  #   #  ##  ####                                         
#  #   #####    # #  #                                              
###    #   # ###  #  #                                          

######################
######################

*/



// the HTMl element to be sent for render into the index.html view
const DashBoard = () => {

    /*
    ######################
    
        #
        #
        #

    ######################
    */


    //Retreived Data
    const [clients, setClients] = useState<Client[]>([]);
    const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([]);
    const [produits, setProduits] = useState<Produit[]>([]);
    const [entrees, setEntrees] = useState<Entree[]>([]);
    const [sorties, setSorties] = useState<Sortie[]>([]);

    // Values and Lists for Selectors
    var firstYear: number;
    var currentYear: number = new Date().getFullYear()
    var availableYears;
    const availableMonths = [
        "Janvier", "Fevrier", "Mars", "Avril",
        "Mai", "Juin", "Juillet", "Août",
        "Septembre", "Octobre", "Novembre", "Décembre"
    ]


    const [stocksOverTime, setStocksOverTime] = useState<produitsOverTime[]>([])

    // Selector State Management
    const [years, setYears] = useState<string[]>(["2022", "2023", "2024"]); //availableYears
    const [selectedYear, setSelectedYear] = useState<string | null>("Tout");
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [selectedFournisseur, setSelectedFournisseur] = useState<string | null>(null); //state []
    const [selectedProducts, setSelectedProducts] = useState<string[] | null>(null); //state []

    // Ensure fournisseurNoms state is managed
    const [fournisseurNoms, setFournisseurNoms] = useState<string[]>([]);


    // values for rendering Graphs and Cards
    var ventes = []
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
    var produittableau: Produit[] = []

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

    /*
    ######################
     
        #  #    
        #  #                           
        #  #

    ######################
    */

    //refresh Logic
    useEffect(() => {
        applyFilters();
    }, [selectedYear, selectedMonth, selectedFournisseur, selectedProducts])

    const applyFilters = () => {
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

        targetUrl = baseURL + "clients/profits"
        axios.get(targetUrl, {}).then(response => {
            setClients(response.data);
        }).catch();

        targetUrl = baseURL + "fournisseurs"
        axios.get(targetUrl, {}).then(response => {
            setFournisseurs(response.data);
        })
            .catch(error => {
                console.error("Erreur lors de la récupération des fournisseurs :", error);
            }
            );

        targetUrl = baseURL + "produits"
        axios.get(targetUrl, {})
            .then(response => {
                setProduits(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des produits :", error);
            });

        targetUrl = baseURL + "entree"
        axios.get(targetUrl, {})
            .then(response => {
                setSorties(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des sorties :", error);
            });

        targetUrl = baseURL + "sortie"
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
            if (entre.dateOperation.length > 0) {
                years.add(entre.dateOperation.substring(0, 4))
            }
        })
        sorties.forEach(sortie => {
            if (sortie.dateOperation.length > 0) {
                years.add(sortie.dateOperation.substring(0, 4))
            }
        })
        var displayYears: string[] = ["Tout"]
        years.forEach(date =>
            displayYears.push(date)
        )
        setYears(displayYears)

        firstYear = findFirstYear();



    };


    /*
######################

    #  #  #
    #  #  #
    #  #  #

######################
*/

    //##############################################################################################
    const updateCards = () => {

        var valueTotalVentes = 0;
        var valueTotalAchats = 0;
        var valueTotalSurstocks = 0;
        var valueTotalRuptures = 0;


        if (sorties.length > 0 && produits.length > 0 && produits[0] != null && produits[0] != undefined) {
            var sumVentes = 0;
            var sumAchats = 0;
            var sumSurStock = 0;
            var sumRupture = 0;

            var yearToMatch = selectedYear
            var monthToMatch = selectedMonth

            sumVentes = calculateSumVentes(sumVentes)
            sumAchats = calculateSumAchats(sumAchats)
            sumSurStock = calculateSumSurtock(sumSurStock)
            sumRupture = calculateSumRupture(sumRupture)

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



        function calculateSumVentes(sumVentes: number): number {
            sorties.forEach(sortie => {
                // Find the product; if not found, default to { quantite: 0 }
                const produit = produits.find(produit => produit.id === sortie.produit.id);
                var prixProduit = 1
                var yearToCheck = "Tout"
                var monthToCheck = "Annee complete"

                if (sortie.dateOperation != undefined && sortie.dateOperation.length > 0)
                    var yearToCheck = sortie.dateOperation.substring(0, 4)

                if (sortie.dateOperation != undefined && sortie.dateOperation.length > 0) {
                    var monthToCheck = sortie.dateOperation.substring(5, 7)
                    monthToCheck = setProperMonth(monthToCheck)
                }

                if (produit != undefined) {
                    if (produit.prixVente != undefined) {
                        prixProduit = produit.prixVente
                        if (yearToCheck === yearToMatch || yearToMatch == "Tout") {
                            if (monthToCheck === monthToMatch) {
                                sumVentes += sortie.quantite * prixProduit;
                            }
                            else if (monthToMatch == "Annee complete") {
                                sumVentes += sortie.quantite * prixProduit;
                            }
                        }
                    }
                }
            })
            return sumVentes
        }

        function calculateSumAchats(sumAchats: number): number {
            entrees.forEach(entre => {
                // Find the product; if not found, default to { quantite: 0 }
                const produit = produits.find(produit => produit.id === entre.produit.id);
                var prixProduit = 1
                var yearToCheck = "Tout"
                var monthToCheck = "Annee complete"

                if (entre.dateOperation != undefined && entre.dateOperation.length > 0)
                    var yearToCheck = entre.dateOperation.substring(0, 4)

                if (entre.dateOperation != undefined && entre.dateOperation.length > 0) {
                    var monthToCheck = entre.dateOperation.substring(5, 7)
                    monthToCheck = setProperMonth(monthToCheck)
                }

                if (produit != undefined) {
                    if (produit.prixVente != undefined) {
                        prixProduit = produit.prixVente
                        if (yearToCheck === yearToMatch || yearToMatch == "Tout") {
                            if (monthToCheck === monthToMatch) {
                                sumAchats += entre.quantite * prixProduit;
                            }
                            else if (monthToMatch == "Annee complete") {
                                sumAchats += entre.quantite * prixProduit;
                            }
                        }
                    }
                }
            })
            return sumAchats
        }
        function calculateSumSurtock(sumSurStock: number): number {
            produits.forEach(produit => {
                if (produit.quantiteEnStock > produit.quantiteMaximale) {
                    sumSurStock += produit.prixU * (produit.quantiteEnStock - produit.quantiteMaximale)
                }
            })
            return sumSurStock
        }
        function calculateSumRupture(sumRupture: number): number {
            produits.forEach(produit => {
                if (produit.quantiteEnStock < produit.seuilCritique) {
                    sumRupture += produit.prixU * (produit.seuilCritique - produit.quantiteEnStock)
                }
            })
            return sumRupture
        }
    }

    //##############################################################################################
    const updateGraphs = () => {
        console.log("updateGraphs")

        calculteStockOverTime();
        
        console.log("calculteStockOverTime completed")

        console.log("currentYear: "+currentYear+", firstYear: "+firstYear)

        function calculteStockOverTime() {

            //load product into martix
            produits.forEach((produit, index) => {
                // produces an produits over time with only th eproduct in it
                stocksOverTime[index] = new produitsOverTime(produit,{} ,[],[])
                // loads the produits over time with the full needed amount of empty years of tracking
                for (var i = firstYear; i <= currentYear; i++) {
                    stocksOverTime[index].stock[i] = new Array(12).fill(0);
                }
            })

            //load entrees on products
            entrees.forEach(entree => {
                stocksOverTime.forEach(stock => {
                    if (stock.produit.id == entree.produit.id)
                        stock.entrees.push(entree)
                })
            })
            //load sorties on products
            sorties.forEach(sortie => {
                stocksOverTime.forEach(stock => {
                    if (stock.produit.id == sortie.produit.id)
                        stock.sorties.push(sortie)
                })
            })


            stocksOverTime.forEach(stock => {
                //for each entre in stock, increment the stock record so it has the total incomming number for this months
                stock.entrees.forEach(entree => {
                    var anneeRaw: string = entree.dateOperation
                    console.log(anneeRaw)
                    anneeRaw = "2"+anneeRaw.substring(1, 4)
                    var annee: number = Number.parseInt(anneeRaw)

                    var moisRaw: string = entree.dateOperation
                    moisRaw = moisRaw.substring(5, 7)
                    var mois: number = Number.parseInt(moisRaw)
                    console.log("entree.produit.id: "+entree.produit.id+", stock.stock["+annee+"]["+mois+"]: "+stock.stock[annee][mois]+", entree.quantite: "+entree.quantite)
                    stock.stock[annee][mois] = stock.stock[annee][mois] += entree.quantite
                    console.log("entree.produit.id: "+entree.produit.id+", stock.stock["+annee+"]["+mois+"]: "+stock.stock[annee][mois])
                })

                //for each sortie in stock, decrements the stock record so it has the total incomming number for this months
                stock.sorties.forEach(sortie => {
                    var anneeRaw: string = sortie.dateOperation
                    anneeRaw = anneeRaw.substring(0, 4)
                    var annee: number = Number.parseInt(anneeRaw)

                    var moisRaw: string = sortie.dateOperation
                    moisRaw = moisRaw.substring(5, 7)
                    var mois: number = Number.parseInt(moisRaw)
                    console.log("entree.produit.id: "+sortie.produit.id+", stock.stock["+annee+"]["+mois+"]: "+stock.stock[annee][mois]+", entree.quantite: "+sortie.quantite)
                    stock.stock[annee][mois] = stock.stock[annee][mois] -= sortie.quantite
                    console.log("sortie.produit.id: "+sortie.produit.id+", stock.stock["+annee+"]["+mois+"]: "+stock.stock[annee][mois])

                })

                //variable to store quantity over time of the produit 
                //So it can convert the quantity on the month per year(produitsOverTime) stores
                //the stock at the date instead of the variation the month had
                var qtyCalculator: number = stock.produit.quantiteEnStock
                // find current month
                var currentMonth: number = new Date().getMonth() - 1
                // iterate throught currentYear => firstYear record with for loop--
                for (var i = currentYear; i >= firstYear && i > 2000; i--) {
                    // check if curent year and set sarting month to dec or current.
                    if (i == currentYear)
                        // call on function that goes through the array
                        processStockPerYear(stock.stock[i], currentMonth)
                    else
                        processStockPerYear(stock.stock[i], 11)
                }


                // receive current array and starting month and converts the stored value from quantity fluctuation to quantitty at the time.
                function processStockPerYear(stock: yearArray, startingMonth: number) {
                    // go throught array from strating month to 0
//                    console.log("startingMonth :"+startingMonth)
                    for (var i = startingMonth; i >= 0; i--) {
                        // save increamental value
                        var increamentalValue = stock[i]
                        // set the months value to qtyCalculator - increamental value
//                        console.log("stock[i]: "+stock[i]+", qtyCalculator: "+qtyCalculator+", increamentalValue: "+increamentalValue)
                        stock[i] = qtyCalculator -= increamentalValue
//                        console.log("updated stock[i]: "+stock[i])

                    }
                }
            }
            )
        }
    }

    //##############################################################################################
    const updateTables = () => {
        produittableau = [];
        const tableauProduits = d3.select("#chiffreParProduit tbody");
        tableauProduits.selectAll("tr").remove();

        // Check for fournisseur selection
        if (selectedFournisseur == null || selectedFournisseur === "Tout") {
            for (var i = 0; produittableau.length < 5 && i < produits.length; i++) {
                produittableau[i] = produits[i];
            }
        } else {
            for (var i = 0; produittableau.length < 5 && i < produits.length; i++) {
                if (produits[i].fournisseur.nom == selectedFournisseur || selectedFournisseur == "Tout") { produittableau[i] = produits[i]; }
            }

        }

        // Append rows and cells for each produit
        produittableau.forEach(produit => {

            const row = tableauProduits.append("tr").attr("key", produit.id);

            row.append("td").text(produit.codeProduit);
            row.append("td").text(produit.description);
            row.append("td").text(produit.categorie.description);
            row.append("td").text(produit.quantiteEnStock);
            row.append("td").text(produit.prixU);
        });
    };

    // Make sure fournisseurNoms is populated correctly
    useEffect(() => {
        const noms = fournisseurs.map(fournisseur => fournisseur.nom);
        setFournisseurNoms(noms);
    }, [fournisseurs]);




    /*
    ######################
     
        #  #   # 
        #   # #                          
        #    #

    ######################
    */


    // convert a month in numeriuc(08) into a string(August)
    function setProperMonth(monthToCheck: string): string {
        switch (monthToCheck) {
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
                monthToCheck = "Avril"
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

    function findFirstYear() {
        var foundYear: number = currentYear
        console.log(foundYear)
        entrees.forEach(entree => {
            var newYear = Number.parseInt(entree.dateOperation.substring(0, 4))
            if (newYear < foundYear)
                foundYear = newYear
        })
        sorties.forEach(sortie => {
            var newYear = Number.parseInt(sortie.dateOperation.substring(0, 4))
            if (newYear < foundYear)
                foundYear = newYear
        })
        return foundYear;
    }

    /*
    ######################
     
            #   # 
             # #                          
              #

    ######################
    */

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

        function getMaxStock(): number {
            // *** PUT THE REAL VALUE HERE ***
            return 100;
        }

        function getLastYear(): Date {
            // *** PUT THE REAL VALUE HERE ***
            return new Date;
        }

        function getStartYear(): Date {
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
        const topClients = ["X", "Y", "Z", "A", "B"]

        const x = d3.scaleBand()
            .domain(topClients)
            .range(d3.range(topClients.length).map(i => marginLeft + i * (width / topClients.length)));

        const y = d3.scaleLinear()
            .domain([0, 100])
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


    /*
    ######################
     
            #   # # 
             # #  #                        
              #   #

    ######################
    */


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