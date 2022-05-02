import axios from '../../../shared/utils/axios';
import {SubjectDto} from '../dtos/subject.dto';
import {LevelDegreeDto} from "../dtos/levelDegree.dto";
import {services} from "../../../shared/constant/services";

interface IGetAllowContentsCasuridService {
    levelsDegrees: LevelDegreeDto[];
    subjects: SubjectDto[];
}

export class GetAllowContentsCasuridService {
    run() {
        return axios.get<IGetAllowContentsCasuridService>(`${services.lti}/integrations/lti/allow-contents-casurid`).then((response) => {
            return response.data;
        });
    }
}