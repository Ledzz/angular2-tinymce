import { NgModule, ModuleWithProviders } from '@angular/core';
import { TinymceComponent } from './angular2-tinymce.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TinymceOptions } from './angular2-tinymce.config.interface';
import tinymce from 'tinymce/tinymce.js';

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
	],
	providers: [
		{ provide: 'TINYMCE_CONFIG', useClass: TinymceOptions }
	]
})
export class TinymceModule {
	static withConfig(userConfig: TinymceOptions = {}): ModuleWithProviders {
		return {
			ngModule: TinymceModule,
			providers: [
				{ provide: 'TINYMCE_CONFIG', useValue: userConfig }
			]
		}
	}
}
export { tinymce }