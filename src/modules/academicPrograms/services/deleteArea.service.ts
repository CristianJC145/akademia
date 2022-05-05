import axios from '../../../shared/utils/axios';
import {services} from '../../../shared/constant/services';

export class DeleteAreaService {
    async run(areaId: number){
        console.log(areaId)
        await axios.delete(`${services.academic}/academic-programs/areas/${areaId}`);
    }
}
