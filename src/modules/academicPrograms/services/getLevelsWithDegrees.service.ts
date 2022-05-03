import axios from '../../../shared/utils/axios';
import {services} from '../../../shared/constant/services';
import {LevelDto} from '../dtos/level.dto';

export class GetLevelsWithDegreesService {
    run() {
        return axios.get<LevelDto[]>(`${services.academic}/academic-programs/levels-with-degrees`).then((response) => response.data);
    }
}