/** This module is for demo purposes only */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TinymceModule } from '../../src/angular2-tinymce.module';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		TinymceModule,
		FormsModule,
		ReactiveFormsModule
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
