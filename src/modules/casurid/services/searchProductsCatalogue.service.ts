import axios from '../../../shared/utils/axios';
import {services} from '../../../shared/constant/services';
import {ParamsPaginationDto} from '../../../shared/dto/paramsPagination.dto';
import {TimestampDto} from '../../../shared/dto/timestamp.dto';
import {ResponsePaginationDto} from '../../../shared/dto/responsePagination.dto';

interface IParams extends ParamsPaginationDto {
    levelsIds: number[];
    degreesIds: number[];
    areasIds: number[];
    subjectsIds: number[];
}

interface IData extends TimestampDto{
    id: number;
    institutionId: number;
    thumbnail?: string;
    title: string;
    levelId: number;
    degreeId: number;
    subjectId: number;
    description?: string;
    index?: string;
    productTypeId: number;
    defaultUnitValue: number;
    validityPeriod: number;
    DegreeName: string;
    subjectName: string;
}

export class SearchProductsCatalogueService {
    async run(params: IParams) {
        return axios.get<ResponsePaginationDto<IData>>(`${services.casurid}/catalogue/products`, {
            params,
        }).then((response) => response.data);
    }
}