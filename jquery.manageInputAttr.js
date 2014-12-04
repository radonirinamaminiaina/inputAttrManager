/**
 * jquery.manageForm.js
 * The MIT License (MIT)
 *
 * How to use?
 * When the user sets focus on field we remove its value or placeholder attributes
 * Then we he's out of the field (blur) we reset fields value or placeholder attributes
 *
 * version 0.2
 * @author Radonirina <radonirina.ranaivonjanahary@netapsys.fr>
 *
 * Tue December 4th, 2014 10:23 (Version 0.1)
 * Tue December 4th, 2014 15:53 (Version 0.2)
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function($) {
    /**
     *
     * @param el {Object} jQuery object
     * @param o  {Object} option
     * @constructor
     */
    var ManageInputAttr = function( el, o ) {
        this.el = $(el);
        var base = this;
        var defaultOption = {
            inputAttr: 'value' // {String} value or placeholder
        }
        // Extend option property
        var options = $.extend({}, defaultOption, o);
        /**
         * init
         * @access {publice}
         */
        this.initForm = function() {
            var placeHolderArr = [];
            var getLengthEl = this.el.length;
            var _valFocus = this.el.attr(options.inputAttr);
            for ( var i = 0; i < getLengthEl; i++ ) {
                if ( placeHolderArr.length < getLengthEl ) {
                    placeHolderArr.push(_valFocus);
                }
                if ( options.inputAttr == 'value' ) {
                    whenAttrValue(this.el, placeHolderArr[i]);
                    keyupEvent(this.el);
                }
                focusEvent(this.el);
                blurEvent(this.el, placeHolderArr[i]);
            }
        }

        /**
         * When attr is value
         * @param el {Object}
         * @access {private}
         */
        var keyupEvent = function(el) {
            el.keyup(
                function() {
                    var _val = $(this).val();
                    if ( _val == '' ) {
                        $(this).blur(
                            function() {
                                var thatVal = $(this).val();
                                var placeHolderVal = el.data('placeholder');
                                if ( thatVal !=  placeHolderVal && thatVal != '') {
                                    $(this).val(thatVal);
                                } else {
                                    $(this).val(placeHolderVal)
                                }
                            }
                        );
                        $(this).focus(
                            function() {
                                if ( $(this).val() == el.data('placeholder') ) {
                                    $(this).val('');
                                }
                            }
                        );
                    } else {
                        focusEvent(el);
                        blurEvent(el, el.data('placeholder'));
                    }
                }
            );
        }
        /**
         * When focus in the field
         * @param el
         * @access {private}
         */
        var focusEvent = function(el) {
            el.focus(
                function() {
                    var that = $(this);
                    that.attr(options.inputAttr, '');
                }
            );
        }

        /**
         * When focus out (blur) from the field
         * @param el  {Object}
         * @param val {String}
         * @access {private}
         */
        var blurEvent = function(el, val) {
            el.blur(
                function() {
                    var that = $(this)
                    that.attr(options.inputAttr, val);
                }
            );
        }
        /**
         * whenAttrValue
         * @param el {object}
         * @param val {string}
         * @access {private}
         */
        var whenAttrValue = function (el, val) {
            el.data('placeholder', val);
        }
    }
    /**
     * Create the prototype of the plugin
     * @param o {Object} option
     * @returns {*}
     */
    $.fn.manageInput = function(o) {
        return this.each(
            function() {
                var manageInput = new ManageInputAttr(this, o);
                manageInput.initForm();
            }
        );
    }
})(jQuery);
