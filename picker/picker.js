var picker = {
	V: 100,
	S: 100,
	status: false,

	init: function(callback) {
		var id_elements = {
			primary: "primary_block",
			circle: "circle",
			line: "line"
		}

		/*
		Параметры передаваемые через обьект "s" обьекту "Line"
		h - высота линни Hue
		w- ширина линни Hue
		th  - id для елмента в котором находяться стрелки || ползунок для управление шкалой Hue
		blockPicker - id блока главного блока с изображение и изменяемым фоном
		*/
		Line.init(callback); //отрисовка линий hue и привязка событий

		var b = {
			block: id_elements.block,
			circle: id_elements.circle
		}
		/*
		Параметры передаваемые через обьект "b" обьекту "Block"
		id - id блока выбора цвета (основной блок)
		c - круг для перемещения по основнoму блоку(для выбора цвета)
		*/
		Block.init(b); // привязка событий к блоку и кругу для управления

	}
}

var Line = {

	Hue: 0,

	init: function(callback) {

		var canvaLine, arrows, pst, blockPicker, t = 0;;

		canvaLine = Line.create(180, 20, "line", "cLine");

		arrows = document.getElementById("arrows");
		blockPicker = document.getElementById("block-picker");

		Line.posit = function(e) {
			var top, rgb;

			top = mouse.pageY(e) - pst;
			top = (top < 0) ? 0 : top;
			top = (top > 180) ? 180 : top;

			arrows.style.top = top - 2 + "px";
			t = Math.round(top / (180 / 360));
			t = Math.abs(t - 360);
			t = (t == 360) ? 0 : t;

			Line.Hue = t;

			blockPicker.style.backgroundColor = "rgb("+convert.hsv_rgb(t,100,100)+")";
			callback("rgb("+convert.hsv_rgb(t,100,100)+")");
		}
		// события перемещения по линии
		arrows.onmousedown = function() {
			pst = Obj.positY(canvaLine);

			document.onmousemove = function(e) {
				Line.posit(e);
			}
		}

		arrows.onclick = Line.posit;

		canvaLine.onclick = function(e) {
			Line.posit(e)
		};

		canvaLine.onmousedown = function() {

			pst = Obj.positY(canvaLine);

			document.onmousemove = function(e) {
				Line.posit(e);
			}
		}
		document.onmouseup = function() {
			document.onmousemove = null;
			arrows.onmousemove = null;

		}
	},


	create: function(height, width, line, cN) {
		var canvas = document.createElement("canvas");

		canvas.width = width;
		canvas.height = height;

		canvas.className = cN;

		document.getElementById(line).appendChild(canvas);

		Line.grd(canvas, height, width);

		return canvas;
	},

	grd: function(canva, h, w) {
		var gradient, hue, color, canva, gradient1;

		canva = canva.getContext("2d");

		gradient = canva.createLinearGradient(w / 2, h, w / 2, 0);

		hue = [
			[255, 0, 0],
			[255, 255, 0],
			[0, 255, 0],
			[0, 255, 255],
			[0, 0, 255],
			[255, 0, 255],
			[255, 0, 0]
		];

		for (var i = 0; i <= 6; i++) {
			color = 'rgb(' + hue[i][0] + ',' + hue[i][1] + ',' + hue[i][2] + ')';
			gradient.addColorStop(i * 1 / 6, color);

		}
		canva.fillStyle = gradient;
		canva.fillRect(0, 0, w, h);
	}
}

var Block = {

	init: function(elem) {

		var circle = document.getElementById("circle"),
			block = document.getElementById("block-picker"),
			cW = circle.offsetWidth,
			cH = circle.offsetHeight,
			bWi = block.offsetWidth - cW,
			bHe = block.offsetHeight - cH,
			pxY = bHe / 100,
			pxX = bWi / 100;

		Block.cPos = function(e) {

			var top, left, S, V;

			document.ondragstart = function() {
				return false;
			}

			document.body.onselectstart = function() {
				return false;
			}

			left = e.pageX - bPstX - cW / 2;
			left = (left < 0) ? 0 : left;
			left = (left > block.offsetWidth - circle.offsetWidth) ? block.offsetWidth - circle.offsetWidth : left;

			circle.style.left = left + "px";

			S = Math.ceil(left / ((block.offsetWidth - circle.offsetWidth) / 100));

			top = e.pageY - bPstY - cH / 2;
			top = (top > block.offsetHeight - circle.offsetHeight) ? block.offsetHeight - circle.offsetHeight : top;

			top = (top < 0) ? 0 : top;

			circle.style.top = top + "px";

			V = Math.ceil(Math.abs(top / ((block.offsetHeight - circle.offsetHeight) / 100) - 100));

			if (V < 50) circle.style.borderColor = "#fff";
			else circle.style.borderColor = "#000";

			picker.S = S;

			picker.V = V;
		}

		block.onclick = function(e) {
			Block.cPos(e);
		}

		block.onmousedown = function() {
			document.onmousemove = function(e) {
				bPstX = Obj.positX(block);
				bPstY = Obj.positY(block);
				Block.cPos(e);
			}
		}

		document.onmouseup = function() {
			document.onmousemove = null;
		}
	}

}

var convert = {

	hsv_rgb: function(H, S, V) {

		var f, p, q, t, lH;

		S /= 100;
		V /= 100;

		lH = Math.floor(H / 60);

		f = H / 60 - lH;
		p = V * (1 - S);
		q = V * (1 - S * f);
		t = V * (1 - (1 - f) * S);

		if (lH === 0)      { R = V; G = t; B = p; }
		else if (lH === 1) { R = q; G = V; B = p; }
		else if (lH === 2) { R = p; G = V; B = t; }
		else if (lH === 3) { R = p; G = q; B = V; }
		else if (lH === 4) { R = t; G = p; B = V; }
		else if (lH === 5) { R = V; G = p; B = q; } 

		return [parseInt(R * 255), parseInt(G * 255), parseInt(B * 255)];
	}

}