var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, forwardRef, NgZone, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TinymceDefaultOptions } from './angular2-tinymce.default';
import tinymce from 'tinymce/tinymce.js';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/link/plugin.js';
import 'tinymce/plugins/paste/plugin.js';
import 'tinymce/plugins/table/plugin.js';
import 'tinymce/plugins/advlist/plugin.js';
import 'tinymce/plugins/autoresize/plugin.js';
import 'tinymce/plugins/lists/plugin.js';
import 'tinymce/plugins/code/plugin.js';
var noop = function () {
};
var TinymceComponent = TinymceComponent_1 = (function () {
    function TinymceComponent(zone, config) {
        var _this = this;
        this.zone = zone;
        this.config = config;
        this.elementId = 'tiny-' + Math.random().toString(36).substring(2);
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.options = Object.assign(new TinymceDefaultOptions(), this.config);
        this.options.selector = '#' + this.elementId;
        this.options.setup = function (editor) {
            _this.editor = editor;
            editor.on('change keyup', function () {
                var content = editor.getContent();
                _this.value = content;
            });
            if (typeof _this.config.setup === 'function') {
                _this.config.setup(editor);
            }
        };
        this.options.init_instance_callback = function (editor) {
            editor && _this.value && editor.setContent(_this.value);
            if (typeof _this.config.init_instance_callback === 'function') {
                _this.config.init_instance_callback(editor);
            }
        };
        if (this.config.auto_focus) {
            this.options.auto_focus = this.elementId;
        }
    }
    TinymceComponent.prototype.ngAfterViewInit = function () {
        if (this.options.baseURL) {
            tinymce.baseURL = this.options.baseURL;
        }
        tinymce.init(this.options);
    };
    TinymceComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    Object.defineProperty(TinymceComponent.prototype, "value", {
        // get accessor
        get: function () {
            return this.innerValue;
        },
        // set accessor including call the onchange callback
        set: function (v) {
            var _this = this;
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.zone.run(function () {
                    _this.onChangeCallback(v);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    // From ControlValueAccessor interface
    TinymceComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            this.editor && this.editor.setContent(value);
        }
    };
    TinymceComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    TinymceComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return TinymceComponent;
}());
TinymceComponent = TinymceComponent_1 = __decorate([
    Component({
        selector: 'app-tinymce',
        template: "<div id=\"{{elementId}}\"></div>",
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(function () { return TinymceComponent_1; }),
                multi: true
            }
        ]
    }),
    __param(1, Inject('tinymce-config')),
    __metadata("design:paramtypes", [NgZone, Object])
], TinymceComponent);
export { TinymceComponent };
var TinymceComponent_1;
//# sourceMappingURL=angular2-tinymce.component.js.map