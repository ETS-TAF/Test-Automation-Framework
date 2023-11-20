import React, { Component } from 'react'
import ReactApexChart
    from 'react-apexcharts';
export default class ExecutionChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    foreColor: "#6c757d",
                    type: "bar",
                    height: 390,
                    toolbar: {
                        show: !1
                    },
                    zoom: {
                        enabled: !1
                    },
                    dropShadow: {
                        enabled: !1,
                        top: 3,
                        left: 10,
                        blur: 3,
                        opacity: .1,
                        color: "#0d6efd"
                    },
                    sparkline: {
                        enabled: !1
                    }
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: "70%"
                        }
                    },
                    bar: {
                        horizontal: !1,
                        columnWidth: "35%",
                        endingShape: "rounded"
                    }
                },
                markers: {
                    size: 0,
                    colors: ["#0d6efd"],
                    strokeColors: "#fff",
                    strokeWidth: 2,
                    hover: {
                        size: 7
                    }
                },
                dataLabels: {
                    enabled: !1
                },
                stroke: {
                    show: !0,
                    width: 3,
                    curve: "smooth"
                },
                colors: ["#0d6efd"],
                xaxis: {
                    categories: this.props.data.navigateur /* nav//nom des navigateurs utilisés */
                },
                grid: {
                    show: true,
                    borderColor: 'rgba(0, 0, 0, 0.15)',
                    strokeDashArray: 4,
                },
                fill: {
                    opacity: 1
                }
            },
            series: [{
                name: 'Quantité',
                data: this.props.data.count // Un exemple de jeu de données
            }]
        };
        console.log(this.props.data)

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
