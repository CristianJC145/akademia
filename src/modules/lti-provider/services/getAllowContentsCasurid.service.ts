import axios from '../../../shared/utils/axios';
//import {services} from '../../../shared/constant/services';
import {SubjectDto} from '../dtos/subject.dto';
import {LevelDegreeDto} from "../dtos/levelDegree.dto";

interface IGetAllowContentsCasuridService {
    levelsDegrees: LevelDegreeDto[];
    subjects: SubjectDto[];
}

export class GetAllowContentsCasuridService {
    run() {
        return axios.get<IGetAllowContentsCasuridService>(`http://localhost:3000/integrations/lti/allow-contents-casurid`).then((response) => {
            return response.data;
        });
    }
}