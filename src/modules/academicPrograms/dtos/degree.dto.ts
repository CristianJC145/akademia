import {TimestampDto} from '../../../shared/dto/timestamp.dto';

export interface DegreeDto extends TimestampDto {
    id: number;
    institutionId: number;
    thumbnail?: any;
    levelId: number;
    name: string;
    abbreviation?: any;
}