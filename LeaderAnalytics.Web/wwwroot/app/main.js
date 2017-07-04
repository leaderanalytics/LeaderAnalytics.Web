"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js"); // must be FIRST
require("reflect-metadata"); // must be SECOND
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app.module");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map