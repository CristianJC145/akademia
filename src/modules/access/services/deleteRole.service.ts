import axios from '../../../shared/utils/axios';
import {services} from "../../../shared/constant/services";

export class DeleteRoleService {
    run(id: any): Promise<any>{
        return axios.get(`${services.users}/access/roles/${id}`).then((response) => {
            return response;
        });
    }
}