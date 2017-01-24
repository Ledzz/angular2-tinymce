import { NgModule } from '@angular/core';
import { TinymceComponent } from './angular2-tinymce.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		TinymceComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule
	],
	exports: [
		TinymceComponent
	]
})
export class TinymceModule {

}