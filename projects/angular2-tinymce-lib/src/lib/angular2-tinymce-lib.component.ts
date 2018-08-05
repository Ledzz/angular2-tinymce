import { Component, OnDestroy, AfterViewInit, forwardRef, NgZone, Inject, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TinymceDefaultOptions } from './angular2-tinymce-lib.default';
import { TinymceOptions } from './angular2-tinymce-lib.config.interface';

import 'tinymce/tinymce.min';

declare var tinymce: any;

import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/link/plugin.js';
import 'tinymce/plugins/paste/plugin.js';
import 'tinymce/plugins/table/plugin.js';
import 'tinymce/plugins/advlist/plugin.js';
import 'tinymce/plugins/autoresize/plugin.js';
import 'tinymce/plugins/lists/plugin.js';
import 'tinymce/plugins/code/plugin.js';

const noop = () => {
};

@Component({
	selector: 'app-tinymce',
	template: '<div id="{{elementId}}"></div>',
	exportAs: 'tinymce',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TinymceComponent),
			multi: true
		}
	]
})
export class TinymceComponent implements ControlValueAccessor, AfterViewInit, OnInit, OnDestroy {
	@Input('options') optionsOverride: TinymceOptions;

	public elementId: string = 'tiny-' + Math.random().toString(36).substring(2);
	public editor: any;

	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (_: any) => void = noop;
	private innerValue: string;

	private options: TinymceOptions;

	constructor(
		private zone: NgZone,
		@Inject('TINYMCE_CONFIG') private globalOptions: TinymceOptions
	) {

	}

	ngOnInit() {
		this.options = Object.assign(new TinymceDefaultOptions(), this.globalOptions, this.optionsOverride);
		this.options.selector = '#' + this.elementId;
		this.options.setup = editor => {
			editor.on('change keyup', () => {
				const content = editor.getContent();
				this.value = content;
			});
		};
		this.options.init_instance_callback = editor => {
			if (editor && this.value) {
				editor.setContent(this.value);
			}
			this.editor = editor;
		};
	}

	ngAfterViewInit() {
		if (this.options.baseURL) {
			tinymce.baseURL = this.options.baseURL;
		}
		tinymce.init(this.options);
	}

	ngOnDestroy() {
		tinymce.remove(this.editor);
	}

	// get accessor
	get value(): any {
		return this.innerValue;
	}

	// set accessor including call the onchange callback
	set value(v: any) {
		if (v !== this.innerValue) {
			this.innerValue = v;
			this.zone.run(() => {
				this.onChangeCallback(v);
			});

		}
	}

	// From ControlValueAccessor interface
	writeValue(value: any) {
		if (value !== this.innerValue) {
			this.innerValue = value;
			if (!value) {
				value = '';
			}
			if (this.editor && this.editor.initialized) {
				this.editor.setContent(value);
			}
		}
	}

	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}
}
