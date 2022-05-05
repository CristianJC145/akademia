import {CreateOrUpdateBaseService} from '../../../shared/services/createOrUpdateBase.service';
import {services} from '../../../shared/constant/services';

interface ICreateOrUpdateAreaService {
    name: string;
    abbreviation?: string;
}

export class CreateOrUpdateAreaService extends CreateOrUpdateBaseService<ICreateOrUpdateAreaService> {
    url = `${services.academic}/academic-programs/areas`;
    isFormData = true;
}