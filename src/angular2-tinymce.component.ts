import { Component, OnDestroy, AfterViewInit, forwardRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import tinymce from 'tinymce/tinymce.js';
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
	templateUrl: './angular2-tinymce.component.html',
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

	public fileUploadCallback;
	constructor(private zone: NgZone) {
	}

	ngAfterViewInit() {
		tinymce.init({
			selector: '#' + this.elementId,
			plugins: ['link', 'paste', 'table', 'advlist', 'autoresize', 'lists',, 'code'],
			skin_url: '/assets/tinymce/skins/lightgray',
			setup: editor => {
				this.editor = editor;
				editor.on('change keyup', () => {
					const content = editor.getContent();
					this.value = content;
				});
			},
			init_instance_callback: editor => {
				editor && this.value && editor.setContent(this.value)
			}
		});
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
		if (value !== this.innerValue) {
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
