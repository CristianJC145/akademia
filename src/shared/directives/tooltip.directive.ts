import * as bootstrap from 'bootstrap';

export const TooltipDirective = {
    mounted(el: any, binding: any) {
        let place = 'bottom';

        if (binding.modifiers.right) {
            place = 'right';
        }

        if (binding.modifiers.left) {
            place = 'left';
        }

        if (binding.modifiers.top) {
            place = 'left';
        }

        if (binding.modifiers.bottom) {
            place = 'bottom';
        }

        el.setAttribute('data-bs-toggle', 'tooltip');
        el.setAttribute('title', binding.value);

        if (place) {
            el.setAttribute('data-bs-placement', place);
        }

        bootstrap.Tooltip.getOrCreateInstance(el);
    },
};