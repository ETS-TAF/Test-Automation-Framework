import ReactApexChart from 'react-apexcharts';


constructor(props) {
    super(props);

    this.state = {
        options: { /* options de votre graphique */ },
        series: [/* série de données */]
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


<div class="resize-triggers"><div class="expand-trigger"><div style="width: 254px; height: 482px;"></div></div><div class="contract-trigger"></div></div>