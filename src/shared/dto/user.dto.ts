import {TimestampDto} from './timestamp.dto';
import {PeopleDto} from './people.dto';

export interface UserDto extends TimestampDto {
    id: number;
    userToken: string;
    avatar: string;
    languageKey: string;
    timeZone: string;
    createdAt: string;
    updatedAt: string;
    people: PeopleDto;
}