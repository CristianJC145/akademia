import axios from '../../../shared/utils/axios';
import {services} from '../../../shared/constant/services';
import { AreaDto } from '../dtos/subject.dto';


export class GetAreasWithSubjectsService {
    run() {
        return axios.get<AreaDto>(`${services.academic}/academic-programs/areas-subjects`).then((response) => response.data);
    }
}