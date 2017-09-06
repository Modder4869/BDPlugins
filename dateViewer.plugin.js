//META{"name":"dateViewer"}*//
//inspired by Jiik's "Digital Clock" plugin

class dateViewer {
	constructor() {};
	
	start() {
		BdApi.clearCSS("dv-stylesheet");
		BdApi.injectCSS("dv-stylesheet", `#dv-container {align-items: center; background: #2f3136; bottom: 0; box-sizing: border-box; display: flex; height: 95px; justify-content: center; position: absolute; text-align: center; width: 100%; z-index: 10}
		#dv-container::after {background: #3b3d42; content: ""; height: 1px; position: absolute; top: 0; width: 200px}
		#dv-day {bottom: 20px; font-size: 14px; font-weight: bold; position: absolute; text-transform: uppercase}
		#dv-display {font-size: 1em; font-weight: bold; margin-top: -25px}
		.channel-members-wrap .scrollerWrap-2uBjct {height: calc(100% - 95px)}`);

		var self = this;
		var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

		//append elements
		$(".channel-members-wrap").append($("<div/>", {id: "dv-container"}).append($("<div/>", {id: "dv-display"}), $("<div/>", {id: "dv-day"})));

		//functionality
		this.check = function(n) {
			return n < 10 ? "0" + n : n;
		};

		this.update = function() {
			let now = new Date(), h = self.check(now.getHours()), m = self.check(now.getMinutes()), s = self.check(now.getSeconds());
			let y = now.getFullYear(), mt = self.check(now.getMonth() + 1), d = self.check(now.getDate());
			let session = h > 11 ? "PM" : "AM";

			if(h > 12) {h -= 12}
			else if(h == 0) {h = 12}

			$("#dv-day").html(days[now.getDay()]);
			$("#dv-display").html(`${[h, m, s].join(":")} ${session}<br><span style="font-size: 14px; opacity: .4">${[y, mt, d].join("-")}</span>`);
		}

		this.update();
		this.repeat = setInterval(this.update, 1000);
	};

	stop() {
		BdApi.clearCSS("dv-stylesheet");
		clearInterval(this.repeat);
		$("#dv-container").remove();
	};

	load() {};

	unload() {};

	onMessage() {};

	onSwitch() {};

	observer(e) {};

	getSettingsPanel() {return ""};

	getName() {
		return "Date Viewer";
	};

	getDescription() {
		return "Implements a container on your right side with digital clock (12-hour system), current date and day of the week."
	};

	getVersion() {
		return "0.1.0";
	};

	getAuthor() {
		return "hammy";
	};
};
