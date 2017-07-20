# angular2-tinymce

`Now compatible with Angular 4.0.1 with AOT support!`

## Usage

First, install package via npm:
```
npm install --save angular2-tinymce
```

Then copy lightgray skin files from [here](https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.6.4/skins/lightgray/skin.min.css) and [here](https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.6.4/skins/lightgray/content.min.css) to the `/assets` folder. So, i.e. there must be available `/assets/tinymce/skins/lightgray/skin.min.css` and `/assets/tinymce/skins/lightgray/content.min.css` file.
You can override skin path by specifying `skin_url` option (default `/assets/tinymce/skins/lightgray`).

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

## SystemJS configuration
When using SystemJS, you need to load tinymce plugins as global shim modules instead of AMD modules (default).
Update the file systemjs.config.js as following:
```typescript
System.config({
  meta: {
    ...
    'node_modules/tinymce/plugins/advlist/plugin.js': { format: 'global' },
    'node_modules/tinymce/plugins/autoresize/plugin.js': { format: 'global' },
    'node_modules/tinymce/plugins/code/plugin.js': { format: 'global' },
    'node_modules/tinymce/plugins/link/plugin.js': { format: 'global' },
    'node_modules/tinymce/plugins/lists/plugin.js': { format: 'global' },
    'node_modules/tinymce/plugins/paste/plugin.js': { format: 'global' },
    'node_modules/tinymce/plugins/table/plugin.js': { format: 'global' },
    'node_modules/tinymce/themes/modern/theme.js': { format: 'global' },	
  },
  map: {
    ...
    'angular2-tinymce': 'node_modules/angular2-tinymce/dist',
    'tinymce': 'node_modules/tinymce',
  },
  packages: {
    ...
    'angular2-tinymce': { main: 'index.js', defaultExtension: 'js' },
    'tinymce': { defaultExtension: 'js' },
  }
});
```

Note that tinymce npm package should be loaded in addition to angular2-tinymce when using SystemJS. Otherwise, it won't be able to load the plugins.

## Contributing
Please feel free to leave your PRs, issues, feature requests.

## Upcoming features
- [x] Tinymce configuration
- [x] Aot support
- [ ] Per-editor configuration
- [ ] Add github pages demo
- [ ] File uploading
- [ ] Events
- [ ] Tests
