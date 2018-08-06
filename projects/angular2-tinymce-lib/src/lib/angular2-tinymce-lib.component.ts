import { Component, OnDestroy, AfterViewInit, forwardRef, NgZone, Inject, Input, OnInit, EventEmitter, Output } from '@angular/core';
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

	@Output() click = new EventEmitter();
	@Output() dblclick = new EventEmitter();
	@Output() mousedown = new EventEmitter();
	@Output() mouseup = new EventEmitter();
	@Output() mousemove = new EventEmitter();
	@Output() mouseover = new EventEmitter();
	@Output() mouseout = new EventEmitter();
	@Output() mouseenter = new EventEmitter();
	@Output() mouseleave = new EventEmitter();
	@Output() keydown = new EventEmitter();
	@Output() keypress = new EventEmitter();
	@Output() keyup = new EventEmitter();
	@Output() contextmenu = new EventEmitter();
	@Output() paste = new EventEmitter();
	@Output() init = new EventEmitter();
	@Output() focus = new EventEmitter();
	@Output() blur = new EventEmitter();
	@Output() beforeSetContent = new EventEmitter();
	@Output() setContent = new EventEmitter();
	@Output() getContent = new EventEmitter();
	@Output() preProcess = new EventEmitter();
	@Output() postProcess = new EventEmitter();
	@Output() nodeChange = new EventEmitter();
	@Output() undo = new EventEmitter();
	@Output() redo = new EventEmitter();
	@Output() change = new EventEmitter();
	@Output() dirty = new EventEmitter();
	@Output() remove = new EventEmitter();
	@Output() execCommand = new EventEmitter();
	@Output() pastePreProcess = new EventEmitter();
	@Output() pastePostProcess = new EventEmitter();

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
			this.setupEvents(editor);
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

	setupEvents(editor) {
		editor.on('change keyup', () => {
			const content = editor.getContent();
			this.value = content;
		});
		editor.on('click', e => {
			this.click.emit(e);
		});
		editor.on('dblclick', e => {
			this.dblclick.emit(e);
		});
		editor.on('mousedown', e => {
			this.mousedown.emit(e);
		});
		editor.on('mouseup', e => {
			this.mouseup.emit(e);
		});
		editor.on('mousemove', e => {
			this.mousemove.emit(e);
		});
		editor.on('mouseover', e => {
			this.mouseover.emit(e);
		});
		editor.on('mouseout', e => {
			this.mouseout.emit(e);
		});
		editor.on('mouseenter', e => {
			this.mouseenter.emit(e);
		});
		editor.on('mouseleave', e => {
			this.mouseleave.emit(e);
		});
		editor.on('keydown', e => {
			this.keydown.emit(e);
		});
		editor.on('keypress', e => {
			this.keypress.emit(e);
		});
		editor.on('keyup', e => {
			this.keyup.emit(e);
		});
		editor.on('contextmenu', e => {
			this.contextmenu.emit(e);
		});
		editor.on('paste', e => {
			this.paste.emit(e);
		});
		editor.on('init', e => {
			this.init.emit(e);
		});
		editor.on('focus', e => {
			this.focus.emit(e);
		});
		editor.on('blur', e => {
			this.blur.emit(e);
		});
		editor.on('BeforeSetContent', e => {
			this.beforeSetContent.emit(e);
		});
		editor.on('SetContent', e => {
			this.setContent.emit(e);
		});
		editor.on('GetContent', e => {
			this.getContent.emit(e);
		});
		editor.on('PreProcess', e => {
			this.preProcess.emit(e);
		});
		editor.on('PostProcess', e => {
			this.postProcess.emit(e);
		});
		editor.on('NodeChange', e => {
			this.nodeChange.emit(e);
		});
		editor.on('Undo', e => {
			this.undo.emit(e);
		});
		editor.on('Redo', e => {
			this.redo.emit(e);
		});
		editor.on('Change', e => {
			this.change.emit(e);
		});
		editor.on('Dirty', e => {
			this.dirty.emit(e);
		});
		editor.on('Remove', e => {
			this.remove.emit(e);
		});
		editor.on('ExecCommand', e => {
			this.execCommand.emit(e);
		});
		editor.on('PastePreProcess', e => {
			this.pastePreProcess.emit(e);
		});
		editor.on('PastePostProcess', e => {
			this.pastePostProcess.emit(e);
		});
	}
}
