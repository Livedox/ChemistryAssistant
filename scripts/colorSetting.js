"use strict";

var colorSetting = {
  type: "",
  classes: [],
  class: "soluble",
  property: "background",
  setActiveProperty: function setActiveProperty(cls, property) {
    this.element.classList.toggle("active");
    this.class = cls ? cls : "s";
    this.property = property ? property : "background";
    this.element = document.querySelector("." + this.class + ".color-li-" + this.property);
    this.element.classList.toggle("active");
  },
  changeColorsElements: function changeColorsElements(color) {
    var localColor = localStorage.getItem(this.class);
    localColor = localColor ? JSON.parse(localColor) : {};
    localColor[this.property] = color;
    localStorage.setItem(this.class, JSON.stringify(localColor));
    this.element.style[this.property] = color;

    if (this.type === "m") {
      colorSetting._setColorMenTable(this.class, this.property, color);
    } else {
      colorSetting._setColorSolTable(this.class, this.property, color);
    }
  },
  toDefaultColors: function toDefaultColors() {
    if (this.type === "m") {
      localStorage.setItem("s", "{\"background\":\"#fe83b5\",\"color\":\"#000\"}");
      localStorage.setItem("p", "{\"background\":\"#ffd737\",\"color\":\"#000\"}");
      localStorage.setItem("d", "{\"background\":\"#5ca7e0\",\"color\":\"#000\"}");
      localStorage.setItem("f-top", "{\"background\":\"#90cd8e\",\"color\":\"#000\"}");
      localStorage.setItem("f-bottom", "{\"background\":\"#78bd62\",\"color\":\"#000\"}");
    } else {
      localStorage.setItem("soluble", "{\"background\":\"#fe83b5\",\"color\":\"#000\"}");
      localStorage.setItem("insoluble", "{\"background\":\"#90cd8e\",\"color\":\"#000\"}");
      localStorage.setItem("slightlySoluble", "{\"background\":\"#5ca7e0\",\"color\":\"#000\"}");
      localStorage.setItem("decomposes", "{\"background\":\"#90cd8e\",\"color\":\"#000\"}");
      localStorage.setItem("header-cell", "{\"background\":\"#2d3436\",\"color\":\"#dfe6e9\"}");
    }

    this.init();
  },
  init: function init(type) {
    if (this.type === "") {
      this.type = type.toLowerCase();

      if (this.type === "m") {
        this.classes = ["s", "p", "d", "f-top", "f-bottom"];
        this.class = "s";
      } else {
        this.classes = ["soluble", "insoluble", "slightlySoluble", "decomposes", "header-cell"];
        this.class = "soluble";
      }

      this.element = document.querySelector("." + this.class + ".color-li-" + this.property);
    }

    this.classes.forEach(function (cls) {
      var localColor = localStorage.getItem(cls);

      if (localColor !== null) {
        localColor = JSON.parse(localColor);
        ["background", "color"].forEach(function (property) {
          var color = localColor[property];

          if (color) {
            document.querySelector("." + cls + ".color-li-" + property).style[property] = color;

            if (this.type === "m") {
              colorSetting._setColorMenTable(cls, property, color);
            } else {
              colorSetting._setColorSolTable(cls, property, color);
            }
          }
        });
      }
    });
  },
  _setColorSolTable: function _setColorSolTable(cls, property, color) {
    var els = document.querySelectorAll("." + cls);

    for (var i = 0; i < els.length; i++) {
      if (els[i].classList.contains(cls) && i - 1) {
        els[i].style[property] = color;
      }
    }
  },
  _setColorMenTable: function _setColorMenTable(cls, property, color) {
    if (app.legend.el.cls.split(" ").indexOf(cls) + 1) {
      app.legend.el.st[property] = color;
    }

    app.table.forEach(function (item, i) {
      if (app.table[i].cls === cls) {
        if (color) app.table[i].st[property] = color;
      }
    });
  }
};