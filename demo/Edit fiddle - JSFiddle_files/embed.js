(function() {
  var Embed, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Utils = (function() {
    function Utils() {}

    Utils.prototype.eachElement = function(array, callback, scope) {
      var i, results;
      if (scope == null) {
        scope = this;
      }
      i = 0;
      results = [];
      while (i < array.length) {
        callback.call(scope, array[i], i);
        results.push(i++);
      }
      return results;
    };

    Utils.prototype.pushMessage = function(name, value) {
      if (value == null) {
        value = {};
      }
      return window.parent.postMessage([name, value], "*");
    };

    Utils.prototype.addEvent = function(element, event, fn, useCapture) {
      if (useCapture == null) {
        useCapture = false;
      }
      return element.addEventListener(event, fn, useCapture);
    };

    Utils.prototype.setStyles = function(element, styles) {
      var key, results;
      results = [];
      for (key in styles) {
        results.push(element.style[key] = styles[key]);
      }
      return results;
    };

    return Utils;

  })();

  Embed = (function(superClass) {
    extend(Embed, superClass);

    function Embed() {
      this.switchTab = bind(this.switchTab, this);
      this.loadResult = bind(this.loadResult, this);
      this.repositionHighlight = bind(this.repositionHighlight, this);
      this.setHeight = bind(this.setHeight, this);
      this.setupEvents = bind(this.setupEvents, this);
      this.setupDefaults = bind(this.setupDefaults, this);
      this.elements = {
        tabs: document.querySelectorAll("#tabs .tCont"),
        actions: document.querySelectorAll("#actions a"),
        hl: document.querySelector(".hl"),
        pre: document.querySelectorAll("pre")
      };
      this.setupDefaults();
    }

    Embed.prototype.setupDefaults = function() {
      this.setupEvents();
      this.eachElement(this.elements.pre, function(element) {
        return hljs.highlightBlock(element);
      });
      this.repositionHighlight(this.elements.actions[0], false);
      return this.setHeight(this.elements.tabs[0]);
    };

    Embed.prototype.setupEvents = function() {
      this.eachElement(this.elements.actions, (function(_this) {
        return function(action, index) {
          return action.addEventListener("click", function(event) {
            return _this.switchTab(event, action, index);
          });
        };
      })(this));
      if (this.elements.actions[0].dataset.triggerType === "result") {
        return this.loadResult();
      }
    };

    Embed.prototype.setHeight = function(element) {
      var activeTab, height;
      activeTab = element.getBoundingClientRect();
      height = activeTab.height;
      return this.pushMessage("embed", {
        slug: slug,
        height: height
      });
    };

    Embed.prototype.predender = function() {
      var head, prefetch, prerender;
      head = document.getElementsByTagName("head")[0];
      prefetch = document.createElement("link");
      prefetch.setAttribute("rel", "prefetch");
      prefetch.setAttribute("href", show_src);
      head.appendChild(prefetch);
      prerender = document.createElement("link");
      prerender.setAttribute("rel", "prerender");
      prerender.setAttribute("href", show_src);
      return head.appendChild(prerender);
    };

    Embed.prototype.repositionHighlight = function(action, animated) {
      var position;
      if (animated == null) {
        animated = true;
      }
      position = action.getBoundingClientRect();
      if (animated) {
        this.elements.hl.classList.add("animated");
      }
      return this.setStyles(this.elements.hl, {
        left: position.left + "px",
        width: position.width + "px"
      });
    };

    Embed.prototype.loadResult = function(callback) {
      var iframes, resultCont, resultsFrame;
      iframes = document.querySelectorAll("#result iframe");
      resultsFrame = document.createElement("iframe");
      resultCont = document.querySelector("#result");
      this.eachElement(iframes, function(iframe) {
        return iframe.parentNode.removeChild(iframe);
      });
      resultsFrame.src = show_src;
      resultsFrame.allowtransparency = true;
      resultsFrame.allowfullscreen = true;
      resultsFrame.frameBorder = "0";
      resultsFrame.sandbox = "allow-modals allow-forms allow-scripts allow-same-origin allow-popups";
      resultCont.appendChild(resultsFrame);
      if (callback) {
        return resultsFrame.addEventListener("load", (function(_this) {
          return function() {
            return callback.apply([_this]);
          };
        })(this));
      }
    };

    Embed.prototype.switchTab = function(event, action, index) {
      var actionParent;
      event.preventDefault();
      event.stopPropagation();
      this.repositionHighlight(action);
      actionParent = action.parentElement.parentElement.querySelectorAll("li");
      this.eachElement(this.elements.tabs, function(element) {
        return element.classList.remove("active");
      });
      this.elements.tabs[index].classList.add("active");
      if (actionParent) {
        this.eachElement(actionParent, function(element) {
          return element.classList.remove("active");
        });
        action.parentElement.classList.add("active");
      }
      this.setHeight(this.elements.tabs[index]);
      if (action.dataset.triggerType === "result") {
        return this.loadResult();
      }
    };

    return Embed;

  })(Utils);

  window.addEventListener("DOMContentLoaded", function(event) {
    return this.EmbedManager = new Embed;
  });

}).call(this);
