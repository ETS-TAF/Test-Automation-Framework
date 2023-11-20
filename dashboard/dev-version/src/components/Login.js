import React, { Component } from 'react'
import logo from '../images/logo.png'
import { getUsers } from '../server/getUsers';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';

export default class login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            users: null
        };

    }

    async componentDidMount() {
        const UsersResult = await getUsers();
        this.setState({
            users: UsersResult,
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = () => {
        const users = this.state.users;
        let logged = false
        let useracc;
        console.log(users)

        if (this.state.email != "" && this.state.email != " " && this.state.password != "" && this.state.password != " ") {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (this.state.email == user.email && this.state.password == user.password) {
                    logged = true
                    useracc = user
                }
            }
        } else {
            alert('Check Information')
        }

        if (logged) {
            localStorage.setItem('user', JSON.stringify(useracc));
            window.location.reload()
        } else {
            alert("Error")
        }
        // Logique de soumission du formulaire
    };

    render() {
        if (localStorage.getItem("user")) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div className="wrapper">
                <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                            <div className="col mx-auto">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <div className="p-4">
                                            <div className="mb-3 text-center">
                                                <img src={logo} width="120" alt="" />
                                            </div>
                                            <div className="text-center mb-4">
                                                <h6 className="">Test Automation Framework</h6>
                                                <p className="mb-0">Connexion utilisateur</p>
                                            </div>
                                            <div className="form-body">
                                                <form className="row g-3">
                                                    <div className="col-12">
                                                        <label className="form-label">Email</label>
                                                        <input
                                                            className="form-control" id="inputEmailAddress"
                                                            type="email"
                                                            name="email"
                                                            value={this.state.email}
                                                            onChange={this.handleInputChange}
                                                            placeholder="Entrez votre adresse email" />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">Mot de passe</label>
                                                        <div className="input-group" id="show_hide_password">
                                                            <input type="password"
                                                                className="form-control border-end-0"
                                                                id="inputChoosePassword"
                                                                name="password"
                                                                value={this.state.password}
                                                                onChange={this.handleInputChange}
                                                                placeholder="Entrez votre mot de passe" />

                                                            <a
                                                                href="#" className="input-group-text bg-transparent"><i
                                                                    className='bx bx-hide'></i></a>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 text-end"> <a href="#" style={{ color: "#1c86c7" }}>Mot de
                                                        passe oublié ?</a>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="d-grid">
                                                            <button type="button" onClick={() => {
                                                                this.handleSubmit()
                                                            }} className="btn btn-primary" id="connexion"
                                                                style={{ backgroundColor: "#1c86c7" }}>Se connecter</button>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="text-center ">
                                                            <p className="mb-0">Vous n'avez pas encore de compte? <a href="#"
                                                                style={{ color: "#1c86c7" }}>Cliquer ici</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
