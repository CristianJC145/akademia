import {TimestampDto} from './timestamp.dto';

export interface ProfileDto extends TimestampDto {
    id: number;
    moduleId?: number;
    code: string;
    image?: any;
    name: string;
    description: string;
}