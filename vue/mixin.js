"use strict";

var mixinAlert = {
  data: function data() {
    return {
      alert: {
        active: false,
        component: "alert-text",
        text: "",
        class: "left"
      }
    };
  },
  methods: {
    showAlert: function showAlert(e, component, text) {
      e.target.onmouseout = function () {
        app.alert.active = false;
      };

      var alertElement = document.querySelector(".alert");
      this.alert.active = true;
      var coords = e.target.getBoundingClientRect();
      var ALERT_WIDTH;

      if (this.alert.component === "alert-text") {
        ALERT_WIDTH = 120;
      } else {
        ALERT_WIDTH = 400;
      }

      this.alert.component = component ? component : "alert-text";
      this.alert.text = text ? text : "";
      alertElement.style.top = coords.top - 7 + "px";

      if (coords.left + coords.width + ALERT_WIDTH + 4 < document.documentElement.clientWidth) {
        this.alert.class = "right";
        alertElement.style.left = coords.left + coords.width + 4 + "px";
      } else {
        this.alert.class = "left";

        if (ALERT_WIDTH === 120) {
          alertElement.style.left = coords.left - coords.width - ALERT_WIDTH + 30 + "px";
        } else {
          alertElement.style.left = coords.left - coords.width - ALERT_WIDTH - 30 + "px";
        }
      }
    }
  },
  computed: {
    alertClass: function alertClass() {
      if (this.alert.active) {
        return this.alert.class + " active";
      }

      return this.alert.class;
    }
  }
};
var mixinModal = {
  data: function data() {
    return {
      modal: {
        active: false,
        component: "modal-alkaline-earth",
        text: "",
        coords: {
          top: 0,
          left: 0
        }
      }
    };
  },
  methods: {
    moveModal: function moveModal(e) {
      var element = e.currentTarget;
      var shiftX = e.clientX - element.getBoundingClientRect().left;
      var shiftY = e.clientY - element.getBoundingClientRect().top;
      document.body.style.userSelect = "none";
      moveAt(e.pageX, e.pageY);

      function moveAt(pageX, pageY) {
        if (pageX - shiftX < 0) {
          app.modal.coords.left = "0px";
        } else if (pageX - shiftX + element.offsetWidth + 30 > document.documentElement.clientWidth) {
          app.modal.coords.left = document.documentElement.clientWidth - element.offsetWidth + "px";
        } else {
          app.modal.coords.left = pageX - shiftX + "px";
        }

        if (pageY - shiftY < 0) {
          app.modal.coords.top = "0px";
        } else if (pageY - shiftY + element.offsetHeight > document.documentElement.offsetHeight) {
          app.modal.coords.top = document.documentElement.offsetHeight - element.offsetHeight + "px";
        } else {
          app.modal.coords.top = pageY - shiftY + "px";
        }
      }

      function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      window.onmouseup = function () {
        document.body.style.userSelect = "auto";
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
      };
    },
    setModalData: function setModalData(component, text) {
      this.modal.active = true;
      this.modal.component = component ? component : "";
      this.modal.text = text ? text : "";
    }
  }
};