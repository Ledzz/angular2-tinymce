# angular2-tinymce

## Usage

First, install package via npm:
```
npm install --save angular2-tinymce
```

Then copy lightgray skin from [here] (https://github.com/Ledzz/angular2-tinymce/tree/master/demo/assets/tinymce/skins/lightgray) to the `/assets` folder. So, i.e. there must be available `/assets/tinymce/skins/lightgray/skin.min.css` file.

Import `TinymceModule` in you `app.module.ts`:
```
import { TinymceModule } from 'angular2-tinymce';

@NgModule({
	imports: [
		...
		TinymceModule
	],
	...
})
export class AppModule { }
```

Upcoming features:
- [ ] Tinymce configuration
- [ ] File uploading
- [ ] Events
