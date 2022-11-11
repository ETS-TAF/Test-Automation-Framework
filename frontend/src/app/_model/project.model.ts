import { User } from './user.model';
export class Project {
    id?: string;
    name?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    owner?: User;
    constructor() {
    }
}