import {CreateOrUpdateBaseService} from '../../../shared/services/createOrUpdateBase.service';
import {services} from '../../../shared/constant/services';

interface ICreateOrUpdateLevelService {
    name: string;
    abbreviation?: string;
}

export class CreateOrUpdateLevelService extends CreateOrUpdateBaseService<ICreateOrUpdateLevelService> {
    url = `${services.academic}/academic-programs/levels`;
    isFormData = true;
}