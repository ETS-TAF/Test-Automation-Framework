import React, { useState } from 'react'
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import ets from '../ets.png';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Input from '@mui/material/Input';
import { Button, Grid, Popover, Typography } from '@mui/material';

export default function Selection() {
    const navigate = useNavigate();
    const location = useLocation();
    let websiteURL = location.state.website ? location.state.website : 'Error404';
    const [showBrowser, setShowBrowser] = React.useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const anchorRef = React.useRef()
    const [anchorEl, setAnchorEl] = React.useState()
    React.useEffect(() => {
        setTimeout(() => setAnchorEl(anchorRef?.current), 1)
    }, [anchorEl])

    const Select = () => {
        const config = {
            "testCase": true,
            "tests": testCases,
            "hideBrowser": !showBrowser
        };
        if (config.tests.length === 0) {
            alert(`Veuillez ajouter au minimun une étape.`);
        }
        else {
            navigate('/waiting', { state: { config } });
        }
    };
    const Retour = () => {
        navigate('/');
    };

    const [testCases, setTestCases] = React.useState([]);
    const [currenttestCases, setCurrenttestCases] = React.useState(null);
    const handleCurrentTestCases = (valueKey, value) => {
        setCurrenttestCases({ ...currenttestCases, [valueKey]: value });
    };

    const handleAdd = () => {
        if (currenttestCases !== null) {
            setIsOpen(true);
        }
    }


    return (
        <div type="H1">
            <h1 className="heading">
                <span className="light">TAF</span> <br />
                Testeur d'interface
            </h1>

            <div type="text" ref={anchorRef}>
                <h1> Créer votre cas de test</h1>
                <div className="boxform">
                    <div className='checkbox' style={{ display: 'flex', justifyContent: 'normal' }}>

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={alltestCases}
                            value={null}
                            onChange={(e, val) => {
                                setCurrenttestCases(val);
                            }}
                            sx={{
                                width: '100%',
                                '& .MuiAutocomplete-inputRoot': {
                                    height: 50,
                                },
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                }
                            }}
                            renderInput={(params) =>
                                <TextField {...params} label="Étapes de test" margin="none" style={{ paddingRight: "10%" }} />}
                        />
                        <button style={{ marginTop: '1%' }} onClick={() => { handleAdd() }}>Ajouter</button>
                    </div>

                    <Popover
                        open={isOpen}
                        anchorEl={anchorEl}
                        onClose={() => setIsOpen(false)}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        sx={{
                            width: '80vh', height: '80ch',
                            backgroundColor: 'transparent',
                        }}
                    >
                        <div style={{
                            width: '80ch', height: '70ch', backgroundColor: '#536278',

                        }}>

                            <Typography sx={{ p: 2, fontSize: 25, fontWeight: '900', paddingTop: '10%' }}>{`Nouvelle étape: ${currenttestCases?.label}`}</Typography>
                            <Grid container spacing={2} style={{ marginTop: '5%', justifyContent: 'center', }}>
                                {currenttestCases?.locatorRequired ?
                                    <Grid item xs={8}>
                                        <Input type="text2" placeholder={'Référence'} style={{ width: '100%', marginBottom: '5%',marginLeft:'5%' }} value={currenttestCases.locator} onChange={(e) => handleCurrentTestCases('locator', e.target.value)} />
                                    </Grid>
                                    : <></>
                                }
                                {currenttestCases?.inputRequired ?
                                    <Grid item xs={8}>
                                        <Input type={currenttestCases.password === true ? "password" : "text2"} style={{ marginLeft: '5%', width: '100%', color: 'white' }} placeholder={'Valeur'} value={currenttestCases.input} onChange={(e) => handleCurrentTestCases('input', e.target.value)} />
                                    </Grid>
                                    : null
                                }
                            </Grid>
                            <Button variant="contained" style={{ marginTop: '10%', borderRadius: 20 }} onClick={() => {
                                setIsOpen(false);
                                setTestCases([...testCases, currenttestCases]);
                            }}>
                                Valider
                            </Button>
                        </div>
                    </Popover>


                    <div
                        style={{
                            background: 'white',
                            height: '3px',
                            width: '80%',
                            margin: 'auto',
                            marginTop: '5%',
                            marginBottom: '5%',
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3> Étapes de test: {testCases.length} </h3>
                    </div>
                    <div className='checkbox' style={{ display: 'flex', justifyContent: 'normal', flexDirection: 'column' }}>
                        {testCases.map((item, index) => (
                            <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '5%', }}>
                                &nbsp; &#8594; &nbsp;<label htmlFor={testCases[index].value} style={{ marginRight: "3%" }}>{testCases[index].label}</label>
                                {item.locatorRequired ?
                                    <Input type="text2" placeholder={'Référence'} style={{ marginRight: "2%", width: '30%' }} value={testCases[index].locator} />
                                    : null
                                }
                                {item.inputRequired ?
                                    <Input type={item.password === true ? "password" : "text2"} style={{ marginRight: "2%", width: '40%', color: 'white' }} placeholder={'Valeur'} value={testCases[index].input} />
                                    : null
                                }
                            </div>
                        ))}
                    </div>
                    <div
                        style={{
                            background: 'white',
                            height: '3px',
                            width: '80%',
                            margin: 'auto',
                            marginTop: '5%',
                            marginBottom: '5%',
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
        </div >

    )
}


const alltestCases = [
    { label: 'Ouvrir Navigateur (Obligatoire)', value: 'OpenNavigator', inputRequired: true, input: '' },
    { label: 'Ecrire du text', value: 'EnterInput', inputRequired: true, input: '', locatorRequired: true, locator: '' },
    { label: 'Ecrire un mot de passe', value: 'EnterInput', inputRequired: true, input: '', locatorRequired: true, locator: '', password: true },
    { label: 'Cliquer sur un element', value: 'ClickElement', locatorRequired: true, locator: '' },
    { label: 'Attendre quelques secondes', value: 'Wait', inputRequired: true, input: '15' },
    { label: "Vérifier la présence d'un élement", value: 'CheckElement', locatorRequired: true, locator: '' },
    { label: 'Vérifier la page courrante', value: 'CheckPage', inputRequired: true, input: '' },
    { label: 'Fermer Navigateur (Recommendé)', value: 'CloseNavigator' },
];

