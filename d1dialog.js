/*! d1dialog https://github.com/vvvkor/d1dialog */
/* Replacement of standard Javascript dialogs: alert, confirm, prompt */

//a.alert([title]|[data-caption])
//a.dialog[href]([title]|[data-caption])[data-prompt][data-src][data-ok][data-cancel][data-reverse]
if(typeof module !== "undefined") var d1 = require('d1css');
(function(){
var main = new(function() {

  "use strict";
  
  this.name = 'dialog';
  
  this.opt = {
    argConfirm: '_confirm',
    ccDialog: 'dlg pad c',
    hashCancel: '#cancel',
    hashOk: '#ok',
    idPrefix: 'dlg'
  };

  this.win = null;
  this.seq = 0;

  this.init = function(opt) {
    var i;
    for(i in opt) this.opt[i] = opt[i];
    
    this.win = d1.ins('div', '', {
      id: this.opt.idPrefix + '0',
      className: this.opt.ccDialog + ' ' + d1.opt.cHide
    }, document.querySelector('body'));
    
    //override
    d1.dialog = this.dialog.bind(this);
    d1.showDialog = this.showDialog.bind(this);
}

  this.dialog = function(n, e) {
    if(n.classList.contains(d1.opt.cAlert)) return this.alert(n, e);
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
    var t = n.getAttribute('data-caption') || n.title || p || '!';
    var def = p ? d1.get(h, p) : '';
    //dialog
    var modal = !this.isDialogShown() && (!p || v === null || v === '');
    if (modal) {
      this.showDialog(t, 1, p, def, n);
      e.preventDefault();
    }
    else {
      var u = {};
      if (p) u[p] = v || n.vValue || '';
      if (this.opt.argConfirm && h.substr(0,1) != '#') u[this.opt.argConfirm] = 1; //h = d1.arg(h, {this.opt.argConfirm: 1});
      h = d1.arg(h, u);
      if (n.tagName == 'A') n.href = h;
    }
  }
  
  this.alert = function(n, e) {
    if (!this.isDialogShown()) {
      this.showDialog(n.getAttribute('data-caption') || n.title || '!', 0, 0, '', n);
      e.preventDefault();
      e.stopPropagation();
    }
  }

  this.showDialog = function(t, ask, enter, def, n) {
    while (this.win.firstChild) this.win.removeChild(this.win.firstChild);
    this.seq++;
    if(location.hash == '#' + this.opt.idPrefix + this.seq) this.seq++;
    this.win.id = this.opt.idPrefix + this.seq;
    var x = d1.ins('a', d1.i('close'), {href:this.opt.hashCancel, className:d1.opt.cClose+' pad'}, this.win);
    var tag = t.indexOf('>')==-1 ? 'p' : 'div';
    d1.ins(tag, t, {className: enter ? 'l' : ''}, this.win);
    var inp = null;
    if(enter) {
      var p2 = d1.ins('p', '', {className: 'l'}, this.win);
      var inp = d1.ins('input', '', {type: 'text', value: def}, p2);
    }
    var p3 = d1.ins('p', '', {}, this.win);
    var warn = (t.substr(0,1)==' ') ? 1 : (n ? (n.className.match(/-[we]\b/) || d1.q('.bg-e,.bg-w,.text-e,.text-w',0,n)) : '');
    var reverse = n.getAttribute('data-reverse') || 0;
    var cMain = 'btn pad ' + (warn ? 'bg-e' : 'bg-y');
    var cSec = 'btn pad bg-n';
    var ok = d1.ins('a', (n ? n.getAttribute('data-ok') : '') || d1.s('ok'), {href: this.opt.hashOk, className: reverse ? cSec : cMain}, p3);
    if (ask) {
      var no = d1.ins('a', (n ? n.getAttribute('data-cancel') : '') || d1.s('cancel'), {href: this.opt.hashCancel, className: reverse ? cMain : cSec}, ok, reverse ? -1 : 1);
      d1.ins('', ' ', {}, no, reverse ? 1 : -1);
    }
    if(inp) inp.addEventListener('keypress', this.dialogConfirm.bind(this, n, inp, ask), false);
    ok.addEventListener('click', this.dialogConfirm.bind(this, n, inp, ask), false);
    location.hash = '#' + this.win.id;
    if(inp) inp.select();
    else if(this.win.scrollHeight <= this.win.clientHeight) (reverse && no ? no : ok).focus();
  }
  
  this.dialogConfirm = function(n, inp, ask, e) {
    if(e.type == 'click' || e.keyCode == 13){
      e.preventDefault();
      e.stopPropagation();
      if (inp && n) n.vValue = inp.value;
      if(typeof ask === 'function'){
        d1.esc();
        ask(inp ? inp.value : null);
      }
      else{
        if(n) n.click()
        if(!n || n.target) d1.esc();
      }
      //var evt = new MouseEvent('click');
      //n.dispatchEvent(evt);
      //location.hash = this.opt.hashOk;
    }
  }
  
  this.isDialogShown = function() {
    //return document.querySelector('#' + this.win.id + ':target');
    return (location.hash == '#' + this.win.id);
  }
  
  d1.plug(this);

})();

  if(typeof module !== "undefined") module.exports = main;
  else if(window) d1dialog = main;
})();