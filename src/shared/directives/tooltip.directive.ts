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
        el.setAttribute('data-bs-trigger', 'hover');
        el.setAttribute('title', binding.value);

        if (place) {
            el.setAttribute('data-bs-placement', place);
        }


        const tooltip = bootstrap.Tooltip.getOrCreateInstance(el);

        el.addEventListener('click', function () {
            tooltip.hide();
        });
    },
};