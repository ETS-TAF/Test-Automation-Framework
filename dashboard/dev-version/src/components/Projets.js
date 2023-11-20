import React, { Component } from 'react'
import DefautsChart from './charts/DefautsChart'
import { getDefautsResult } from '../server/getDefautsResult';
import TableFunc from './tables/TableFunc';

import { getProjects } from '../server/getProjets';


export default class Defauts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ProjetsData: null,
            columns: null,
            loading: true
        };

    }

    // GET DATA
    async componentDidMount() {
        const ResDesProjets = await getProjects();
        console.log("--------------------")
        console.log(ResDesProjets);
        const columns = Object.keys(ResDesProjets[0]).map(key => ({
            Header: key,
            accessor: key
        }));

        this.setState({
            ProjetsData: ResDesProjets,
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
                <h6 className="mb-0 text-uppercase" id="label_defaut" >Liste des Projets</h6>
                <hr />



                <div className="card">
                    <div className="card-body">

                        <div className="table-responsive">

                            {/* Defauts Table */}
                            <TableFunc columns={this.state.columns} data={this.state.ProjetsData} />
                        </div>

                    </div>
                </div>

            </React.Fragment >
        )
    }
}
