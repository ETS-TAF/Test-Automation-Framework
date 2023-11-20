import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';

export default class InfoProjetsChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    height: 310,
                    type: "radialBar",
                    offsetY: -10
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -135,
                        endAngle: 135,
                        hollow: {
                            margin: 0,
                            size: "70%",
                            background: "transparent"
                        },
                        track: {
                            strokeWidth: "100%",
                            dropShadow: {
                                enabled: !1,
                                top: -3,
                                left: 0,
                                blur: 4,
                                opacity: .12
                            }
                        },
                        dataLabels: {
                            name: {
                                fontSize: "16px",
                                color: "#212529",
                                offsetY: 5
                            },
                            value: {
                                offsetY: 20,
                                fontSize: "30px",
                                color: "#212529",
                                formatter: function (e) {
                                    return e + "%"
                                }
                            }
                        }
                    }
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "dark",
                        shadeIntensity: .15,
                        inverseColors: !1,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 50, 65, 91]
                    }
                },
                colors: ["#17a00e"],
                stroke: {
                    dashArray: 4
                },
                labels: ["Pourcentage projet testé"],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            height: 300
                        }
                    }
                }]
            },
            series: this.props.data.pourcentage
        };
    }

    render() {
        return (
            <React.Fragment>
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type='radialBar'
                />
                <div className="resize-triggers"><div className="expand-trigger"><div style={{ width: "254px", height: "482px" }}></div></div><div className="contract-trigger"></div></div>

            </React.Fragment>
        );
    }
}
