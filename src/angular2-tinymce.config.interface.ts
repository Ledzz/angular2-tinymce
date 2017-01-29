export class TinymceOptions {
	plugins?: Array<string> = [
		'link', 
		'paste', 
		'table', 
		'advlist', 
		'autoresize', 
		'lists',
		'code'
	];
	skin_url?: string = '/assets/tinymce/skins/lightgray';
	selector?: string;
	setup?: any;
	init_instance_callback?: any;
	baseURL?: string = '/assets/tinymce';  // I.e. may be used for custom plugins
	contextmenu?: string;
	toolbar?: string;
	auto_focus?: boolean = true;  // This is boolean instead of string
	cache_suffix?: string;
	content_security_policy?: string;
	external_plugins?: string;
	hidden_input?: string;
}