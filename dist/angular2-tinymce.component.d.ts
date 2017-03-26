import { OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { TinymceOptions } from './angular2-tinymce.config.interface';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/link/plugin.js';
import 'tinymce/plugins/paste/plugin.js';
import 'tinymce/plugins/table/plugin.js';
import 'tinymce/plugins/advlist/plugin.js';
import 'tinymce/plugins/autoresize/plugin.js';
import 'tinymce/plugins/lists/plugin.js';
import 'tinymce/plugins/code/plugin.js';
export declare class TinymceComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
    private zone;
    private config;
    elementId: string;
    editor: any;
    private onTouchedCallback;
    private onChangeCallback;
    private innerValue;
    private options;
    constructor(zone: NgZone, config: TinymceOptions);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    value: any;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
