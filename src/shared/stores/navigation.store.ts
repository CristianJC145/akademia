import {reactive, readonly} from 'vue';
import {ItemMenuType} from '../types/itemMenu.type';

const state: { items: ItemMenuType[] } = reactive({
    items: [],
});

const methods = {
    set(items: ItemMenuType[]) {
        console.log(items);
        state.items = items;
    },
};


export default {
    state: readonly(state),
    methods,
};