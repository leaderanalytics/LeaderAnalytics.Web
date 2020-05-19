import { Site } from './site.js';
import { Dialogs } from './dialogs.js';

(async function ($) {
    "use strict";
    window.site = new Site();   // instance
    window.Dialogs = Dialogs;   // static
    await window.site.Init();

    // Allow modal opened last to appear on top of any previous ones

    $(document).on('show.bs.modal', '.modal', function () {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function () {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });
})(jQuery);