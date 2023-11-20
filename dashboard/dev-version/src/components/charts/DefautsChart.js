import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';


export default class DefautsChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    type: 'bar',
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        columnWidth: '50%',
                        distributed: true,
                        endingShape: 'rounded' // ou 'flat' si vous ne voulez pas que les barres soient arrondies en haut
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: ['Erreur', 'Faute', 'Défaillance'], // Vos catégories ici
                    labels: {
                        style: {
                            colors: ['#000'], // Couleur des labels, ajustez selon besoin
                            fontSize: '12px'
                        }
                    }
                },
                yaxis: {
                    show: false // Cache l'axe Y si vous n'en avez pas besoin
                },
                grid: {
                    show: false // Cache la grille de fond
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'vertical',
                        shadeIntensity: 0.5,
                        gradientToColors: undefined, // Ajoutez d'autres couleurs si vous voulez un dégradé
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100]
                    }
                },
                colors: ['#8E2DE2', '#4A00E0'], // Couleurs des barres, ajustez selon besoin
            },
            series: [{
                name: "",
                data: [5, 6, 7]
            }],
        };
    }

    render() {
        return (
            <React.Fragment>
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"

                />
                <div className="resize-triggers"><div className="expand-trigger"><div style={{ width: "254px", height: "482px" }}></div></div><div className="contract-trigger"></div></div>
            </React.Fragment>
        );
    }
}
