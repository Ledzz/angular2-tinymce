# angular2-tinymce ![pipeline status](https://gitlab.com/Ledzz/angular2-tinymce/badges/master/pipeline.svg)

`Now compatible with Angular 6!`

## Usage

First, install tinymce and this lib via npm:
```
npm install --save tinymce angular2-tinymce
```

Then copy lightgray skin files from `node_modules/tinymce` to the `/assets` folder. So, i.e. there must be available `/assets/tinymce/skins/lightgray/skin.min.css` and `/assets/tinymce/skins/lightgray/content.min.css` file.
You can override skin path by specifying `skin_url` option (default `/assets/tinymce/skins/lightgray`).

To support AOT mode in Angular 6 and higher you also need to include tinymce in your scripts section in angular.json config file:
```json
 "scripts": [
    "node_modules/tinymce/tinymce.min.js",
    ...
]
```

Import `TinymceModule` in you `app.module.ts` like this:
```typescript
import { TinymceModule } from 'angular2-tinymce';

@NgModule({
  imports: [
    ...
    TinymceModule.withConfig({})
  ],
  ...
})
export class AppModule { }
```

Then use it:
```html
<app-tinymce [formControl]='contentControl'></app-tinymce>
```
or
```html
<app-tinymce [(ngModel)]='content'></app-tinymce>
```

You can also use template variable `tinymce` to get instance of tinymce:
```html
<app-tinymce [(ngModel)]='content' #tinymce='tinymce'></app-tinymce>
```
then in component.ts:
```typescript
@ViewChild('tinymce') tinymce;
ngAfterViewInit() {
  console.log(this.tinymce);
}
```

## Configure
You can configure TinyMCE globally:
```typescript
import { TinymceModule } from 'angular2-tinymce';

@NgModule({
  imports: [
    ...
    TinymceModule.withConfig({
      ...  //any TinyMCE config here
    })
  ],
  ...
})
export class AppModule { }
```
Please note that config is extended a bit.

- Besides the original config angular2-tinymce supports `baseURL` for providing, i.e., custom plugins paths.

- `auto_focus` option is boolean instead of string.
- You cannot specify `selector` option (and you don't need to, right?).
- `setup` and `init_instance_callback` are executed after the components'.
- You can view more info about supported options [here] (src/angular2-tinymce.config.interface.ts)

## Plugins
If you need other plugins than standart (`link paste table advlist autoresize lists code`) you should create plugins folder in the `baseURL` (default '/assets/tinymce') and place your plugins in it.

**Example:** 
Place emoticons plugin to an `/assets/tinymce/plugins` folder, then:
```typescript
import { TinymceModule } from 'angular2-tinymce';

@NgModule({
  imports: [
    ...
    TinymceModule.withConfig({
      plugins: ['emoticons'],
      toolbar: 'emoticons'
    })
  ],
  ...
})
export class AppModule { }
```

Alternativaly you can `npm install tinymce --save` and import plugins like that:
```typescript
import 'tinymce/plugins/emoticons/plugin.js';
```

## Contributing
Please feel free to leave your PRs, issues, feature requests.

## Upcoming features
- [x] Tinymce configuration
- [x] Aot support
- [x] Add demo
- [x] Add CI
- [ ] Per-editor configuration
- [ ] File uploading
- [ ] Events
- [ ] Tests
