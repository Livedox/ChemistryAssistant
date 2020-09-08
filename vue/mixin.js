const mixinAlert = {
	data: function () {
		return {
			alert: {
				active: false,
				component: "alert-text",
				text: "",
				class: "left",
				coords: {
					top: 0,
					left: 0
				}
			}
		}
	},
	methods: {
		showAlert: function(e, component, text) {
			e.target.onmouseout = function() {
				app.alert.active = false;
			};
			this.alert.active = true;
			let coords = e.target.getBoundingClientRect();
			const ALERT_WIDTH = 400;
			this.alert.component = component ? component : "alert-text";
			this.alert.text = text ? text : "";
			
			this.alert.coords.top = coords.top - 7 + "px";

			if (coords.left + coords.width + ALERT_WIDTH + 4 < document.documentElement.clientWidth) {
				this.alert.class = "right";
				this.alert.coords.left = coords.left + coords.width + 4 + "px";
			} else {
				this.alert.class = "left";
				this.alert.coords.left = coords.left - coords.width - ALERT_WIDTH - 30 + "px";
			}
		}
	}
}

const mixinModal = {
	data: function() {
		return {
			modal: {
				active: true,
				component: "",
				text: "<p>123456</p>",
				coords: {
					top: 0,
					left: 0
				}
			}
		}
	},
	methods: {
		moveModal: function(e) {
			let element = e.currentTarget;
			let shiftX = e.clientX - element.getBoundingClientRect().left;
			let shiftY = e.clientY - element.getBoundingClientRect().top;
			document.body.style.userSelect = "none";

			moveAt(e.pageX, e.pageY);

			function moveAt(pageX, pageY) {
				if(pageX - shiftX < 0) {
					app.modal.coords.left = "0px";
				} else if (pageX - shiftX + element.offsetWidth + 30 > document.documentElement.clientWidth) {
					app.modal.coords.left = document.documentElement.clientWidth - element.offsetWidth + "px";
				} else {
					app.modal.coords.left = pageX - shiftX + "px";
				}

				if(pageY - shiftY < 0) {
					app.modal.coords.top = "0px"
				} else if(pageY - shiftY + element.offsetHeight > document.documentElement.offsetHeight) {
					app.modal.coords.top = document.documentElement.offsetHeight - element.offsetHeight + "px"
				} else {
					app.modal.coords.top = pageY - shiftY + "px"
				}
				
			}

			function onMouseMove(e) {
				moveAt(e.pageX, e.pageY);
			}

			document.addEventListener('mousemove', onMouseMove);

			window.onmouseup = function() {
				document.body.style.userSelect = "auto";
				document.removeEventListener('mousemove', onMouseMove);
				element.onmouseup = null;
			}
		}
	}
}