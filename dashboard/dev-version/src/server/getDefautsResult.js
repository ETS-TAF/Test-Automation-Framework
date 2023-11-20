import axios from 'axios';
import { ServerConfig } from './serverConfig';

export async function getDefautsResult() {
    // Déclaration des variables...
    var m = 0;
    var n = 0;
    var o = 0;
    var l = 0;
    var id = [];
    var description = [];
    var execution_id = [];
    var category = [];
    var field_name = [];

    try {
        // Requête Axios pour remplacer le premier appel AJAX
        const res = await axios.get(ServerConfig.serverUrl + 'defauts');
        const data = res.data;
        // Logique de traitement des données...
        /*  field_name = Object.keys(data[1]);
         data.forEach((obj) => {
             for (const [key, value] of Object.entries(obj)) {
                 if (key == 'id') {
 
                     id[l] = `${value}`;
                     l++;
                 }
                 if (key == 'Description') {
 
                     description[m] = `${value}`;
                     m++;
                 }
                 if (key == 'execution_id') {
 
                     execution_id[n] = `${value}`;
                     n++;
                 }
                 if (key == 'category') {
 
                     category[o] = `${value}`;
                     o++;
                 }
 
             }
 
         });
 
 
 
         return { field_name: field_name, id: id, description: description, execution_id: execution_id, category: category };
  */
        return data
    } catch (error) {
        console.error("Erreur lors de la récupération des données user :", error);
    }
}
