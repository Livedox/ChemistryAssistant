function toggleAlert(e, text) {
	if(e.type === "mouseover") {
		let element = document.createElement("div");
		let coords = e.target.getBoundingClientRect();

		element.className = "alert";
		element.innerHTML = text;
		element.style.top = coords.top - 7 + "px";
		document.body.prepend(element);


		if (coords.left + coords.width + element.offsetWidth + 2 < document.documentElement.clientWidth) {
			element.classList.add("right");
			element.style.left = coords.left + coords.width + 2 + "px";
		} else {
			element.classList.add("left");
			element.style.right = document.documentElement.clientWidth - coords.right + coords.width + 2 + "px";
		}		
	} else if(e.type === "mouseout") {
		document.querySelector(".alert").remove();
		
	}
	

}