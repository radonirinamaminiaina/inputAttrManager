/**
 * jquery.prettyholder.js
 *
 * How to use?
 * When the user sets focus on field we remove its value or placeholder attributes
 * Then we he's out of the field (blur) we reset fields value or placeholder attributes
 *
 * version 0.2
 * @author Radonirina <radonirina.ranaivonjanahary@netapsys.fr>
 * Tue December 4th, 2014 10:23
 *
 * Edited: February 15th, 2016 17:16
 */
(function($) {
    /**
     *
     * @param el {Object} jQuery object
     * @param o  {Object} option
     * @constructor
     */
    var PrettyHolder = function( el, o ) {
        this.el = $(el);
        var defaultOption = {
            inputAttr: 'value' // {String} value or placeholder
        }
        var isAlreadyFocused = false;
        // Extend option property
        var options = $.extend({}, defaultOption, o);
        /**
         * init
         */
        this.init = function() {
            var placeHolderArr = [];
            var getLengthEl = this.el.length;
            this.el.focus(
                function() {
                    var that = $(this);

                    if(!isAlreadyFocused) {
                        for ( var i = 0; i < getLengthEl; i++ ) {
                            var _valFocus = that.eq(i).attr(options.inputAttr);
                            if ( placeHolderArr.length < 3 ) {
                                placeHolderArr.push(_valFocus);
                            }
                        }
                        isAlreadyFocused = true;
                        that.attr(options.inputAttr, '');
                    }
                }
            );
            this.el.blur(
                function() {
                    var that = $(this)
                    if(!that[0].value) {
                        for ( var i = 0; i < getLengthEl; i ++ ) {
                            that.eq(i).attr(options.inputAttr, placeHolderArr[i]);
                        }
                        isAlreadyFocused = false;
                    }
                }
            );
        }
    }
    /**
     * Create the prototype of the plugin
     * @param o {Object} option
     * @returns {*}
     */
    $.fn.prettyholder = function(o) {
        return this.each(
            function() {
                var prettyHolder = new PrettyHolder(this, o);
                prettyHolder.init();
            }
        );
    }
})(jQuery);
