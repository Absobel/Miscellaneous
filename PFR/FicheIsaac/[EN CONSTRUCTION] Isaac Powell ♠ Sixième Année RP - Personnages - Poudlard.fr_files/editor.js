"use strict";

// BBcode editor

function bbcode(textarea_id, left, right) {
  const textarea = document.getElementById(textarea_id);
  if (document.selection) {
    textarea.focus();
    document.selection.createRange().text = left
      + document.selection.createRange().text + right;

  } else if (textarea.selectionStart || textarea.selectionStart == '0') {
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    textarea.value = textarea.value.substring(0, start)
                   + left + textarea.value.substring(start, end) + right
                   + textarea.value.substring(end, textarea.value.length);
    textarea.focus({ preventScroll: true });
    textarea.selectionStart = start + left.length;
    textarea.selectionEnd = end + left.length;
  }
}


const bbcodebutton = document.getElementsByClassName("bbcode-js");
Array.from(bbcodebutton).forEach(function(element) {
  element.addEventListener('click', function(event) {
    event.preventDefault();
    bbcode(this.getAttribute("data-textarea"),
           this.getAttribute("data-left"),
           this.getAttribute("data-right"));
    return false;
  });
});


// Color palette

document.getElementById('palette').addEventListener('input', function(event) {
  document.getElementById('color-button').setAttribute('data-left','[color='+this.value+']');
  document.getElementById('color-button').style.color = this.value;
  document.getElementById('palette-selector').style.color = this.value;
});


// Links

document.getElementById('bbcode-link').addEventListener('click', function(event) {
  var url = prompt(this.getAttribute('data-prompt'), 'https://');
  bbcode(this.getAttribute('data-textarea'), '[url=' + url + ']', '[/url]');
});


// Ul lists

document.getElementById('bbcode-ul').addEventListener('click', function(event) {
  var line = prompt(this.getAttribute('data-prompt'), '1');
  line = parseInt(line);
  var stars = '';
  for(var i = 0; i < line - 1; i++) stars += '[*] \n';
  bbcode(this.getAttribute('data-textarea'), '[list]\n[*] ', '\n' + stars + '[/list]')
});


// Ol lists

document.getElementById('bbcode-ol').addEventListener('click', function(event) {
  var line = prompt(this.getAttribute('data-prompt'), '1');
  line = parseInt(line);
  var stars = '';
  for(var i = 0; i < line - 1; i++) stars += '[*] \n';
  bbcode(this.getAttribute('data-textarea'), '[list=1]\n[*] ', '\n' + stars + '[/list]')
});


// Tables

document.getElementById('bbcode-table').addEventListener('click', function(event) {
  var line = prompt(this.getAttribute('data-prompt-line'), '1');
  var column = prompt(this.getAttribute('data-prompt-column'), '1');
  column = parseInt(column);
  line = parseInt(line);
  var td = '';
  for(var i = 0; i < column; i++) {
    td += '[td][/td]\n';
  }
  var tr = '';
  for(var i = 0; i < line; i++) {
    tr += '[tr]\n' + td + '[/tr]\n';
  }
  bbcode(this.getAttribute('data-textarea'), '', '[table]\n' + tr + '[/table]')
});


// Dices

const bbcodedice = document.getElementById('bbcode-dice');
if ( bbcodedice ) {
  bbcodedice.addEventListener('click', function(event) {
    var dice = prompt(this.getAttribute('data-prompt'), '1');
    var result = '';
    for(var i = 0; i < parseInt(dice); i++) {
      result += '[dice]' + (Math.floor(Math.random() * 6) + 1) + '[/dice]';
    }
    bbcode(this.getAttribute('data-textarea'), result + ' ', '')
  });
}

// Alert before leave

(() => {
const modified_inputs = new Set;
const defaultValue = "defaultValue";
addEventListener("beforeinput", (evt) => {
    const target = evt.target;
    if (!(defaultValue in target || defaultValue in target.dataset)) {
        target.dataset[defaultValue] = ("" + (target.value || target.textContent)).trim();
    }
});

addEventListener("input", (evt) => {
    const target = evt.target;

    if (target.getAttribute("type") == "radio" ||
        target.getAttribute("type") == "checkbox") {
      return;
    }

    let original;
    if (defaultValue in target) {
        original = target[defaultValue];
    } else {
        original = target.dataset[defaultValue];
    }
    if (original !== ("" + (target.value || target.textContent)).trim()) {
        if (!modified_inputs.has(target)) {
            modified_inputs.add(target);
        }
    } else if (modified_inputs.has(target)) {
        modified_inputs.delete(target);
    }
});

addEventListener("submit", (evt) => {
    modified_inputs.clear();
});

addEventListener("beforeunload", (evt) => {
    if (modified_inputs.size) {
        const unsaved_changes_warning = "Changes you made may not be saved.";
        evt.returnValue = unsaved_changes_warning;
        return unsaved_changes_warning;
    }
});
})();

