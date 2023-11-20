import axios from 'axios';
import { ServerConfig } from './serverConfig';


export async function getUsers() {

    try {
        // Requête Axios pour remplacer le premier appel AJAX
        const res = await axios.get(ServerConfig.serverUrl + "users");
        const data = res.data;

        return data
    } catch (error) {
        console.error("Erreur lors de la récupération des données user :", error);
    }
}
