import axios from 'axios';
import { ServerConfig } from './serverConfig';

export async function getProjectResult() {
    // Déclaration des variables...
    var m = 0;
    var k = 0;
    var l = 0;
    var environnement = [];
    var count = [];
    var statut = ["Executing", "Failed", "Pending"];
    var taille = 0;
    var field_name = [];
    var pourcentage = [];
    var test = '';
    var env = [];

    try {
        // Requête Axios pour remplacer le premier appel AJAX
        const res1 = await axios.get(ServerConfig.serverUrl + 'env_exec');
        const data1 = res1.data;
        // Logique de traitement des données...
        data1.forEach((obj) => {
            for (const [key, value] of Object.entries(obj)) {
                if (key == 'environment') {

                    environnement[l] = `${value}`;
                    l++;
                }

            }

        });
        for (var j = 0; j < environnement.length; j++) {
            count[j] = 0;
        }
        // Requête Axios pour remplacer le deuxième appel AJAX
        const res2 = await axios.get('http://localhost:3001/projects');
        const data2 = res2.data;
        // Logique de traitement des données...
        taille = data2.length;
        field_name = Object.keys(data2[1]);

        data2.forEach((obj) => {
            for (const [key, value] of Object.entries(obj)) {
                if (key == 'environment') {

                    env[k] = `${value}`;
                    k++;
                }
                if (key == 'status') {

                    if (`${value}` == 'Executing')
                        m++;
                }
            }

        });
        pourcentage[0] = Math.round((m / taille) * 100);
        for (var i = 0; i < taille; i++) {
            for (j = 0; j < count.length; j++) {
                if (env[i].search(environnement[j]) >= 0) {
                    count[j] = count[j] + 1;
                }

            }
        }
        // Calculez les pourcentages et tout autre logique...

        return { taille: taille, count: count, environnement: environnement, pourcentage: pourcentage };

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}
