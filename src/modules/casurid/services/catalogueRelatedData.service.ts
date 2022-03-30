import axios from '../../../shared/utils/axios';
import {services} from '../../../shared/constant/services';
import {LevelDto} from '../dtos/level.dto';
import {AreaDto} from '../dtos/area.dto';

interface ICatalogueRelatedDataService {
    levels: LevelDto[],
    areas: AreaDto[],
}

export class CatalogueRelatedDataService {
    async run() {
        return axios.get<ICatalogueRelatedDataService>(`${services.casurid}/catalogue/related-data-catalogue`).then((response) => response.data);
    }
}