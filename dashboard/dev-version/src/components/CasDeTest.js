import React, { Component } from 'react'
import { getTestCases } from '../server/getTestsCases';
import TableFunc from './tables/TableFunc';


export default class CasDeTest extends Component {

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
        const ResDesTestCases = await getTestCases();
        console.log("TEsts : ", ResDesTestCases)
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
                <h6 className="mb-0 text-uppercase" id="label_defaut" >Liste des Cas de tests</h6>
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