import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';


export default class CategorieDeTest4 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    foreColor: "#9ba7b2",
                    type: "area",
                    height: 270,
                    toolbar: {
                        show: !1
                    },
                    zoom: {
                        enabled: !1
                    },
                    dropShadow: {
                        enabled: !0,
                        top: 3,
                        left: 14,
                        blur: 4,
                        opacity: .12,
                        color: "#0d6efd"
                    },
                    sparkline: {
                        enabled: !1
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
                grid: {
                    show: true,
                    borderColor: 'rgba(0, 0, 0, 0.15)',
                    strokeDashArray: 4,
                },
                plotOptions: {
                    bar: {
                        horizontal: !1,
                        columnWidth: "30%",
                        endingShape: "rounded"
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
                    //////////////////////////////////////////////graphe//////////////////////////////////
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    theme: "dark",
                    fixed: {
                        enabled: !1
                    },
                    x: {
                        show: !0
                    },
                    y: {
                        formatter: function (e) {
                            return " " + e + " "
                        }
                    },
                    marker: {
                        show: !1
                    }
                }
            },
            series: [{
                name: "Test exécuté",
                data: [10, 5, 8, 10, 3, 5, 7, 2, 10, 11, 15, 20]
            }]
        };
    }

    render() {
        return (
            <React.Fragment>
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="area"

                />
                <div className="resize-triggers"><div className="expand-trigger"><div style={{ width: "254px", height: "482px" }}></div></div><div className="contract-trigger"></div></div>
            </React.Fragment>
        );
    }
}
