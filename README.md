# d1dialog

Add-on for [d1](https://github.com/vvvkor/d1).  
Replacement of standard Javascript dialogs: ``alert``, ``confirm``, ``prompt``.  
[Demo & Docs](http://vadimkor.ru/projects/d1#dialog)

## Install

```
npm install d1dialog
```

## Usage

On page load call:
```
d1dialog.init(options);
```

In your markup:
* Add ``alert`` class to a link for simple alert with one button.
* Add ``dialog`` class to a link or form button for dialog with two buttons.
* Add ``data-caption`` or ``title`` attribute to set text of dialog.
* Add ``data-prompt`` attribute to specify URL argument for editing.
* Add ``data-ok`` and ``data-cancel`` attributes to set custom button captions.
* Add ``data-src`` attribute to specify selector of the input from which to take value for ``data-prompt``.  
If that value is not empty then prompt is not shown.

## Examples

Simple alert link
```
<a href="#ok" class="alert" title="Hi!">Show alert</a>
```

Simple link with confirmation
```
<a href="?action" class="dialog" title="Continue?">Confirm action</a>
```

Simple button with confirmation
```
<input type="submit" value="Submit" class="dialog" title="Confirm?">
```

Simple link with value prompt
```
<a href="?action=default" class="dialog" data-prompt="action" data-caption="Action:">Action prompt</a>
```

## Options

### argConfirm

Argument appended to URL when user confirms action.  
Default: ``"confirm"``

### ccDialog

CSS class (classes) of dialog window element.  
Default: ``"dlg pad c"``

### hashCancel

Hash of "close" and "cancel" links.  
Default: ``"#cancel"``

### hashOk

Hash of "ok" link.  
Default: ``"#ok"``

### idPrefix

Prefix of the ``id`` of dialog window element.  
Default: ``"dlg"``

## Browser Support

* IE 10+
* Latest Stable: Chrome, Firefox, Opera, Safari

## License

[MIT](./LICENSE)
