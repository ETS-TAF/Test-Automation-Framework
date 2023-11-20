import React, { Component } from 'react'
import DefautsChart from './charts/DefautsChart'
import { getDefautsResult } from '../server/getDefautsResult';
import TableFunc from './tables/TableFunc';
export default class Defauts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DefautsData: null,
            columns: null,
            loading: true
        };

    }

    // GET DATA
    async componentDidMount() {
        const ResDesDefauts = await getDefautsResult();
        const columns = Object.keys(ResDesDefauts[0]).map(key => ({
            Header: key,
            accessor: key
        }));

        this.setState({
            DefautsData: ResDesDefauts,
            columns: columns,
            loading: false
        });
    }
    render() {
        if (this.state.loading) {
            return (
                <React.Fragment>

                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <div className="row row-cols-4 row-cols-md-4 row-cols-xl-4" id="graphe">
                    <div className="col">
                        <div className="card radius-10">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div id="totaldefauts">

                                    </div>
                                </div>
                                <div className="" id="chart2">
                                    <DefautsChart />
                                </div>
                                <p style={{ textAlign: "center" }}>Erreur Faute Défaillance</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h6 className="mb-0 text-uppercase" id="label_defaut" >Liste des défauts</h6>
                <hr />



                <div className="card">
                    <div className="card-body">

                        <div className="table-responsive">

                            {/* Defauts Table */}
                            <TableFunc columns={this.state.columns} data={this.state.DefautsData} />
                        </div>

                    </div>
                </div>

            </React.Fragment >
        )
    }
}
