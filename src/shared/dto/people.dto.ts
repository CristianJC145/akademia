import {TimestampDto} from './timestamp.dto';
import {UserDto} from './user.dto';
import {MunicipalityDto} from './municipality.dto';

export interface PeopleDto extends TimestampDto {
    id: number;
    institutionId: number;
    userId: number;
    identification: string;
    identificationTypeId: number;
    names: string;
    lastnames: string;
    mobile: string;
    email: string;
    homeMunicipalityId: number;
    homeMunicipality: MunicipalityDto;
    direction: string;
    birthDate: string;
    birthMunicipalityId: number;
    birthMunicipality: MunicipalityDto;
    genderId: number;
    workPhone: string;
    homePhone: string;
    nationality: string;
    religion: string;
    primaryLanguage: string;
    user?: UserDto;
}