import axios from 'axios';
import { ServerConfig } from './serverConfig';

export async function getTestResult() {

    var k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x0 = 0, x1 = 0, x2 = 0, x3 = 0;
    var id = [];
    var statut = [];
    var type = [];
    var description = [];
    var priorite = [];
    var version_correction = [];
    var progression = [];
    var totaux_exec_test = [];
    var taux_succes = [];
    var exigence_id = [];
    var etiquettes = [];
    var taille = 0;
    var field_name = [];
    var testtype = [];
    var count = [];
    var percentagetestcategory = [];
    var val = ['PASSED', 'UNCOVERED', 'FAILED', 'NOTRUN'];


    // Utilisez une approche moderne avec async/await et try/catch pour la gestion des erreurs
    try {
        // Requête pour 'testcategory'
        const testCategoryResponse = await axios.get(ServerConfig.serverUrl + 'testcategory');
        const testCategoryData = testCategoryResponse.data;
        // Traitez ici 'testCategoryData' comme nécessaire...
        testCategoryData.forEach((obj) => {
            for (const [key, value] of Object.entries(obj)) {
                if (key == 'testtype') {

                    testtype[l] = `${value}`;
                    l++;
                }

            }

        });

        for (var j = 0; j < val.length; j++) {
            count[j] = 0;
        }

        // Requête pour 'tests'
        const testsResponse = await axios.get(ServerConfig.serverUrl + 'tests/');
        const testsData = testsResponse.data;
        // Traitez ici 'testsData' comme nécessaire...

        // Faites ici les calculs nécessaires et organisez vos données...
        taille = testsData.length;
        field_name = Object.keys(testsData[1]);

        for (var i = 0; i < taille; i++) {
            statut[i] = JSON.stringify(testsData[i][field_name[1]]);
            for (j = 0; j < count.length; j++) {
                if (statut[i].replace('"', '').replace('"', '') == val[j]) {
                    count[j] = count[j] + 1;
                }
            }
        }

        testsData.forEach((obj) => {
            for (const [key, value] of Object.entries(obj)) {
                if (key == 'id') {

                    id[k] = `${value}`;
                    k++;
                }
                if (key == 'Status') {

                    statut[m] = `${value}`;
                    m++;
                }

                if (key == 'Type') {

                    type[n] = `${value}`;
                    n++;
                }

                if (key == 'Description') {

                    description[o] = `${value}`;
                    o++;
                }

                if (key == 'Priorite') {

                    priorite[p] = `${value}`;
                    p++;
                }
                if (key == 'Version_correction') {

                    version_correction[q] = `${value}`;
                    q++;
                }
                if (key == 'Progression') {

                    progression[r] = `${value}`;
                    r++;
                }
                if (key == 'Totaux_exec_test') {

                    totaux_exec_test[s] = `${value}`;
                    s++;
                }
                if (key == 'Taux_succes') {

                    taux_succes[u] = `${value}`;
                    u++;
                }
                if (key == 'exigence_id') {

                    exigence_id[v] = `${value}`;
                    v++;
                }
                if (key == 'Etiquettes') {

                    etiquettes[w] = `${value}`;
                    w++;
                }
                if (key == 'testtype') {
                    if (`${value}` == 'Test GUI')
                        x0++;
                    else {
                        if (`${value}` == 'Test API')
                            x1++;
                        else {
                            if (`${value}` == 'Test Performances')
                                x2++;
                            else {
                                if (`${value}` == 'Smoke test')
                                    x3++;
                            }
                        }
                    }
                }

            }

        });

        // Supposons que vous avez organisé vos données dans un objet nommé 'resultData'
        percentagetestcategory[0] = Math.round((x0 / taille) * 100);
        percentagetestcategory[1] = Math.round((x1 / taille) * 100);
        percentagetestcategory[2] = Math.round((x2 / taille) * 100);
        percentagetestcategory[3] = Math.round((x3 / taille) * 100);

        return { percentagetestcategory: percentagetestcategory, field_name: field_name, testtype: testtype, count: count, id: id, statut: statut, type: type, description: description, priorite: priorite, version_correction: version_correction, progression: progression, totaux_exec_test: totaux_exec_test, taux_succes: taux_succes, exigence_id: exigence_id, etiquettes: etiquettes };
    } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de la récupération des données : ", error);
        throw error; // Renvoyer l'erreur pour une gestion supplémentaire si nécessaire
    }
}




