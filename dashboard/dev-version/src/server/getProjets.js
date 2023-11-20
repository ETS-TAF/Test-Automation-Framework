import axios from 'axios';
import { ServerConfig } from './serverConfig';

export async function getProjects() {

    try {


        // Requête Axios pour remplacer le deuxième appel AJAX
        const res = await axios.get(ServerConfig.serverUrl + 'projects');
        const data = res.data;


        return (data)
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}
