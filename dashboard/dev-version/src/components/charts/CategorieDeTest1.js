import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';


export default class CategorieDeTest1 extends Component {


    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    height: 180,
                    type: "radialBar",
                    toolbar: {
                        show: !1
                    }
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 0,
                            size: "78%",
                            background: "transparent",
                            image: void 0,
                            imageOffsetX: 0,
                            imageOffsetY: 0,
                            position: "front",
                            dropShadow: {
                                enabled: !1,
                                top: 3,
                                left: 0,
                                blur: 4,
                                color: "rgba(0, 169, 255, 0.85)",
                                opacity: .65
                            }
                        },
                        track: {
                            margin: 0,
                            dropShadow: {
                                enabled: !1,
                                top: -3,
                                left: 0,
                                blur: 4,
                                color: "rgba(0, 169, 255, 0.5)",
                                opacity: .65
                            }
                        },
                        dataLabels: {
                            showOn: "always",
                            name: {
                                offsetY: -8,
                                show: !0,
                                color: "#6c757d",
                                fontSize: "15px"
                            },
                            value: {
                                formatter: function (e) {
                                    return e + "%"
                                },
                                color: "#000",
                                fontSize: "25px",
                                show: !0,
                                offsetY: 10
                            }
                        }
                    }
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "light",
                        type: "horizontal",
                        shadeIntensity: .5,
                        gradientToColors: ["#17a00e"],
                        inverseColors: !1,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100]
                    }
                },
                colors: ["#17a00e"],
                stroke: {
                    lineCap: "round",
                    width: "5"
                },
                labels: ["Test GUI"]
            },
            series: [this.props.data.percentagetestcategory[0]]
        };
    }

    render() {
        return (
            <React.Fragment>
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="radialBar"
                />
                <div className="resize-triggers"><div className="expand-trigger"><div style={{ width: "254px", height: "482px" }}></div></div><div className="contract-trigger"></div></div>
            </React.Fragment>
        );
    }
}
