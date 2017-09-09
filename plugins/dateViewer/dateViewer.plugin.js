//META{"name":"dateViewer"}*//
//inspired by Jiiks's "Digital Clock" plugin

class dateViewer {
	constructor() {
		this.plugin_name = "dateViewer";
		this.stylesheet_name = "dv-stylesheet";

		this.stylesheet = `#dv-btn {background: transparent; border-radius: 4px; cursor: pointer; height: 28px; position: absolute; right: 25px; top: -33px; width: 28px}
		#dv-btn::after {background: transparent; border: 2px solid #fff; bottom: 7px; box-shadow: -4px -4px 0 #fff; box-sizing: border-box; content: ""; height: 10px; opacity: .6; position: absolute; right: 7px; width: 10px}
		#dv-btn:hover {background: rgba(24, 25, 28, .3)} #dv-btn:hover::after {opacity: 1}
		#dv-container {background: #2f3136; bottom: 0; box-sizing: border-box; color: #fff; height: 95px; position: absolute; width: 100%; z-index: 10}
		#dv-container::after {background: #3b3d42; content: ""; height: 1px; position: absolute; top: 0; width: 200px}
		#dv-date {font-size: small; opacity: .4}
		#dv-display {font-size: 1em; line-height: 18px; text-align: center; text-transform: uppercase}
		#dv-settings-panel {background: #2f3136; display: none}
		.dv-flash {animation: fade-out 2s linear; background: #fff; display: none; z-index: 10}
		.dv-flex {align-items: center; display: flex; justify-content: center}
		.dv-full {height: 100%; left: 0; position: absolute; top: 0; width: 100%}
		.dv-panel {font-size: small; text-transform: uppercase}
		.dv-panel input[type="radio"] {display: none}
		.dv-panel input[type="radio"] + label {cursor: pointer}
		.dv-panel input[type="radio"] + label span {background: #99aab5; border-radius: 50%; cursor: pointer; display: inline-block; height: 16px; margin: 0 5px 0 0; position: relative; transition: .15s; vertical-align: -4px; width: 16px}
		.dv-panel input[type="radio"] + label span::after {background: #fff; border-radius: 50%; content: ""; height: 8px; left: 4px; position: absolute; top: 4px; width: 8px}
		.dv-panel input[type="radio"]:checked + label span {background: #7289da}
		.dv-panel .dv-option {font-size: 12px}
		.dv-panel .dv-option:not(:last-child) {margin-bottom: 5px}
		.dv-panel .dv-title {border-bottom: 1px solid #3b3d42; color: #87909c; font-size: 12px; font-weight: bold; margin-bottom: 5px; padding-bottom: 3px}

		.bd-blue .dv-panel input[type="radio"]:checked + label span {background: #3a71c1}
		.bd-blue .theme-light #dv-btn::after {border: 2px solid #3a71c1; box-shadow: -4px -4px 0 #3a71c1}
		.bd-blue .theme-light .dv-panel .dv-title {color: #3a71c1}
		.channel-members-wrap .scrollerWrap-2uBjct {height: calc(100% - 95px)}
		.theme-light #dv-container, .theme-light #dv-settings-panel {background: #fff; color: #000}
		.theme-light #dv-container::after {background: rgba(0, 0, 0, .1)}
		.theme-light #dv-date {opacity: .6}
		.theme-light .dv-panel .dv-title {border-bottom: 1px solid rgba(0, 0, 0, .1); color: #7289da}
		.theme-light #dv-btn::after {border: 2px solid #7289da; box-shadow: -4px -4px 0 #7289da}
		.theme-light #dv-btn:hover {background: rgba(24, 25, 28, .2)}

		@-webkit-keyframes fade-out {from {opacity: 1} to {opacity: 0}}
		@keyframes fade-out {from {opacity: 1} to {opacity: 0}}`;

		this.settings_panel_markup = `<div class="dv-flex dv-full dv-panel">
			<div class="dv-options">
				<h3 class="dv-title">system type</h3>
				<div class="dv-option">
					<input type="radio" id="dv-r1" name="system-type">
					<label for="dv-r1"><span></span>12-hour</label>
				</div>
				<div class="dv-option">
					<input type="radio" id="dv-r2" name="system-type">
					<label for="dv-r2"><span></span>24-hour</label>
				</div>
			</div>
		</div>`;
	};
	
