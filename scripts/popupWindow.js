function mousedownModal(e) {
	let modal = e.currentTarget;
	let shiftX = e.clientX - modal.getBoundingClientRect().left;
	let shiftY = e.clientY - modal.getBoundingClientRect().top;

	moveAt(e.pageX, e.pageY);

	function moveAt(pageX, pageY) {
		if(pageX - shiftX < 0) {
			modal.style.left = "0px";
		} else if (pageX - shiftX + modal.offsetWidth + 30 > document.documentElement.clientWidth) {
			modal.style.left = document.documentElement.clientWidth - modal.offsetWidth + "px";
		} else {
			modal.style.left = pageX - shiftX + "px";
		}

		if(pageY - shiftY < 0) {
			modal.style.top = "0px"
		} else if(pageY - shiftY + modal.offsetHeight > document.documentElement.offsetHeight) {
			modal.style.top = document.documentElement.offsetHeight - modal.offsetHeight + "px"
		} else {
			modal.style.top = pageY - shiftY + "px"
		}
		
	}

	function onMouseMove(e) {
		moveAt(e.pageX, e.pageY);
	}

	document.addEventListener('mousemove', onMouseMove);

	modal.onmouseup = function() {
		document.removeEventListener('mousemove', onMouseMove);
		modal.onmouseup = null;
	}
}