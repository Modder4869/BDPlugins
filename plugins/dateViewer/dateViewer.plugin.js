//META{"name":"dateViewer"}*//
//inspired by Jiiks's "Digital Clock" plugin

class dateViewer {
	constructor() {};
	
	start() {
		BdApi.clearCSS("dv-stylesheet");
		BdApi.injectCSS("dv-stylesheet", `#dv-container {background: #2f3136; bottom: 0; box-sizing: border-box; color: #fff; height: 95px; position: absolute; width: 100%; z-index: 10}
		#dv-container::after {background: #3b3d42; content: ""; height: 1px; position: absolute; top: 0; width: 200px}
		#dv-date {font-size: small; opacity: .4}
		#dv-display {font-size: 1em; line-height: 18px; text-align: center; text-transform: uppercase}
		.dv-flex {align-items: center; display: flex; justify-content: center}
		.dv-backdrop {background: #000; display: none; height: 100%; left: 0; opacity: .5; position: absolute; top: 0; width: 100%; z-index: 999}

		.channel-members-wrap .scrollerWrap-2uBjct {height: calc(100% - 95px)}
		.theme-light #dv-container {background: #fff; color: #000}
		.theme-light #dv-container::after {background: rgba(0, 0, 0, .1)}
		.theme-light #dv-date {opacity: .6}`);

		var self = this, days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

		//append elements
		$(".channel-members-wrap").append($("<div/>", {id: "dv-container", class: "dv-flex"}).append($("<div/>", {id: "dv-display"})));

		//functionality
		this.check = function(n) {
			return n < 10 ? "0" + n : n;
		};

		this.update = function() {
			let now = new Date(), h = self.check(now.getHours()), m = self.check(now.getMinutes()), s = self.check(now.getSeconds());
			let y = now.getFullYear(), mt = now.getMonth(), d = now.getDate();
			let session = h > 11 ? "PM" : "AM", end;

			if(d % 10 == 1 && d != 11) {end = "st"}
			else if(d % 10 == 2 && d != 12) {end = "nd"}
			else if(d % 10 == 3 && d != 13) {end = "rd"}
			else {end = "th"}

			if(h > 12) {h -= 12}
			else if(h == 0) {h = 12}

			$("#dv-display").html(`${[h, m, s].join(":")} ${session}<br><span id="dv-date">${[d, end].join("")} of ${months[mt]}, ${y}</span><br><span style="font-size: 14px">${days[now.getDay()]}</span>`);
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
		return "Implements a container on top of the member list with digital clock (12-hour system), current date and day of the week..."
	};

	getVersion() {
		return "0.1.1";
	};

	getAuthor() {
		return "hammy";
	};
};
