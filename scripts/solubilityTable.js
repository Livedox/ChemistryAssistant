"use strict";

function highlightColumnAndRow(e) {
  var row = e.target.classList[0];
  var cell = e.target.classList[1];
  var cellIndex = e.target.cellIndex;
  var rowIndex = e.target.parentNode.rowIndex - 1;

  for (var i = 0; i < document.getElementsByClassName(row).length && i < cellIndex; i++) {
    document.getElementsByClassName(row)[i].classList.toggle("highlighted");
  }

  for (var _i = 0; _i < document.getElementsByClassName(cell).length && _i < rowIndex; _i++) {
    document.getElementsByClassName(cell)[_i].classList.toggle("highlighted");
  }

  e.target.classList.toggle("active");
}