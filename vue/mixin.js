let mixin = {
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
		toggleAlert: function(e, component, text) {
			if(e.type === "mouseover") {
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
			} else {
				this.alert.active = false;
			}

		}
	}
}