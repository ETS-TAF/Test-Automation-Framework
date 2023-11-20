import React, { Component } from 'react'
import ResDesTestsChart from './charts/ResDesTestsChart'
import ExecutionChart from './charts/ExecutionChart'
import InfoProjetsChart from './charts/InfoProjetsChart'
import CategorieDeTest1 from './charts/CategorieDeTest1'
import CategorieDeTest2 from './charts/CategorieDeTest2'
import CategorieDeTest3 from './charts/CategorieDeTest3'
import CategorieDeTest4 from './charts/CategorieDeTest4'
import apiServices from '../server/apiServices'
import { getTestResult } from '../server/getTestResult'
import { getBrowserData } from '../server/getBrowserResult'
import { getProjectResult } from '../server/getProjectResult'
import { getUserResult } from '../server/getUserResult'

export default class Dash extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ResDesTestsChartData: null,
            ExecutionChartData: null,
            ProjectsInfoData: null,
            UsersData: null,

            loading: true
        };

    }

    // GET DATA
    async componentDidMount() {
        const ResDesTestsResult = await getTestResult();
        const ExecutionChartResult = await getBrowserData();
        const ProjectsResult = await getProjectResult();
        const UsersResult = await getUserResult();
        this.setState({
            ResDesTestsChartData: ResDesTestsResult,
            ExecutionChartData: ExecutionChartResult,
            ProjectsInfoData: ProjectsResult,
            UsersData: UsersResult,
            loading: false
        });
    }

    renderUser() {
        const users = this.state.UsersData;

        let view = [];
        for (let i = 0; i < users.email.length; i++) {

            view.push(
                <div className="customers-list-item d-flex align-items-center border-bottom p-2 cursor-pointer" key={i}>
                    <div className="ms-2">
                        <h6 className="mb-1 font-14">{users.fullname[i]}</h6>
                        <p className="mb-0 font-13 text-secondary"> {users.email[i]} </p>
                        <p className="mb-0 font-13 text-secondary"><b style={{ color: "#333131" }}>Groupe id</b>: {users.group_id[i]}</p>
                    </div>
                    <div className="list-inline d-flex customers-contacts ms-auto">	<a href="#" className="list-inline-item"><i className='bx bxs-envelope'></i></a>
                        <a href="#" className="list-inline-item"><i className='bx bxs-microphone'></i></a>
                        <a href="#" className="list-inline-item"><i className='bx bx-dots-vertical-rounded'></i></a>
                    </div>
                </div>
            )
        }

        console.log(view)

        return view;
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
                <div className="row row-cols-1 row-cols-lg-3">
                    <div className="col d-flex">
                        <div className="card radius-10 w-100">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h5 className="mb-0">Résultats des tests</h5>
                                    </div>
                                </div>
                                <div className="mt-5" id="chart15">

                                    <ResDesTestsChart data={this.state.ResDesTestsChartData} />
                                    {/* Chart 15 ResDesTests */}

                                </div>
                            </div>
                            <ul className="list-group list-group-flush">
                                <div id="test">

                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className="col d-flex">
                        <div className="card radius-10 w-100">
                            <div className="card-body">
                                <p className="font-weight-bold mb-1 text-secondary">Exécutions</p>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h6 className="mb-0" id="qtyexecution">
                                            Test Navigateur : {this.state.ExecutionChartData.taille}
                                        </h6>
                                    </div>
                                    <div className="">

                                    </div>
                                </div>
                                <div id="chart21">
                                    <ExecutionChart data={this.state.ExecutionChartData} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex">
                        <div className="card radius-10 w-100 overflow-hidden">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h6 className="mb-0">Infos projets/Environnement</h6>
                                    </div>
                                </div>
                                <div className="mt-5" id="chart20">
                                    <InfoProjetsChart data={this.state.ProjectsInfoData} />
                                </div>

                            </div>
                            <div className="card-footer bg-transparent border-top-0" id="info_projet">
                                <div className="d-flex align-items-center justify-content-between text-center">
                                    <h6 style={{ fontSize: "15px", color: "red" }}>Quantité de projet testé par OS</h6>

                                </div>
                                <p>[{this.state.ProjectsInfoData.environnement[0]} : {this.state.ProjectsInfoData.count[0]}] [{this.state.ProjectsInfoData.environnement[1]} : {this.state.ProjectsInfoData.count[1]}] [{this.state.ProjectsInfoData.environnement[2]} : {this.state.ProjectsInfoData.count[2]}]   </p>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12 col-xl-6 d-flex">
                        <div className="card radius-10 w-100">
                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h5 className="mb-0">Liste des utilisateurs</h5>
                                    </div>

                                </div>
                            </div>
                            <div className="customers-list-item d-flex align-items-center border-bottom p-2 cursor-pointer limits">
                                <div className="ms-2">
                                    <div id="users_info">
                                        {this.renderUser()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-6 d-flex">
                        <div className="card radius-10 w-100">
                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h5 className="mb-0">Catégorie de test</h5>
                                    </div>

                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row m-0 row-cols-1 row-cols-md-3">
                                    <div className="col border-end">
                                        <div id="chart16">
                                            <CategorieDeTest1 data={this.state.ResDesTestsChartData} />
                                        </div>
                                    </div>
                                    <div className="col border-end">
                                        <div id="chart17">
                                            <CategorieDeTest2 data={this.state.ResDesTestsChartData} />

                                        </div>
                                    </div>
                                    <div className="col">
                                        <div id="chart18">
                                            <CategorieDeTest3 data={this.state.ResDesTestsChartData} />

                                        </div>
                                    </div>
                                </div>
                                <div id="chart19">
                                    <CategorieDeTest4 data={this.state.data} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}