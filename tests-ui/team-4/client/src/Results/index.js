import React from 'react'
import './index.css';
import { useLocation, useNavigate } from "react-router-dom";
import ets from '../ets.png';
import failed from '../assets/icon_failed.png';
import succeed from '../assets/icon_succeed.png';


export default function Result() {
    const navigate = useNavigate();
    const location = useLocation();

    const website = location.state.website;
    const donnees = location.state.data;
    const goHome = () => {
        navigate('/');
    };
    return (

        <div type="H1">
            <h1 className="heading">
                <span className="light">TAF </span> <br />
                Testeur d'interface
            </h1>
            <div type="text" className="box">
                <h2 style={{ color: 'lightblue' }}>&#8669; <u> {website} </u> </h2>
                <div type="text1">
                    <h2>Voici les résultats de votre test </h2>
                    {
                        Object.keys(donnees).map((key, index) => {
                            return (
                                <div key={index}>
                                    <div style={{ display: "flex", marginLeft: '4%' }} >
                                        <h3>&#8226; {donnees[key].name}: &nbsp;</h3>
                                        <div>{donnees[key].passed ?
                                            <img src={succeed} alt="succeed" style={{ width: '17%', height: '100%', objectFit: "contain", float: 'left' }} />
                                            :
                                            <img src={failed} alt="succeed" style={{ width: '17%', height: '100%', objectFit: "contain", float: 'left' }} />
                                        }
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        {!donnees[key].passed ?
                                            <li style={{ marginLeft: '8%', marginTop: '-1.5%' }}>{donnees[key].reason}</li>
                                            : <></>}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={goHome}>
                    Faire un autre test
                </button>
            </div>
            <div style={{ marginTop: "5%", marginBottom: '5%' }}>
                <img src={ets} alt="ETS" style={{ width: '25%', height: '25%' }} />
                <h3> <u> Projet MGL805  </u> </h3>
                <h4> Equipe 4 </h4>
            </div>
        </div>

    )
}
