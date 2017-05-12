import { Component, OnDestroy, AfterViewInit, forwardRef, NgZone, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TinymceDefaultOptions } from './angular2-tinymce.default';
import { TinymceOptions } from './angular2-tinymce.config.interface';

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
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TinymceComponent),
			multi: true
		}
	]
})
export class TinymceComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
	public elementId: string = 'tiny-'+Math.random().toString(36).substring(2);
	public editor: any;

	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (_: any) => void = noop;
	private innerValue: string;

	private options: any;
	constructor(
		private zone: NgZone,
		@Inject('TINYMCE_CONFIG') private config: TinymceOptions
	) {
		this.options = Object.assign(new TinymceDefaultOptions(), this.config);
		this.options.selector = '#' + this.elementId;
		this.options.setup = editor => {
			this.editor = editor;
			editor.on('change keyup', () => {
				const content = editor.getContent();
				this.value = content;
			});
			if (typeof this.config.setup === 'function') {
				this.config.setup(editor);
			}
		}
		this.options.init_instance_callback = editor => {
			editor && this.value && editor.setContent(this.value)
			if (typeof this.config.init_instance_callback === 'function') {
				this.config.init_instance_callback(editor);
			}
		}
		if (this.config.auto_focus) {
			this.options.auto_focus = this.elementId;
		}
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
	};

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
		if (value && value !== this.innerValue) {
			this.innerValue = value;
			this.editor && this.editor.setContent(value);
		}
	}

	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}
}
