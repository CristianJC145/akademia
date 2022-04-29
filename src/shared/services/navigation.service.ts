import navigationStore from '../stores/navigation.store';
import {ItemMenuType} from '../types/itemMenu.type';

export class NavigationServices {
    set(items: ItemMenuType[]) {
        navigationStore.methods.set(items);
    }
}