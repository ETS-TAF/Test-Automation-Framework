import React from 'react'
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import ets from '../ets.png';

export default function Selection() {
    const navigate = useNavigate();
    const location = useLocation();
    let websiteURL = location.state.website ? location.state.website : 'Error404';
    const [website,] = React.useState(websiteURL);
    const [online, setOnline] = React.useState(false);
    const [menu, setMenu] = React.useState(false);
    const [showBrowser, setShowBrowser] = React.useState(true);
    const Select = () => {
        const config = {
            website: website,
            tests: [],
            hideBrowser: !showBrowser
        }
        if (online) config.tests.push('ONLINE');
        if (menu) config.tests.push('MENU');
        if (config.tests.length === 0) {
            alert(`Veuillez choisir au moins un test.`);
        }
        else {
            navigate('/waiting', { state: { config } });
        }
    };
    const Retour = () => {
        navigate('/');
    };
    return (
        <div type="H1">
            <h1 className="heading">
                <span className="light">TAF</span> <br />
                Testeur d'interface
            </h1>

            <div type="text">
                <h2 style={{ color: 'lightblue' }}>&#8669; <u> {website} </u> </h2>
                <h1> Configuration de votre test</h1>
                <div className="boxform">
                    <div className='checkbox' style={{ display: 'flex', justifyContent: 'normal' }}>
                        <input
                            type="checkbox"
                            value="online"
                            name="online"
                            checked={online}
                            onChange={event => setOnline(event.target.checked)}
                            style={{ marginRight: "2%", marginLeft: '30%', accentColor: "lightgreen" }}
                        />
                        <p htmlFor="En Ligne" className="strikethrough">Tester si le site est en ligne</p>
                    </div>
                    <div className='checkbox' style={{ display: 'flex', justifyContent: 'normal' }}>
                        <input
                            type="checkbox"
                            value="Menu"
                            name="Menu"
                            checked={menu}
                            onChange={event => setMenu(event.target.checked)}
                            style={{ marginRight: "2%", marginLeft: '30%', accentColor: "lightgreen" }}
                        />
                        <p htmlFor="Menu" className="strikethrough">Tester si le menu fonctionnent </p>
                    </div>
                    <div
                        style={{
                            background: 'white',
                            height: '3px',
                            width: '80%',
                            margin: 'auto',
                            marginTop: '3%',
                            marginBottom: '3%',
                        }}
                    />
                    
                    <div>

                        <input
                            type="checkbox"
                            value="showBrowser"
                            name="showBrowser"
                            checked={showBrowser}
                            onChange={event => setShowBrowser(event.target.checked)}
                            style={{ marginTop: '2.5%', marginBottom: '2.5%', accentColor: "lightsalmon" }}

                        />
                        {' '} &#8722; Afficher navigateur pendant le test
                    </div>
                </div>

                <button onClick={Select}>
                    Tester
                </button>
                <button onClick={Retour}>
                    Retour
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
