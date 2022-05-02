import {services} from '../../../shared/constant/services';
import {CreateOrUpdateBaseService} from '../../../shared/services/createOrUpdateBase.service';

export interface ICreateOrUpdateContentService {
    levelId: number | null;
    degreeId: number | null;
    subjectId: number | null;
    title: string | null;
    description: string | null;
    index: string | null;
    contentTypeId: number | null;
    urlLocation: string | null;
    duration: number | null;
}

export class CreateOrUpdateContentService extends CreateOrUpdateBaseService<ICreateOrUpdateContentService> {
    url = `${services.casurid}/catalogue/admin/contents`;
}