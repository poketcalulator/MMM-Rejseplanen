'use strict';

 /* Magic Mirror
 * Module: MMM-Rejseplanen
 * By John Kristensen
 *
 * MIT Licensed.
 */
const NodeHelper = require('node_helper');
var request = require('request');
var moment = require('moment');

module.exports = NodeHelper.create({

	start: function() {
		this.started = false;
		this.config = null;
	},

	getData: function() {
		var self = this;
		var myUrl = this.config.apiBase + "?id=" + this.config.stationID + this.config.vehicletype + "&format=json";
		request({
			url: myUrl,
			method: 'GET'
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				self.sendSocketNotification("DATA", body);
			}
		});

		setTimeout(function() { self.getData(); }, this.config.refreshInterval);
	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === 'CONFIG' && self.started == false) {
			self.config = payload;
			self.sendSocketNotification("STARTED", true);
			self.getData();
			self.started = true;
		}
	}
});
