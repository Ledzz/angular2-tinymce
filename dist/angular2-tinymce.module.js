var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { TinymceComponent } from './angular2-tinymce.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TinymceDefaultOptions } from './angular2-tinymce.default';
import tinymce from 'tinymce/tinymce.js';
var TinymceModule = TinymceModule_1 = (function () {
    function TinymceModule() {
    }
    TinymceModule.withConfig = function (userConfig) {
        if (userConfig === void 0) { userConfig = {}; }
        return {
            ngModule: TinymceModule_1,
            providers: [
                { provide: 'tinymce-config', useValue: userConfig }
            ]
        };
    };
    return TinymceModule;
}());
TinymceModule = TinymceModule_1 = __decorate([
    NgModule({
        declarations: [
            TinymceComponent
        ],
        imports: [
            FormsModule,
            ReactiveFormsModule
        ],
        exports: [
            TinymceComponent
        ],
        providers: [
            { provide: 'tinymce-config', useClass: TinymceDefaultOptions }
        ]
    })
], TinymceModule);
export { TinymceModule };
export { tinymce };
var TinymceModule_1;
//# sourceMappingURL=angular2-tinymce.module.js.map