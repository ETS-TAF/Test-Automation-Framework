import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { sendTestRequest } from '../Testing';
import './index.css';
import ets from '../ets.png';

export default function Waiting() {
    const location = useLocation();
    const navigate = useNavigate();
    let website = location.state.config.website ? location.state.config.website : 'Error404';
    const config = location.state.config;
    if (config?.testCase === true) {
        website = config.tests[0].input ? config.tests[0].input : 'Error404';
    }
    const Annuler = () => {
        navigate('/selection', { state: { website } });
    };

    useEffect(() => {
        const test = async () => {
            const response = await sendTestRequest(config)
                .catch(err => {
                    alert('Erreur lors de l\'envoi de la requête');
                })
                .then(data => {
                    console.log(data);
                    navigate('/results', { state: { data, website } });
                });
            if (response) {
                navigate('/results', { state: { response } });
            }
        };
        test();
    }, [navigate, config, website]);


    return (
        <div type="H1">
            <h1 className="heading">
                <span className="light">TAF</span> <br />
                Testeur d'interface
            </h1>

            <div type="text">
                <h2 style={{ color: 'lightblue' }}>&#8669; <u> {website} </u> </h2>
                <h2>Nos algorithmes testent votre site </h2>
                <h3>Les résultats s'afficherons sous peu </h3>

                <div className="rect">
                    <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="54px"
                        height="60px"
                        viewBox="0 0 24 30"
                    >
                        <rect x="0" y="0" width="3" height="10" fill="#ffff">
                            <animateTransform
                                attributeType="xml"
                                attributeName="transform"
                                type="translate"
                                values="0 0; 0 20; 0 0"
                                begin="0"
                                dur="0.6s"
                                repeatCount="indefinite"
                            />
                        </rect>
                        <rect x="10" y="0" width="3" height="10" fill="#ffff">
                            <animateTransform
                                attributeType="xml"
                                attributeName="transform"
                                type="translate"
                                values="0 0; 0 20; 0 0"
                                begin="0.2s"
                                dur="0.6s"
                                repeatCount="indefinite"
                            />
                        </rect>
                        <rect x="20" y="0" width="3" height="10" fill="#ffff">
                            <animateTransform
                                attributeType="xml"
                                attributeName="transform"
                                type="translate"
                                values="0 0; 0 20; 0 0"
                                begin="0.4s"
                                dur="0.6s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </svg>
                </div>


                <button onClick={Annuler}>
                    Annuler
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
