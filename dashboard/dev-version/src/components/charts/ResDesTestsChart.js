import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';


export default class ResDesTestsChart extends Component {
    constructor(props) {

        super(props);
        this.state = {
            series: this.props.data.count,// Jeu de données de test

            options: {
                chart: {
                    type: 'donut',
                },
                colors: ['#FF0000', '#FFFF00', '#008000', '#0000FF'], // Couleurs de chaque segment
                legend: {
                    show: true, // Activez ou désactivez la légende
                },
                labels: ['PASSED', 'UNCOVERED', 'FAILED', 'NOTRUN'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },

        };

    }


    render() {
        return (
            <div>
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="donut" // Changez le type selon vos besoins (bar, pie, etc.)
                    height="350"
                />
                <div className="resize-triggers"><div className="expand-trigger"><div style={{ width: "254px", height: "482px" }}></div></div><div className="contract-trigger"></div></div>

            </div>
        )
    }
}
