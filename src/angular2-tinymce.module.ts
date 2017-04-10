import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TinymceComponent } from './angular2-tinymce.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TinymceOptions } from './angular2-tinymce.config.interface';
import { TinymceDefaultOptions } from './angular2-tinymce.default';

@NgModule({
    imports: [
    	CommonModule,
    	FormsModule,
		ReactiveFormsModule
	],
    declarations: [
	    TinymceComponent
    ],
    exports: [
		TinymceComponent
	]
})
export class TinymceModule { }