//META{"name":"dateViewer"}*//
//Inspired by Jiik's "Digital Clock" plugin

class dateViewer {
	constructor() {};
	
	start() {
		BdApi.clearCSS("clock-stylesheet");
		BdApi.injectCSS("clock-stylesheet", `#clock-container, #clock-text {box-sizing: border-box}
		#clock-container {align-items: center; background: #2f3136; bottom: 0; display: flex; height: 95px; justify-content: center; position: absolute; text-align: center; width: 100%; z-index: 10}
		#clock-container::after {background: #3b3d42; content: ""; height: 1px; position: absolute; top: 0; width: 200px}
		#clock-days {bottom: 15px; position: absolute; text-transform: uppercase}
		#clock-day {bottom: 20px; font-size: 14px; font-weight: bold; position: absolute; text-transform: uppercase}
		#clock-text {font-size: 1em; font-weight: bold; margin-top: -25px}

		.channel-members-wrap .scrollerWrap-2uBjct {height: calc(100% - 95px)}`);

		var self = this;
		var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

		//append elements
		this.clock_container = $("<div/>", {id: "clock-container"});
		$(".channel-members-wrap").append(this.clock_container);

		this.clock_text = $("<div/>", {id: "clock-text"});
		$("#clock-container").append(this.clock_text);
		$("#clock-container").append($("<div/>", {id: "clock-day"}));

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

			$("#clock-day").html(days[now.getDay()]);

			self.clock_text.html(`${[h, m, s].join(":")} ${session}<br><span style="font-size: 14px; opacity: .4">${[y, mt, d].join("-")}</span>`);
		}

		this.update();
		this.repeat = setInterval(this.update, 1000);
	};

	stop() {
		BdApi.clearCSS("clock-stylesheet");
		clearInterval(this.repeat);
		this.clock_container.remove();
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
		return "hammy"
	};
};