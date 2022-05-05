import { TimestampDto } from "../../../shared/dto/timestamp.dto";
import { SubjectDto } from "../dtos/subject.dto";

export interface AreaDto extends TimestampDto {
    id: number;
    institutionId: number;
    thumbnail?: any;
    name: string;
    abbreviation: string;
    createdAt: string;
    updatedAt: string;
    subjects: SubjectDto[];
}