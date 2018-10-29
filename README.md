# d1dialog

Add-on for [d1](https://github.com/vvvkor/d1).  
Replacement for standard Javascript dialogs: ``alert``, ``confirm``, ``prompt``.  
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

### qsDialog

Query selector of links with dialog.  
Default: ``".dialog"``

### qsAlert

Query selector of links with alert.  
Default: ``".alert"``

### confirmArg

Argument appended to URL when user confirms action.  
Default: ``"confirm"``

### idPrefix

Prefix of the ``id`` of dialog window element.  
Default: ``"dlg"``

### dlgClass

CSS class of dialog window element.  
Default: ``"hide dlg c"``

### hashOk

Hash of "ok" link.  
Default: ``"#ok"``

### hashCancel

Hash of "close" and "cancel" links.  
Default: ``"#cancel"``

### strOk

Label on "ok" button.  
Default: ``"OK"``

### strCancel

Label on "cancel" button.  
Default: ``"Cancel"``

### strClose

Label on "close" button.  
Default: ``"&times;"``

## Browser Support

* IE 10+
* Latest Stable: Chrome, Firefox, Opera, Safari

## License

[MIT](./LICENSE)
