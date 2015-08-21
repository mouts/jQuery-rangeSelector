# jquery.rangeSelector
The jQuery rangeSelector plugin provides a simple way to make a range selection on DOM elements.

## Installation
Download the jquery.rangeSelector.js file and include it after the jQuery library.

```html
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="/path/to/jquery.rangeSelector.js"></script>
```

## Usage

### Basic usage

```html
<style>
    #selectable .selected { color: red; }
</style>
<ul id="selectable">  
    <li></li>
    <li></li>
    ...
</ul>
```

```js  
$('#selectable').rangeSelector();  
```

Click on the list items to make the range selection. By default, the class 'selected' is applied on each elements of the selection.

### Advanced usage

Configure the plugin for your needs :
* apply another class name on the selected elements
* define exactly which elements are selectable
* define callbacks on the selector events
* use directly the selector instance

```html
<ul id="selectable">  
    <li class="disabled">
        <span></span>
    </li>
    <li>
        <span></span>
    </li>
    ...
</ul>
```

```js  
var selector = $('#selectable').rangeSelector({
    getInstance: true,
    filterItems: 'li:not(.disabled) > span',
    selectedClass: 'checked',
    // using callback when a new selection starts
    onSelectionStart: function(element) { 
        console.log('selection started'); 
    },
});

// cancel the selection
selector.cancelSelection(); 

// set a new selection
selector.setSelection(selector.items.first(), selector.items.last());

// get selector options
var options = selector.getOptions();

// initialize the selector with new options
selector.setOptions(options);
```

### Default configuration

```js  
$('#selectable').rangeSelector({
    getInstance: false,
    filterItems: false,
    selectedClass: 'selected',
    onSelectionStart: function(element) { return true; },
    onSelectionChange: function(selection) { return true; },
    onSelectionEnd: function(selection) { return true; },
    onSelectionSet: function(selection) { return true; },
    onCancelSelection: function() { return true; }
});
```

## Licence
jQuery rangeSelector is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)