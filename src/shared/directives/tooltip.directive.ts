import * as bootstrap from 'bootstrap';

export const TooltipDirective = {
    mounted(el: any, binding: any) {
        let place = null;

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

        console.log(binding);

        bootstrap.Tooltip.getOrCreateInstance(el);
        /*var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });*/
    },
};