	start() {
		BdApi.clearCSS(this.stylesheet_name);
		BdApi.injectCSS(this.stylesheet_name, this.stylesheet);

		var self = this;

		//append elements
		this.onSwitch();

		//functionality
		this.toggle_settings_panel = function() {
			var shown = false;
			if(shown == false) {
				shown = true;
				$("#dv-settings-panel").fadeToggle(300);
			} else {
				shown = false;
				$("#dv-settings-panel").fadeToggle(300);
			}
		};

		this.enable_12 = function() {
			if(this.checked) {
				bdPluginStorage.set(self.plugin_name, "system_type", "12");
			}
		};

		this.enable_24 = function() {
			if(this.checked) {
				bdPluginStorage.set(self.plugin_name, "system_type", "24");
			}
		};

		$("#dv-btn").on(`click.${this.plugin_name}`, this.toggle_settings_panel);
		$("#dv-r1").on(`change.${this.plugin_name}`, this.enable_12);
		$("#dv-r2").on(`change.${this.plugin_name}`, this.enable_24);

		this.interval = setInterval(this.update, 1000);
	};

	stop() {
		BdApi.clearCSS(this.stylesheet_name);
		clearInterval(this.interval);

		$("#dv-btn").off(`click.${this.plugin_name}`, this.toggle_settings_panel);
		$("#dv-r1").off(`change.${this.plugin_name}`, this.enable_12);
		$("#dv-r2").off(`change.${this.plugin_name}`, this.enable_24);

		$("#dv-container").remove();
	};

	load() {};

	unload() {};

	onMessage() {};

	onSwitch() {
		$("#dv-container").remove();
		$(".channel-members-wrap").append($("<div/>", {id: "dv-container", class: "dv-flex"}).append($("<div/>", {id: "dv-display"}), $("<div/>", {id: "dv-btn", class: "dv-flex"}), $("<div/>", {id: "dv-settings-panel", class: "dv-flex dv-full"}), $("<div/>", {class: "dv-flash dv-full"})));
		$("#dv-settings-panel").html(this.settings_panel_markup);

		if(bdPluginStorage.get(this.plugin_name, "system_type") == "12") {$("#dv-r1").prop("checked", true)}
		else {$("#dv-r2").prop("checked", true)}

		$("#dv-btn").on(`click.${this.plugin_name}`, this.toggle_settings_panel);
		$("#dv-r1").on(`change.${this.plugin_name}`, this.enable_12);
		$("#dv-r2").on(`change.${this.plugin_name}`, this.enable_24);

		this.update = function() {
			this.day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
			this.month = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

			this.pad = function(n) {
				return n < 10 ? "0" + n : n;
			};

			let now = new Date(), h = now.getHours(), m = this.pad(now.getMinutes()), s = this.pad(now.getSeconds()), y = now.getFullYear(), mt = now.getMonth(), d = now.getDate(), session = h > 11 ? "PM" : "AM", end;

			if(d % 10 == 1 && d != 11) {end = "st"}
			else if(d % 10 == 2 && d != 12) {end = "nd"}
			else if(d % 10 == 3 && d != 13) {end = "rd"}
			else {end = "th"}

			if(m == "00" && s == "00") {
				$(".dv-flash").css("display", "block");
				setTimeout(function() {
					$(".dv-flash").css("display", "none")
				}, 2000);
			}

			if($("#dv-r1").is(":checked")) {
				if(h > 12) {h -= 12}
				else if(h == 0) {h = 12}
				h = h < 10 ? "0" + h : h;

				$("#dv-display").html(`${[h, m, s].join(":")} ${session}<br><span id="dv-date">${[d, end].join("")} of ${this.month[mt]}, ${y}</span><br><span style="font-size: 14px">${this.day[now.getDay()]}</span>`);
			} else if($("#dv-r2").is(":checked")) {
				h = h < 10 ? "0" + h : h;
				$("#dv-display").html(`${[h, m, s].join(":")}<br><span id="dv-date">${[d, end].join("")} of ${this.month[mt]}, ${y}</span><br><span style="font-size: 14px">${this.day[now.getDay()]}</span>`);
			}
		}

		this.update();
	};

	observer({addedNodes, removedNodes}) {
	    for(let node, i = 0; i < addedNodes.length; i++) {
	    	if(addedNodes[i].classList && addedNodes[i].classList.contains("channel-members-wrap")) return this.onSwitch();
	    }

	    for(let node, i = 0; i < removedNodes.length; i++) {
	    	if(removedNodes[i].id === "friends") return this.onSwitch();
	    }
	};

	getSettingsPanel() {return ""};

	getName() {
		return "Date Viewer";
	};

	getDescription() {
		return "Implements a container on top of the member list, that features digital clock (both 12-hour and 24-hour system), current date and day of the week..."
	};

	getVersion() {
		return "0.1.3";
	};

	getAuthor() {
		return "hammy";
	};
};
