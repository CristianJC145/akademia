import {TimestampDto} from './timestamp.dto';

export interface ItemDto extends TimestampDto {
    id: number;
    itemParentId?: number;
    moduleId: number;
    code?: any;
    name: string;
    route?: any;
    icon?: any;
    cssClass?: any;
    showMenu: number;
    permissions: any[][];
    children: ItemDto[];
}