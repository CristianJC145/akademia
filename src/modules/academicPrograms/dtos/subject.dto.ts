import { TimestampDto } from "../../../shared/dto/timestamp.dto";

export interface SubjectDto extends TimestampDto {
    id: number;
    institutionId: number;
    thumbnail?: any;
    areaId: number;
    name: string;
    lmsTemplateCode?: any;
    abbreviation?: any;
}