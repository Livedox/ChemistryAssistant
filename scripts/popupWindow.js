let modal = {
	create: function(text) {
		let div = document.createElement("div");
		div.className = "modal-window";
		div.insertAdjacentHTML("afterbegin", `
			<div class="close-modal-window" onclick="this.parentNode.remove()">
				<svg enable-background="new 0 0 413.348 413.348" height="10px" viewBox="0 0 413.348 413.348" width="10px">
					<path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354
					 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"/>
				</svg>
			</div>
			<div class="content-modal-window"><div>${text}</div></div>
		`);
		div.addEventListener("mousedown", this.move);
		document.body.prepend(div);
	},
	move: function(e) {
		let element = e.currentTarget;
		let shiftX = e.clientX - element.getBoundingClientRect().left;
		let shiftY = e.clientY - element.getBoundingClientRect().top;

		moveAt(e.pageX, e.pageY);

		function moveAt(pageX, pageY) {
			if(pageX - shiftX < 0) {
				element.style.left = "0px";
			} else if (pageX - shiftX + element.offsetWidth + 30 > document.documentElement.clientWidth) {
				element.style.left = document.documentElement.clientWidth - element.offsetWidth + "px";
			} else {
				element.style.left = pageX - shiftX + "px";
			}

			if(pageY - shiftY < 0) {
				element.style.top = "0px"
			} else if(pageY - shiftY + element.offsetHeight > document.documentElement.offsetHeight) {
				element.style.top = document.documentElement.offsetHeight - element.offsetHeight + "px"
			} else {
				element.style.top = pageY - shiftY + "px"
			}
			
		}

		function onMouseMove(e) {
			moveAt(e.pageX, e.pageY);
		}

		document.addEventListener('mousemove', onMouseMove);

		element.onmouseup = function() {
			document.removeEventListener('mousemove', onMouseMove);
			element.onmouseup = null;
		}
	}
}