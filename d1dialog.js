//a.alert([title]|[data-caption])
//a.dialog[href]([title]|[data-caption])[data-prompt][data-src][data-ok][data-cancel]
(function(){
var main = new(function() {

  "use strict";
  
  this.opt = {
    qsDialog: '.dialog',
    qsAlert: '.alert',
    confirmArg: 'confirm',
    idPrefix: 'dlg',
    dlgClass: 'hide dlg c',
    hashOk: '#ok',
    hashCancel: '#cancel',
    strOk: 'OK',
    strCancel: 'Cancel',
    strClose: '&times;'
  };

  this.win = null;
  this.seq = 0;

  this.init = function(opt) {
    var i;
    for(i in opt) this.opt[i] = opt[i];
    
    this.win = d1.ins('div', '', {
      id: this.opt.idPrefix + '0',
      className: this.opt.dlgClass
    }, document.querySelector('body'));
    var t = document.querySelectorAll(this.opt.qsDialog);
    for (i = 0; i < t.length; i++) t[i].addEventListener('click', this.dialog.bind(this, t[i]), false);
    var t = document.querySelectorAll(this.opt.qsAlert);
    for (i = 0; i < t.length; i++) t[i].addEventListener('click', this.alert.bind(this, t[i]), false);
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
      var u = {};
      if (p) {
        v = encodeURIComponent(v || n.vValue || '');
        if (fnd) h = h.replace(re, '$1' + v);
        //else h = d1.add(h, {p: v});
        else u[p] = v;
      }
      if (this.opt.confirmArg && h.substr(0,1) != '#') u[this.opt.confirmArg] = 1; //h = d1.arg(h, {this.opt.confirmArg: 1});
      h = d1.arg(h, u);
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
    this.win.id = this.opt.idPrefix + this.seq;
    d1.ins('a', this.opt.strClose, {href:this.opt.hashCancel, className:'close pad'}, this.win);
    d1.ins('p', t, {className: enter ? 'l' : ''}, this.win);
    var inp = null;
    if(enter) {
      var p2 = d1.ins('p', '', {className: 'l'}, this.win);
      var inp = d1.ins('input', '', {type: 'text', value: def}, p2);
    }
    var p3 = d1.ins('p', '', {}, this.win);
    var warn = n.className.match(/-[we]\b/);
    var ok = d1.ins('a', n.getAttribute('data-ok') || this.opt.strOk, {href: this.opt.hashOk, className: 'btn pad ' + (warn ? 'bg-e' : 'bg-y')}, p3);
    if (ask) {
      d1.ins('', ' ', {}, p3);
      d1.ins('a', n.getAttribute('data-cancel') || this.opt.strCancel, {href: this.opt.hashCancel, className: 'btn pad bg-n'}, p3);
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
    //location.hash = this.opt.hashOk;
  }
  
  this.isDialogShown = function() {
    //return document.querySelector('#' + this.win.id + ':target');
    return (location.hash == '#' + this.win.id);
  }

})();

  if(typeof module !== "undefined") module.exports = main;
  else if(window) d1dialog = main;
})();