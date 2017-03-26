import { ModuleWithProviders } from '@angular/core';
import { TinymceOptions } from './angular2-tinymce.config.interface';
import tinymce from 'tinymce/tinymce.js';
export declare class TinymceModule {
    static withConfig(userConfig?: TinymceOptions): ModuleWithProviders;
}
export { tinymce };
