'use strict';
var fs = require( 'fs' );

var hbs = require( 'handlebars' );
var domify = require( 'domify' );
var scrollManager = require('scroll-manager');
var TweenMax = require('gsap');
var framework = require( '../../framework' );
function ScrollButton(model) {
  this.model = model;
  this.viewName = this.model.options.viewName;
  this.init();
}


ScrollButton.prototype = {

  init: function() {
    
      this.container = domify(hbs.compile(fs.readFileSync( __dirname + '/template.hbs', 'utf8' ))(this.model));
      document.body.appendChild(this.container);
      this.scroller = new scrollManager();

      this.addListeners();
  },

  addListeners: function() {
    this.container.addEventListener('mousedown', function() {
      this.doScroll(this.model.options.type);
    }.bind(this));
  },

  callback: function() {
    var callbackBanner = document.getElementById('callback-banner');
    TweenMax.to(callbackBanner, 0.6,
      { autoAlpha: 1, 
        ease:  Expo.easeOut,
        onComplete: function(){
          this.callbackRoute(this.viewName);
          TweenMax.to(callbackBanner, 1,{autoAlpha: 0, ease: Expo.easeOut});
        }.bind(this)
      }
    );
  },
  callbackRoute: function(section) {
    framework.go(section);
  },

  doScroll: function(scrollType) {
    var offset = document.getElementById(this.viewName);
    this.options = {
      'element': this.model.options.element,
      'ease': this.model.options.ease
    };

    switch(scrollType){
      case 'scrollTo':
        offset = offset || {offsetTop: 0};
        this.options.to = offset.offsetTop;
        this.options.duration = this.model.options.duration;
        if(this.model.options.callback){
          this.scroller.scrollTo(this.options, this.callback.bind(this));
        }else{
          this.scroller.scrollTo(this.options, this.callbackRoute(this.viewName));
        }
        break;
      case 'scrollToElement':
        this.options.to = offset;
        this.options.duration = this.model.options.duration;
        if(this.model.options.callback){
          this.scroller.scrollToElement(this.options, this.callback.bind(this));
        }else{
          this.scroller.scrollToElement(this.options, this.callbackRoute(this.viewName));
        }
      break;
      case 'scrollTop':
        this.options.duration = this.model.options.duration;
        if(this.model.options.callback){
          this.scroller.scrollTop(this.options, this.callback.bind(this));
        }else{
          this.scroller.scrollTop(this.options, this.callbackRoute(this.viewName));
        }
        break;
      case 'scrollBottom':
        this.options.duration = this.model.options.duration;
        if(this.model.options.callback){
          this.scroller.scrollBottom(this.options, this.callback.bind(this));
        }else{
          this.scroller.scrollBottom(this.options, this.callbackRoute(this.viewName));
        }
        break;
      case 'scrollEqual':
        offset = offset || {offsetTop: 0};
        this.options.to = offset.offsetTop;
        this.options.velocity = this.model.options.velocity;
        if(this.model.options.callback){
          this.scroller.scrollEqual(this.options, this.callback.bind(this));
        }else{
          this.scroller.scrollEqual(this.options, this.callbackRoute(this.viewName));
        }
        break;
      default:
        if(this.model.options.callback){
          this.scroller.scrollTo(this.options, this.callback.bind(this));
        }else{
          this.scroller.scrollTo(this.options, this.callbackRoute(this.viewName));
        }        
        break;
    }
  },

  resize: function(w,h) {

  },

  animateIn: function() {

  },

  animateOut: function() {

  },

  destroy: function() {

    this.dom.parentNode.removeChild(this.dom);
  }
};

module.exports = ScrollButton;