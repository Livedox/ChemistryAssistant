let elem;
let createAlert = function(e) {
	let elemDirection = "right";
	if (e.type === "mouseover" && e.target.hasAttribute("data-textAlert")) {
		elem = document.createElement("div");
		elem.className = "alert";
		elem.innerHTML = e.target.getAttribute("data-textAlert");
		elem.style.top = e.target.getBoundingClientRect().top -7+ "px";
		document.body.prepend(elem);

		if (e.target.hasAttribute("data-classStyleAlert")) {
			elem.classList.add(e.target.getAttribute("data-classStyleAlert"));
		}

		elemDirection = "right";
		if (e.target.hasAttribute("data-directionAlert")) {
			elemDirection = e.target.getAttribute("data-directionAlert");
		}

		if (
			 e.target.getBoundingClientRect().left+
			 e.target.offsetWidth+
			 elem.offsetWidth + 2 <
			 document.documentElement.clientWidth
			 && elemDirection !== "left"
		) {
			elem.classList.add("right");
			elem.style.left = e.target.getBoundingClientRect().left+e.target.offsetWidth +2+ "px";
		} else {
			elem.classList.add("left");
			elem.style.right = document.documentElement.clientWidth-
				e.target.getBoundingClientRect().right + e.target.offsetWidth +2+ "px";
		}

	}


	if (e.type === "mouseout") {
		if (elem) elem.remove();
	}

}