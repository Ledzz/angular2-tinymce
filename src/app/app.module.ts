import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TinymceModule } from 'angular2-tinymce';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		TinymceModule.withConfig({})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
