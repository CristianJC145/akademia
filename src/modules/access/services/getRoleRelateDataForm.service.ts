import axios from '../../../shared/utils/axios';
import {services} from "../../../shared/constant/services";
import {ProfileDto} from "../../../shared/dto/profile.dto";

interface RoleRelatedDataForm {
    profiles: ProfileDto[];
}

export class GetRoleRelatedDataFormService {
    async run(){
        return axios.get<RoleRelatedDataForm[]>(`${services.users}/access/roles-related-data-form`).then((response) => {
            return response;
        });
    }
}