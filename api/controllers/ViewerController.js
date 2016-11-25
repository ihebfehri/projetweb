/**
 * ViewerController
 *
 * @description :: Server-side logic for managing votes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
    	var voteid = Number(req.param('voteid'));
    	
    	if(isNaN(voteid))
    		return res.view("403");

		Votes.findOne({id: voteid}).exec(function (err, results) {
			if (err) return res.view("500");
			else {
				if(results) {
					req.session.viewer = voteid;
					return res.view("viewer", {voteid: voteid, name: results.name, endtime: results.endTime});
				}
				else
					return res.view("404");
			}
		});
  	},
  	getData: function (req, res) {
  		var vote_yes;
  		var vote_false;

    	Users.find({voteid: req.session.viewer}).exec(function (err, results) {
			if (err) return res.json(500, "Internal Server Error");
			else {
				return res.json(200, results);
			}
		});
  	},
  	postRoom: function (req, res) {
    	sails.sockets.join(req.socket, req.session.viewer);
    	return res.json(200);
  	}
};