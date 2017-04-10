"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular2_tinymce_component_1 = require("./angular2-tinymce.component");
var forms_1 = require("@angular/forms");
var angular2_tinymce_default_1 = require("./angular2-tinymce.default");
var TinymceModule = TinymceModule_1 = (function () {
    function TinymceModule() {
    }
    TinymceModule.withConfig = function (userConfig) {
        if (userConfig === void 0) { userConfig = {}; }
        return {
            ngModule: TinymceModule_1,
            providers: [
                { provide: 'TINYMCE_CONFIG', useValue: userConfig }
            ]
        };
    };
    return TinymceModule;
}());
TinymceModule = TinymceModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule
        ],
        declarations: [
            angular2_tinymce_component_1.TinymceComponent
        ],
        exports: [
            angular2_tinymce_component_1.TinymceComponent
        ],
        providers: [
            { provide: 'TINYMCE_CONFIG', useClass: angular2_tinymce_default_1.TinymceDefaultOptions }
        ]
    })
], TinymceModule);
exports.TinymceModule = TinymceModule;
var TinymceModule_1;
//# sourceMappingURL=angular2-tinymce.module.js.map