import {CreateOrUpdateBaseService} from '../../../shared/services/createOrUpdateBase.service';
import {services} from '../../../shared/constant/services';

interface ICreateOrUpdateSubjectService {
    name: string;
    abbreviation?: string;
    areaId: number;
}

export class CreateOrUpdateSubjectService extends CreateOrUpdateBaseService<ICreateOrUpdateSubjectService> {
    url = `${services.academic}/academic-programs/subjects`;
    isFormData = true;
}