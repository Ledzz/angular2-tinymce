import {ModuleWithProviders, NgModule} from '@angular/core';
import { TinymceComponent } from './angular2-tinymce-lib.component';
import {TinymceOptions} from './angular2-tinymce-lib.config.interface';
import {TinymceDefaultOptions} from './angular2-tinymce-lib.default';

@NgModule({
  imports: [
  ],
  declarations: [TinymceComponent],
  exports: [TinymceComponent],
  providers: [
    { provide: 'TINYMCE_CONFIG', useClass: TinymceDefaultOptions }
  ]
})
export class TinymceModule {
  static withConfig(userConfig: TinymceOptions = {}): ModuleWithProviders {
    return {
      ngModule: TinymceModule,
      providers: [
        { provide: 'TINYMCE_CONFIG', useValue: userConfig }
      ]
    };
  }
}
