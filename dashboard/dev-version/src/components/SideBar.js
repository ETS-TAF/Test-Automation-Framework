import React, { Component } from 'react'
import logo from '../images/logo.png'

export default class SideBar extends Component {

    render() {
        return (
            <div className="sidebar-wrapper" data-simplebar="true">
                <div className="sidebar-header">
                    <div>
                        <img src={logo} className="logo-icon" alt="logo icon" />
                    </div>
                    <div>
                        <h4 className="logo-text">TAF</h4>
                    </div>
                    <div className="toggle-icon ms-auto"><i className='bx bx-arrow-back'></i>
                    </div>
                </div>
                <ul className="metismenu" id="menu">
                    <li>
                        <div id="link_dashboard">
                            <a href="#" onClick={() => { this.props.navigate(0) }} className="has-arrow">
                                <div className="parent-icon"><i className='bx bx-home-alt'></i>
                                </div>
                                <div className="menu-title">Dashboard</div>
                            </a>
                        </div>

                        <ul>
                            <div id="link_testcases">
                                <li>
                                    <a href="#" onClick={() => { this.props.navigate(1) }}><i className='bx bx-radio-circle'></i>Cas de test<sub id="sub">Format Cucumber</sub></a>
                                </li>
                            </div>
                        </ul>
                        <ul>
                            <div id="link_utilities">
                                <li>
                                    <a href="#" onClick={() => { this.props.navigate(2) }}><i className='bx bx-radio-circle'></i>Défauts</a>
                                </li>
                            </div>
                        </ul>

                        <ul>
                            <div id="link_projects">
                                <li>
                                    <a href="#" onClick={() => { this.props.navigate(3) }}><i className='bx bx-radio-circle'></i>Projets</a>
                                </li>
                            </div>
                        </ul>
                        <ul>
                            <div id="link_testresult">
                                <li>
                                    <a href="#" onClick={() => { this.props.navigate(4) }}><i className='bx bx-radio-circle'></i>Résultat des tests</a>
                                </li>
                            </div>
                        </ul>
                    </li>

                </ul>
            </div>
        )
    }
}
