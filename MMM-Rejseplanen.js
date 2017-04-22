/* A DepartureBoard for Danish bus, train, ferry and more */

/* Magic Mirror
 * Module: MMM-Rejseplanen
 * By John Kristensen
 *
 * The following is based on
 * MMM-swisstransport, By Benjamin Angst
 * based on a Script from Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("MMM-Rejseplanen",{

	// Define module defaults
	defaults: {
		maximumEntries: 10, // Total Maximum Entries
		updateInterval: 5 * 60 * 1000, // Update every 5 minutes.
		animationSpeed: 2000,
		fade: true,
		fadePoint: 0.25, // Start on 1/4th of the list.
                initialLoadDelay: 0, // start delay seconds.
								apiBase: "http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard",
                stationID: "8600551",

		titleReplace: {
			"Rejseplanen ": ""
		},
	},

	// Define required Styles.
	getStyles: function() {
		console.log("***** getStyles: function *****");
		return ["Rejseplanen.css", "font-awesome.css"];
	},

	// Define required scripts.
	getScripts: function() {
		console.log("***** getScripts: function *****");
		return ["moment.js"];
	},

	// Define start sequence.
	start: function() {
		console.log("***** start: function *****");


		Log.info("Starting module: " + this.name);

		// Set locale.
		moment.locale(config.language);

                this.trains = [];
		this.loaded = false;
		this.scheduleUpdate(this.config.initialLoadDelay);

		this.updateTimer = null;

	},

	// Override dom generator.
	getDom: function() {
		console.log("***** getDom: function *****");
		var wrapper = document.createElement("div");

		if (this.config.id === "") {
			wrapper.innerHTML = "Please set the correct Station ID: " + this.name + ".";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (!this.loaded) {

			wrapper.innerHTML = "Loading trains ...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		var table = document.createElement("table");
		table.className = "small";

		for (var t in this.trains) {
			var trains = this.trains[t];

			var row = document.createElement("tr");
			table.appendChild(row);

			var depCell = document.createElement("td");
			depCell.className = "departuretime";
			depCell.innerHTML = trains.departureTimestamp;
			row.appendChild(depCell);

                        if(trains.delay) {
                            var delayCell = document.createElement("td");
                            delayCell.className = "delay red";
                            delayCell.innerHTML = "+" + trains.delay + " min";
                            row.appendChild(delayCell);
                        } else {
                            var delayCell = document.createElement("td");
                            delayCell.className = "delay red";
                            delayCell.innerHTML = trains.delay;
                            row.appendChild(delayCell);
                        }

			var trainNameCell = document.createElement("td");
			trainNameCell.innerHTML = trains.name;
			trainNameCell.className = "align-right bright";
			row.appendChild(trainNameCell);

			var trainToCell = document.createElement("td");
			trainToCell.innerHTML = trains.to;
			trainToCell.className = "align-right trainto";
			row.appendChild(trainToCell);

			if (this.config.fade && this.config.fadePoint < 1) {
				if (this.config.fadePoint < 0) {
					this.config.fadePoint = 0;
				}
				var startingPoint = this.trains.length * this.config.fadePoint;
				var steps = this.trains.length - startingPoint;
				if (t >= startingPoint) {
					var currentStep = t - startingPoint;
					row.style.opacity = 1 - (1 / steps * currentStep);
				}
			}

		}

		return table;
	},

	/* UpdateTimetable(DepartureBoard)
	 * Requests new data from rejseplanen.dk.
	 * API documentation / https://p3.zdassets.com/hc/theme_assets/497496/200019391/ReST_documentation_Rejseplanen_Latest.pdf
	 * Calls processTrains on succesfull response.
	 */
	updateTimetable: function() {
		console.log("***** updateTimetable: function *****");
		var self = this;
		var retry = true;
		var currentDate = moment().format("DD.MM.YYYY"); // Can probably be removed
		var currentTime = moment().format("HH.mm");  // Can probably be removed
		// var url = this.config.apiBase + "?id=" + this.config.stationID + "&date=" + currentDate + "&time=" + currentTime + "&format=json";
		var url = this.config.apiBase + "?id=" + this.config.stationID + "&useBus=0&useTog=1&format=json";
		console.log(url);
		var trainRequest = new XMLHttpRequest();
		trainRequest.open("GET", url, true);
		trainRequest.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.processTrains(JSON.parse(this.response));
				} else if (this.status === 401) {
					self.config.id = "";
					self.updateDom(self.config.animationSpeed);

					Log.error(self.name + ": Incorrect waht so ever...");
					retry = false;
				} else {
					Log.error(self.name + ": Could not load trains.");
				}

				if (retry) {
					self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
				}
			}
		};
		trainRequest.send();
	},

	/* processTrains(data)
	 * Uses the received data to set the various values.
	 *
	 * argument data object - DepartureBoard information received form rejseplanen.dk.
	 */
	processTrains: function(data) {
		// console.log("***** processTrains: function *****");
		// console.log(data.DepartureBoard.Departure.length);

		this.trains = [];
		for (var i = 0, count = data.DepartureBoard.Departure.length; i < count; i++) {

			var trains = data.DepartureBoard.Departure[i];
if (trains.direction.includes("Oden")) {



			this.trains.push({

				departureTimestamp: trains.time,
				name: trains.name,
				to: trains.direction,
				delay: trains.rtTime
				// delay: moment(trains.rtTime).diff(trains.time, "minutes"),
				// departureTimestamp: moment(trains.stop.departureTimestamp * 1000).format("HH:mm"),



			});

			};
		}

		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
	},

	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update. If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		console.log("***** scheduleUpdate: function *****");
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		clearTimeout(this.updateTimer);
		this.updateTimer = setTimeout(function() {
			self.updateTimetable();
		}, nextLoad);
	},

});
