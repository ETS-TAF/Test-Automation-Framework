import React from 'react'
import './index.css';
import { Link, useNavigate } from "react-router-dom";
import ets from '../ets.png';

export default function Home() {
    const [website, setWebsite] = React.useState('');
    const navigate = useNavigate();

    const test = () => {
        if (website === '') {
            alert(`Aucun lien de site web n'a été entré.`);
        }
        else {
            if (website.indexOf('https://') === -1) {
                alert(`Veuilez ajouter http:// ou https:// au début de votre lien.`);
            }
            else {
                navigate('/selection', { state: { website } });

            }
        }
    };
    return (

        <div type="H1">
            <h1 className="heading">
                <span className="light">TAF </span> <br />
                Testeur d'interface
            </h1>
            <div type="text" className="box">
                <div type="text1">
                    <h1>Veuillez saisir l'URL du site à tester: </h1>
                </div>
                <div>
                    <form className="box">
                        <input className='input' type="text" placeholder="URL du site" value={website} onChange={event => setWebsite(event.target.value)} />
                    </form>
                    <button onClick={test}> Tester </button>
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
                    <Link to="/test-case" state={{ from: "occupation" }} style={{ color: 'white' }}>
                        <h2 style={{ color: 'white' }}> • Cas de test spécifique </h2>
                    </Link>
                </div>
            </div>
            <div style={{ marginTop: "5%", marginBottom: '5%' }}>
                <img src={ets} alt="ETS" style={{ width: '25%', height: '25%' }} />
                <h3> <u> Projet MGL805  </u> </h3>
                <h4> Equipe 4 </h4>
            </div>
        </div>

    )
}
