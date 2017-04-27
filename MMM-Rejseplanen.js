/* A DepartureBoard for Danish bus, train, ferry and more */

/* Magic Mirror
 * Module: MMM-Rejseplanen
 * By John Kristensen
 *
 * based on MMM-RNV By Stefan Krause
 * based on a Script from Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("MMM-Rejseplanen",{

  defaults: {
    units: config.units,
    animationSpeed: 1000,
    refreshInterval: 1000 * 60, //refresh every minute
    updateInterval: 1000 * 3600, //update every hour
    timeFormat: config.timeFormat,
    lang: config.language,
    destfilter: "",
    appendLocationNameToHeader: true,
    initialLoadDelay: 0, // 0 seconds delay
    retryDelay: 2500,
    apiBase: "http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard",
    stationID: "8600551",
    stationName: "",

    iconTable: {
			"IC": "fa fa-train",
			"LYN": "fa fa-train",
			"REG": "fa fa-train",
			"S": "fa fa-subway",
			"TOG": "fa fa-train",
			"BUS": "fa fa-bus",
			"EXB": "fa fa-bus",
			"NB": "fa fa-bus",
			"TB": "fa fa-bus",
			"F": "fa fa-ship",
			"M": "fa fa-subway"
		},
  },

  // Define required scripts.
  getScripts: function() {
    return ["moment.js", "font-awesome.css"];
  },

  getStyles: function() {
    return ['Rejseplanen.css'];
  },

  start: function() {
    Log.info('Starting module: ' + this.name);
    this.loaded = false;
    this.sendSocketNotification('CONFIG', this.config);
  },

  getDom: function() {
    var wrapper = document.createElement("div");

    if (this.config.stationID === "") {
      wrapper.innerHTML = "No Rejseplanen.dk <i>stationID</i> set in config file.";
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    if (!this.loaded) {
      wrapper.innerHTML = this.translate('LOADING');
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    if (!this.departures.length) {
      wrapper.innerHTML = "No data";
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    var table = document.createElement("table");
    table.id = "rptable";
    table.className = "small thin light";

    var row = document.createElement("tr");

    var timeHeader = document.createElement("th");
    timeHeader.innerHTML = "Afgang";
    timeHeader.className = "rpheader";
    row.appendChild(timeHeader);
    var lineHeader = document.createElement("th");
    lineHeader.innerHTML = "Spor";
    lineHeader.className = "rpheader";
    lineHeader.colSpan = 2;
    row.appendChild(lineHeader);
    var destinationHeader = document.createElement("th");
    destinationHeader.innerHTML = "Til";
    destinationHeader.className = "rpheader";
    row.appendChild(destinationHeader);
    table.appendChild(row);

    for (var i in this.departures) {
      var currentDeparture = this.departures[i];
      var row = document.createElement("tr");
      table.appendChild(row);

      var cellDeparture = document.createElement("td");
      cellDeparture.innerHTML = currentDeparture.time;
      cellDeparture.className = "timeinfo";
      if (currentDeparture.delay) {
        var start = moment.duration(currentDeparture.time, "HH:mm");
        var end = moment.duration(currentDeparture.delay, "HH:mm");
        var diff = end.subtract(start);
        var spanDelay = document.createElement("span");
        spanDelay.innerHTML = " +" + diff.minutes();
        spanDelay.className = "smll delay";
        cellDeparture.appendChild(spanDelay);
      }
      row.appendChild(cellDeparture);

      var cellTransport = document.createElement("td");
      cellTransport.className = "timeinfo";
      var symbolTransportation = document.createElement("span");
      symbolTransportation.className = this.config.iconTable[currentDeparture.transportation];
      cellTransport.appendChild(symbolTransportation);
      row.appendChild(cellTransport);

      var cellLine = document.createElement("td");
      if(currentDeparture.lineLabel){
        cellLine.innerHTML = currentDeparture.lineLabel;
      } else {
        cellLine.innerHTML = "";
      }
      cellLine.className = "lineinfo";
      row.appendChild(cellLine);

      var cellDirection = document.createElement("td");
      cellDirection.innerHTML = currentDeparture.direction;
      cellDirection.className = "destinationinfo";
      row.appendChild(cellDirection);
    }
    wrapper.appendChild(table);

    return wrapper;
  },

  // Override getHeader method.
getHeader: function() {
  if (this.config.appendLocationNameToHeader) {
    return "Rejseplanen.dk - " + this.config.stationName;
  }

  return this.data.header;
},

  processDepartures: function(data) {

    this.departures = [];

    for (var i in data.DepartureBoard.Departure) {
      var t = data.DepartureBoard.Departure[i];
      if (t.finalStop.includes(this.config.destfilter)) {

        this.departures.push({
          time: t.time,
          delay: t.rtTime,
          lineLabel: t.rtTrack,
          direction: t.finalStop,
          transportation: t.type,
          name: t.name

        });
      }
    }

    return;
  },

  socketNotificationReceived: function(notification, payload) {
        if (notification === "STARTED") {
        this.updateDom();
      }
      else if (notification === "DATA") {
        this.loaded = true;
        this.processDepartures(JSON.parse(payload));
        this.updateDom();
        }
  }

});
