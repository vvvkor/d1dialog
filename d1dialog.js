//a.alert([title]|[data-caption])
//a.dialog[href]([title]|[data-caption])[data-prompt][data-src][data-ok][data-cancel]
(function(){
var main = new(function() {

  "use strict";
  
  this.qd = '.dialog';
  this.qa = '.alert';
  this.confirmArg = 'confirm';
  this.idPrefix = 'dlg';
  this.dlgClass = 'hide dlg c';
  this.hashOk = '#ok';
  this.hashCancel = '#cancel';
  this.str = {
    ok: 'OK',
    cancel: 'Cancel',
    close: '&times;'
  };

  this.win = null;
  this.seq = 0;

  this.init = function(opt) {
    this.win = this.ins('div', '', {
      id: this.idPrefix + '0',
      className: this.dlgClass
    }, document.querySelector('body'));
    var t = document.querySelectorAll(this.qd);
    for (var i = 0; i < t.length; i++) t[i].addEventListener('click', this.dialog.bind(this, t[i]), false);
    var t = document.querySelectorAll(this.qa);
    for (var i = 0; i < t.length; i++) t[i].addEventListener('click', this.alert.bind(this, t[i]), false);
  }

  this.dialog = function(n, e) {
    e.stopPropagation();
    if (n.form && !n.form.checkValidity()) return;

    if (n.vHref === undefined) n.vHref = n.getAttribute('href') || '';
    var h = n.vHref;
    var v = n.getAttribute('data-src');
    if (v) {
      v = document.querySelector(v);
      if (v) v = v.value;
    }
    var p = n.getAttribute('data-prompt') || '';
    var t = n.getAttribute('data-caption') || p || n.title || '!';
    var def = '';
	var fnd = false;
    if (p) {
      var re = new RegExp('([?&]' + p + '=)([^&]*)');
      var m = h.match(re);
      if (m) {
        def = decodeURIComponent(m[2]);
        fnd = true;
      }
    }
    //dialog
    var modal = !this.isDialogShown() && (!p || v === null || v === '');
    if (modal) {
      this.showDialog(n, t, 1, p, def);
      e.preventDefault();
    }
    else {
      if (p) {
        v = encodeURIComponent(v || n.vValue || '');
        if (fnd) h = h.replace(re, '$1' + v);
        else h = this.addArg(h, p, v);
      }
      if (this.confirmArg && h.substr(0,1) != '#') h = this.addArg(h, this.confirmArg, 1);
      if (n.tagName == 'A') n.href = h;
    }
  }
  
  this.alert = function(n, e) {
    if (!this.isDialogShown()) {
      this.showDialog(n, n.getAttribute('data-caption') || n.title || '!');
      e.preventDefault();
      e.stopPropagation();
    }
  }

  this.showDialog = function(n, t, ask, enter, def) {
    while (this.win.firstChild) this.win.removeChild(this.win.firstChild);
    this.seq++;
    this.win.id = this.idPrefix + this.seq;
    this.ins('a', this.str.close, {href:this.hashCancel, className:'close pad'}, this.win);
    this.ins('p', t, {className: enter ? 'l' : ''}, this.win);
    var inp = null;
    if(enter) {
      var p2 = this.ins('p', '', {className: 'l'}, this.win);
      var inp = this.ins('input', '', {type: 'text', value: def}, p2);
    }
    var p3 = this.ins('p', '', {}, this.win);
    var warn = n.className.match(/-[we]\b/);
    var ok = this.ins('a', n.getAttribute('data-ok') || this.str.ok, {href: this.hashOk, className: 'btn pad ' + (warn ? 'bg-e' : 'bg-y')}, p3);
    if (ask) {
      this.ins('', ' ', {}, p3);
      this.ins('a', n.getAttribute('data-cancel') || this.str.cancel, {href: this.hashCancel, className: 'btn pad bg-n'}, p3);
    }
    ok.addEventListener('click', this.dialogConfirm.bind(this, n, inp), false);
    location.hash = '#' + this.win.id;
    (inp ? inp : ok).focus();
  }
  
  this.dialogConfirm = function(n, inp, e) {
    e.preventDefault();
    if (inp) n.vValue = inp.value;
    n.click();
    //var evt = new MouseEvent('click');
    //n.dispatchEvent(evt);
    //location.hash = this.hashOk;
  }
  
  this.isDialogShown = function() {
    return document.querySelector('#' + this.win.id + ':target');
  }

  //after: 0 = appendChild, 1 = siblingAfter
  this.ins = function(tag, t, attrs, n, after) {
    var c = document.createElement(tag || 'span');
    if (t) c.innerHTML = t; //c.appendChild(document.createTextNode(t||''));
    if (attrs) {
      for (var i in attrs) c[i] = attrs[i];
    }
    return n ? (after ? n.parentNode.insertBefore(c, n.nextSibling) : n.appendChild(c)) : c;
  }

  this.addArg = function(h, p, v){
    return h + (h.indexOf('?') == -1 ? '?' : '&') + p + '=' + v;
  }
  
  //document.addEventListener('DOMContentLoaded', this.init.bind(this), false);

})();

  if(typeof module !== "undefined") module.exports = main;
  else if(window) d1dialog = main;
})();