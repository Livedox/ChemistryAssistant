let colorSetting = {
	type: "",
	classes: [],
	class: "soluble",
	property: "background",
	setActiveProperty: function(cls, property) {
		this.element.classList.toggle("active");
		this.class = cls ? cls : "s";
		this.property = property ? property : "background";
		this.element = document.querySelector("."+this.class+".color-li-"+this.property);
		this.element.classList.toggle("active");
	},
	changeColorsElements: function(color) {
		let localColor = localStorage.getItem(this.class);
		localColor = localColor ? JSON.parse(localColor) : {};
		localColor[this.property] = color;
		localStorage.setItem(this.class, JSON.stringify(localColor));

		this.element.style[this.property] = color;
		if(this.type === "m") {
			colorSetting._setColorMenTable(this.class, this.property, color);
		} else {
			colorSetting._setColorSolTable(this.class, this.property, color);
		}
	},
	toDefaultColors: function() {
		if(this.type === "m") {
			localStorage.setItem("s", "{\"background\":\"#fe83b5\",\"color\":\"#000\"}");
			localStorage.setItem("p", "{\"background\":\"#ffd737\",\"color\":\"#000\"}");
			localStorage.setItem("d", "{\"background\":\"#5ca7e0\",\"color\":\"#000\"}");
			localStorage.setItem("f-top", "{\"background\":\"#90cd8e\",\"color\":\"#000\"}");
			localStorage.setItem("f-bottom", "{\"background\":\"#78bd62\",\"color\":\"#000\"}");
		} else {
			localStorage.setItem("soluble", "{\"background\":\"#fe83b5\",\"color\":\"#000\"}");
			localStorage.setItem("insoluble", "{\"background\":\"#ffd737\",\"color\":\"#000\"}");
			localStorage.setItem("slightlySoluble", "{\"background\":\"#5ca7e0\",\"color\":\"#000\"}");
			localStorage.setItem("decomposes", "{\"background\":\"#90cd8e\",\"color\":\"#000\"}");
		}
		
		this.init();
	},
	init: function(type) {
		if(this.type === "") {
			this.type = type.toLowerCase();
			if(this.type === "m") {
				this.classes = ["s", "p", "d", "f-top", "f-bottom"];
				this.class = "s";
			} else {
				this.classes = ["soluble", "insoluble", "slightlySoluble", "decomposes"];
				this.class = "soluble";
			}
			this.element = document.querySelector("."+this.class+".color-li-"+this.property);
		}

		this.classes.forEach(function(cls) {
			let localColor = localStorage.getItem(cls);
			if(localColor !== null) {
				localColor = JSON.parse(localColor);
				["background", "color"].forEach(function(property) {
					let color = localColor[property];
					if(color) {
						document.querySelector("."+cls+".color-li-"+property).style[property] = color;
						if(this.type === "m") {
							colorSetting._setColorMenTable(cls, property, color);
						} else {
							colorSetting._setColorSolTable(cls, property, color);
						}
					}
					
										
				});
			}
		});	
	},
	_setColorSolTable: function(cls, property, color) {
		let els = document.querySelectorAll("." + cls);
		for(let i = 0; i < els.length; i++) {
			if(els[i].classList.contains(cls) && i - 1) {
				els[i].style[property] = color;
			}
		}
	},
	_setColorMenTable: function(cls, property, color) {
		if(app.legend.el.cls.split(" ").indexOf(cls) + 1) {
			app.legend.el.st[property] = color;			
		}
		app.table.forEach(function(item, i) {
			if(app.table[i].cls === cls) {
				if(color) app.table[i].st[property] = color;
			}
		});
	}
}