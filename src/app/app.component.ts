import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
	@ViewChild('tinymce') tinymce;
	title = 'app';

	constructor() {
	}

	ngAfterViewInit() {
		console.log(this.tinymce);
	}

	log(w) {
		console.log(w);
	}
}
