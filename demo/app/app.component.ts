import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
	selector: 'my-app',
	styleUrls: ['./app.component.css'],
	templateUrl: './app.component.html',
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	public content: string = '<h1>Hello, world!</h1>';
	public contentControl: FormControl = new FormControl(
`<h2>Advantages</h2>
<ul>
	<li>Works nice with both ngModel and formControl</li>
	<li>Updates on change and keyup</li>
	<li>More features in future</li>
</ul>`);
	constructor() { }
	
}