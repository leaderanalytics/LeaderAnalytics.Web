import { Site } from './site.js';


(async function ($) {
    "use strict";

    window.site = new Site();
    await window.site.Init();
    
    
})(jQuery);