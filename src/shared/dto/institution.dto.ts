import {TimestampDto} from './timestamp.dto';

export interface InstitutionDto extends TimestampDto {
    id: number;
    identification: string;
    name: string;
    active: number;
}