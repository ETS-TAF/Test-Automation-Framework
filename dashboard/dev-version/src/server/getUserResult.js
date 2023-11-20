import axios from 'axios';
import { ServerConfig } from './serverConfig';

export async function getUserResult() {
    // Déclaration des variables...
    var k = 0, m = 0, n = 0, o = 0, p = 0;
    var user_info = ["username", "password", "fullname", "email", "group_id"];
    var username = [];
    var password = [];
    var fullname = [];
    var email = [];
    var group_id = [];
    var taille = 0;
    var field_name = [];

    try {
        // Requête Axios pour remplacer le premier appel AJAX
        const res = await axios.get(ServerConfig.serverUrl + 'users');
        const data = res.data;
        // Logique de traitement des données...
        taille = data.length;
        field_name = Object.keys(data[1]);

        data.forEach((obj) => {
            for (const [key, value] of Object.entries(obj)) {
                if (key == 'username') {

                    username[k] = `${value}`;
                    k++;
                }
                if (key == 'password') {

                    password[m] = `${value}`;
                    m++;
                }

                if (key == 'fullname') {

                    fullname[n] = `${value}`;
                    n++;
                }

                if (key == 'email') {

                    email[o] = `${value}`;
                    o++;
                }

                if (key == 'group_id') {

                    group_id[p] = `${value}`;
                    p++;
                }

            }

        });


        // Calculez les pourcentages et tout autre logique...

        return { username: username, password: password, fullname: fullname, email: email, group_id: group_id };

    } catch (error) {
        console.error("Erreur lors de la récupération des données user :", error);
    }
}
