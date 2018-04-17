    (function (name, context, definition) {
        if (typeof define === 'function' && define.amd) {
            define(definition);
        }
        else if (typeof module !== 'undefined' && module.exports) {
            module.exports = definition();
        }
        else {
            context[name] = definition();
        }
    })('Tabs', this, function() {

        'use strict';

        /**
         * Tabs
         * @constructor
         * @param {HTMLElement} element
         */
        function Tabs(element) {
            var i, len;

            this.target = element;
            this.tabs = element.querySelectorAll('[data-behaviour=tab]');
            this.panels = [];

            for (i = 0, len = this.tabs.length; i < len; i++) {
                this.panels.push( document.getElementById(this.tabs[i].hash.replace('#', '')) );
            }

            if (this.selectedIndex === undefined) {
                this._init();
            }
        }

        /**
         * Init
         * @private
         */
        Tabs.prototype._init = function() {
            var i;
            var self = this;

            this.target.setAttribute('role', 'tablist');

            for (i = this.tabs.length - 1; i >= 0; i--) {
                var tab = this.tabs[i];
                var panel = this.panels[i];
                var preSelected = tab.className.match(/\bis-selected\b/);
                var selected = i === 0 || preSelected || window.location.hash.replace('#', '') == panel.id;

                tab.setAttribute('role', 'tab');
                tab.setAttribute('aria-selected', selected);
                tab.setAttribute('aria-controls', tab.hash.replace('#', ''));

                panel.setAttribute('role', 'tabpanel');

                if (selected) {
                    this.selectedIndex = i;

                    if (!preSelected) {
                        tab.className+= ' is-selected ';
                    }
                }
                else {
                    panel.style.display = 'none';
                }
            }

            this.clickHandler = function(e) {
                var target = e.srcElement || e.target;

                if (target.getAttribute('role') == 'tab') {

                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    else {
                        e.returnValue = false;
                    }

                    self.toggle(target);
                }
            };

            this.keyHandler = function(e) {
                switch(e.keyCode) {
                    case 37:
                        if (self.tabs[self.selectedIndex - 1]) {
                            self.toggle(self.tabs[self.selectedIndex - 1]);
                        }
                        break;

                    case 39:
                        if (self.tabs[self.selectedIndex + 1]) {
                            self.toggle(self.tabs[self.selectedIndex + 1]);
                        }
                        break;
                }
            };

            if (this.target.addEventListener) {
                this.target.addEventListener('click', this.clickHandler, false);
                this.target.addEventListener('keyup', this.keyHandler, false);
            }
            else {
                this.target.attachEvent('onclick', this.clickHandler);
                this.target.attachEvent('onclick', this.keyHandler);
            }

        };

        /**
         * Toggle
         * @param {HTMLElement} tab
         */
        Tabs.prototype.toggle = function(tab) {
            var i, len;
            var panel = document.getElementById(tab.hash.replace('#', ''));

            tab.focus();

            this.tabs[this.selectedIndex].className = this.tabs[this.selectedIndex].className.replace('is-selected', '');
            this.tabs[this.selectedIndex].setAttribute('aria-selected', false);

            this.panels[this.selectedIndex].style.display = 'none';

            tab.className+= ' is-selected ';
            tab.setAttribute('aria-selected', true);

            panel.style.display = '';

            // Find tab index
            for (i = 0, len = this.tabs.length; i < len; i++) {
                if (tab == this.tabs[i]) {
                    break;
                }
            }

            this.selectedIndex = i;
        };

        /**
         * Teardown
         */
        Tabs.prototype.teardown = function() {
            var i, len;

            this.target.removeAttribute('role');

            if (this.target.removeEventListener) {
                this.target.removeEventListener('click', this.clickHandler, false);
                this.target.removeEventListener('click', this.keyHandler, false);
            }
            else {
                // Presume legacy IE
                this.target.detachEvent('onclick', this.clickHandler);
                this.target.detachEvent('onclick', this.keyHandler);
            }

            for (i = 0, len = this.tabs.length; i < len; i++) {
                var tab = this.tabs[i];
                var panel = this.panels[i];

                tab.removeAttribute('role');
                tab.removeAttribute('aria-selected');
                tab.removeAttribute('aria-controls');

                panel.style.display = '';
                panel.removeAttribute('role');
            }

            delete this.selectedIndex;
        };

        return Tabs;

    });

    // You were going to wrap the above as an AMD/CommonJS module and load on demand, right?
    var instance = new Tabs( document.querySelector('[data-directive=tabs]') );