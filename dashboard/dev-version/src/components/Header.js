import React, { Component } from 'react'
import userIcon from '../images/user.png'

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="topbar d-flex align-items-center">
                    <nav className="navbar navbar-expand gap-3">
                        <div className="mobile-toggle-menu"><i className='bx bx-menu'></i>
                        </div>


                        <div className="user-box dropdown px-3">
                            <button className="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret">
                                <img src={userIcon} className="user-img" alt="user avatar" />
                                <div className="user-info">
                                    <div id="currentuser">
                                        <p className="user-name mb-0"> Utilisateur connnecté: <b>{JSON.parse(localStorage.getItem('user')).username}</b></p>
                                        <a href='../' onClick={() => {
                                            localStorage.removeItem('user')
                                        }}>Déconnexion</a>
                                    </div>

                                </div>
                            </button>

                        </div>
                    </nav>
                </div>
            </header>
        )
    }
}
