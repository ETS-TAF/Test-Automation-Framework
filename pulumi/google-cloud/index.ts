import './apis';
import { database, dbInstance, dbUser } from './database';
import { deployWikiJS } from './wikijs';


const wiki = deployWikiJS(dbInstance, database, dbUser);

export default {
    wiki
}