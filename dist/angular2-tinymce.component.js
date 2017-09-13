"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var angular2_tinymce_default_1 = require("./angular2-tinymce.default");
require("tinymce/tinymce.min");
require("tinymce/themes/modern/theme");
require("tinymce/plugins/link/plugin.js");
require("tinymce/plugins/paste/plugin.js");
require("tinymce/plugins/table/plugin.js");
require("tinymce/plugins/advlist/plugin.js");
require("tinymce/plugins/autoresize/plugin.js");
require("tinymce/plugins/lists/plugin.js");
require("tinymce/plugins/code/plugin.js");
var noop = function () {
};
var TinymceComponent = /** @class */ (function () {
    function TinymceComponent(zone, options) {
        this.zone = zone;
        this.options = options;
        this.elementId = 'tiny-' + Math.random().toString(36).substring(2);
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        //
    }
    TinymceComponent_1 = TinymceComponent;
    TinymceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mergedOptions = Object.assign(new angular2_tinymce_default_1.TinymceDefaultOptions(), this.options, this.config);
        this.mergedOptions.selector = '#' + this.elementId;
        this.mergedOptions.setup = function (editor) {
            _this.editor = editor;
            editor.on('change keyup', function () {
                _this.value = editor.getContent();
            });
            if (typeof _this.options.setup === 'function') {
                _this.options.setup(editor);
            }
        };
        this.mergedOptions.init_instance_callback = function (editor) {
            editor && _this.value && editor.setContent(_this.value);
            if (typeof _this.options.init_instance_callback === 'function') {
                _this.options.init_instance_callback(editor);
            }
        };
        if (this.options.auto_focus) {
            this.mergedOptions.auto_focus = this.elementId;
        }
    };
    TinymceComponent.prototype.ngAfterViewInit = function () {
        if (this.mergedOptions.baseURL) {
            tinymce.baseURL = this.mergedOptions.baseURL;
        }
        tinymce.init(this.mergedOptions);
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
            if (!value) {
                value = '';
            }
            this.editor && this.editor.initialized && this.editor.setContent(value);
        }
    };
    TinymceComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    TinymceComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TinymceComponent.prototype, "config", void 0);
    TinymceComponent = TinymceComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-tinymce',
            template: '<div id="{{elementId}}"></div>',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return TinymceComponent_1; }),
                    multi: true
                }
            ]
        }),
        __param(1, core_1.Inject('TINYMCE_CONFIG')),
        __metadata("design:paramtypes", [core_1.NgZone, Object])
    ], TinymceComponent);
    return TinymceComponent;
    var TinymceComponent_1;
}());
exports.TinymceComponent = TinymceComponent;
//# sourceMappingURL=angular2-tinymce.component.js.map