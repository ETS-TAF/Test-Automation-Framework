import React, { Component } from 'react'
import DefautsChart from './charts/DefautsChart'
import { getDefautsResult } from '../server/getDefautsResult';
import TableFunc from './tables/TableFunc';

import { getProjects } from '../server/getProjets';

import { getTests } from '../server/getTests';


export default class Tests extends Component {

    constructor(props) {
        super(props);

        this.state = {
            TestsData: null,
            columns: null,
            loading: true
        };

    }

    // GET DATA
    async componentDidMount() {
        const ResDesTestCases = await getTests();
        const columns = Object.keys(ResDesTestCases[0]).map(key => ({
            Header: key,
            accessor: key
        }));

        this.setState({
            TestsData: ResDesTestCases,
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
                <h6 className="mb-0 text-uppercase" id="label_defaut" >Liste des résultats des tests</h6>
                <hr />



                <div className="card">
                    <div className="card-body">

                        <div className="table-responsive">

                            {/* Defauts Table */}
                            <TableFunc columns={this.state.columns} data={this.state.TestsData} />
                        </div>

                    </div>
                </div>

            </React.Fragment >
        )
    }
}