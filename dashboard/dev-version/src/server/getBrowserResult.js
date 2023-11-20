import axios from 'axios';
import { ServerConfig } from './serverConfig';

export async function getBrowserData() {
    // Déclaration des variables...
    var k = 0;
    var navigateur = ["Chrome", "Firefox", "Edge", "Safari", "Opera"];
    var count = [];
    var statut = [];
    var taille = 0;
    var field_name = [];
    var test = '';
    var env = [];
    for (var j = 0; j < navigateur.length; j++) {
        count[j] = 0;
    }
    try {
        // Requête Axios pour remplacer le premier appel AJAX
        const res = await axios.get(ServerConfig.serverUrl + 'executions');
        const data = res.data;
        // Logique de traitement des données...
        taille = data.length;
        field_name = Object.keys(data[1]);

        data.forEach((obj) => {
            for (const [key, value] of Object.entries(obj)) {
                if (key == 'Environnement') {
                    env[k] = `${value}`;
                    k++;
                }
            }
        });
        //console.log(env);
        for (var i = 0; i < taille; i++) {
            // statut[i]=JSON.stringify(data[i][field_name[1]]);
            for (j = 0; j < count.length; j++) {
                if (env[i] == navigateur[j]) {
                    count[j] = count[j] + 1;
                    // //console.log(statut[i].replace('"','').replace('"','')+' '+val[0]);
                }
            }
        }


        // Calculez les pourcentages et tout autre logique...

        return { taille: taille, count: count, navigateur: navigateur };

    } catch (error) {
        console.error("Erreur lors de la récupération des données browser :", error);
    }
}
