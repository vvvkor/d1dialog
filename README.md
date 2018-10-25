# d1dialog

Replacement for standard Javascript dialogs: ``alert``, ``confirm``, ``prompt``.  
[Demo & Docs](http://vadimkor.ru/projects/dialog/)

## Install

```
npm install d1dialog
```

## Usage

* Add ``alert`` class to a link for simple alert with one button.
* Add ``dialog`` class to a link or form button for dialog with two buttons.
* Add ``data-caption`` or ``title`` attribute to set text of dialog.
* Add ``data-prompt`` attribute to specify URL argument for editing.
* Add ``data-ok`` and ``data-cancel`` attributes to set custom button captions.
* Add ``data-src`` attribute to specify selector of the input from which to take value for ``data-prompt``.
	<br>If that value is not empty then prompt is not shown.

## Browser Support

* IE 10+
* Latest Stable: Chrome, Firefox, Opera, Safari

## License

[MIT](./LICENSE)
