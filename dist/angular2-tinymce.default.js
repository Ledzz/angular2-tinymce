var TinymceDefaultOptions = (function () {
    function TinymceDefaultOptions() {
        this.plugins = [
            'link',
            'paste',
            'table',
            'advlist',
            'autoresize',
            'lists',
            'code'
        ];
        this.skin_url = '/assets/tinymce/skins/lightgray';
        this.baseURL = '/assets/tinymce';
        this.auto_focus = true;
    }
    return TinymceDefaultOptions;
}());
export { TinymceDefaultOptions };
//# sourceMappingURL=angular2-tinymce.default.js.map