import { TinymceOptions } from './angular2-tinymce.config.interface';
export class TinymceDefaultOptions implements TinymceOptions {
	plugins = [
		'link', 
		'paste', 
		'table', 
		'advlist', 
		'autoresize', 
		'lists',
		'code'
	];
	skin_url = '/assets/tinymce/skins/lightgray';
	baseURL = '/assets/tinymce';
	auto_focus = true;
}