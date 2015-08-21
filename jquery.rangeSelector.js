/*!
 * rangeSelector beta version
 * https://github.com/mouts/jquery.rangeSelector
 * 
 * Released under the MIT license
 */
(function($)
{
    $.rangeSelector = function(element, options) {

        var defaults = {
                getInstance: false,
                filterItems: false,
                selectedClass: 'selected',
                onSelectionStart: function(element) { return true; },
                onSelectionChange: function(selection) { return true; },
                onSelectionEnd: function(selection) { return true; },
                onSelectionSet: function(selection) { return true; },
                onCancelSelection: function() { return true; }
            }

        var instance = this;

        instance.settings           = {},
        instance.container          = $(element),
        instance.items              = null,
        instance.selectionRunning   = false,
        instance.selectionStarting  = false,
        instance.selectionEnding    = false

        instance.init = function(options) {
            instance.settings = $.extend(defaults, options);

            if (instance.settings.filterItems) {
                instance.items = instance.container.find(instance.settings.filterItems);

            } else {
                instance.items = instance.container.children();
            }

            instance.items
                        .click(function(event) {
                            if (instance.selectionRunning) {
                                endSelection($(this));
                                
                            } else {
                                startSelection($(this));
                            }
                        })
                        .mouseover(function() {
                            if (instance.selectionRunning) {
                                changeSelection($(this));
                            }
                        });

            return instance;
        }

        instance.getOptions = function() {
            return instance.settings;
        }

        instance.setOptions = function(options) {
            return instance.init(options);
        }

        instance.getSelection = function() {
            var startIndex  = instance.items.index(instance.selectionStarting),
                endIndex    = instance.items.index(instance.selectionEnding);

            if (startIndex > endIndex) {
                startIndex = endIndex;
                endIndex = instance.items.index(instance.selectionStarting);
            }

            return instance.items
                    .removeClass(instance.settings.selectedClass)
                    .slice(startIndex, endIndex+1)
                    .addClass(instance.settings.selectedClass);
        }

        instance.setSelection = function(starting, ending) {
            instance.selectionStarting    = starting;
            instance.selectionEnding      = ending;
            instance.selectionRunning     = false;

            instance.settings.onSelectionSet(instance.getSelection());
        }

        instance.cancelSelection = function() {
            instance.selectionStarting      = false;
            instance.selectionEnding        = false;
            instance.selectionRunning       = false;

            instance.items.removeClass(instance.settings.selectedClass);
            instance.settings.onCancelSelection();
        }

        var startSelection  = function(element) {
            instance.items.removeClass(instance.settings.selectedClass);
            instance.selectionRunning     = true;
            instance.selectionStarting    = element;
            instance.selectionEnding      = false;

            instance.settings.onSelectionStart(instance.selectionStarting);
        }
        
        var changeSelection = function(element) {
            instance.selectionEnding      = element;
            
            instance.settings.onSelectionChange(instance.getSelection());
        }
        
        var endSelection = function(element) {
            instance.selectionRunning     = false;
            instance.selectionEnding      = element;
           
            instance.settings.onSelectionEnd(instance.getSelection());
        }

        instance.init(options);
    }

    $.fn.rangeSelector = function(options) {

        this.each(function() {
            if (undefined == $(this).data('rangeSelector')) {
                var instance = new $.rangeSelector(this, options);
                $(this).data('rangeSelector', instance);
            }
        });

        if (this.length==1) {
            instance = this.data('rangeSelector');
            return (instance.settings.getInstance) ? instance : this;
        }

        return this;
    }
})(jQuery);