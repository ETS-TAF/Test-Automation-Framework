import React, { Component } from 'react'
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CasDeTest from '../components/CasDeTest';
import Defauts from '../components/Defauts';
import Projets from '../components/Projets';
import Tests from '../components/Tests';
import login from '../components/Login';
import Dash from '../components/Dash';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default class MainContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        }

        this.navigate = this.navigate.bind(this)
        this.renderPage = this.renderPage.bind(this)
    }

    navigate(id) {
        this.setState({ selected: id })
    }

    renderPage() {
        let view;
        switch (this.state.selected) {

            case 0:
                view = <Dash />
                break;

            case 1:
                view = <CasDeTest />
                break;
            case 2:
                view = <Defauts />
                break;

            case 3:
                view = <Projets />
                break;

            case 4:
                view = <Tests />
                break;

            default:
                break;
        }
        return view;
    }

    render() {
        if (JSON.parse(localStorage.getItem("user")) == null || JSON.parse(localStorage.getItem("user")) == "") {
            return (
                <Redirect to="/login" />)
        }
        return (
            <React.Fragment>
                <div className='wrapper'>
                    {/* Side BAR START */}

                    <SideBar selected={this.state.selected} navigate={this.navigate} />

                    {/* send selected to header to active links  */}
                    <Header />

                    {/*  */}
                    <div className='page-wrapper'>
                        <div className='page-content'>

                            {this.renderPage()}

                        </div>
                    </div>

                    <Footer />

                </div>

            </React.Fragment>
        )
    }
}
