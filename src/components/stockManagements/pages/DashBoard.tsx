import "../css/dashboard.css"
import * as d3 from "d3";
import { useEffect } from "react";











    // the HTMl element to be sent for render into the index.html view
const DashBoard = () => {

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

        // Define scales
        const x = d3.scaleUtc()
            .domain([new Date("2023-01-01"), new Date("2024-01-01")])
            .range([marginLeft, width - marginRight]);

        const y = d3.scaleLinear()
            .domain([0, 100])
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

        const x = d3.scaleOrdinal()
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


    return (
        <div>


            <div>
                <div className="headerContainer">
                    <h1>Tableau de bord</h1> 
                    <div className="fadedLabel">Afficher :</div> 
                    <select className="timePicker" id="yearPicker" defaultValue="Choisir l'année">
                        <option value="Choisir l'année" disabled>Choisir l'année</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                    </select>
                    <select className="timePicker" id="MonthPicker" defaultValue="Choisir le mois">
                        <option value="Choisir le mois" disabled>Choisir le mois</option>
                        <option value="2024">Janvier</option>
                        <option value="2025">Fevrier</option>
                        <option value="2026">Mars</option>
                    </select>
                </div>
                <br />
            </div>

            <div className="reportCards container">
                <table className="table">
                    <tbody>
                        <tr className="row">
                        <td className="col"><div className="card">test</div></td>
                        <td className="col"><div className="card">test</div></td>
                        <td className="col"><div className="card">test</div></td>
                        <td className="col"><div className="card">test</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>


            {/* Container for the D3 chart */}
            <div id="StockOverTime" className="report"></div>
            <div id="top5Clients" className="report"></div>
            <br />
            <br />
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