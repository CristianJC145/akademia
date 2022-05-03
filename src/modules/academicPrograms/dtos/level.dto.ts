import {DegreeDto} from './degree.dto';
import {TimestampDto} from '../../../shared/dto/timestamp.dto';

export interface LevelDto extends TimestampDto {
    id: number;
    institutionId: number;
    thumbnail?: any;
    name: string;
    abbreviation?: string;
    levelTypeId?: number;
    facultyId?: number;
    maxQuality?: number;
    approvedQuality?: number;
    minQualityForRetrieval?: number;
    retrievalQuality?: number;
    degrees: DegreeDto[];
}