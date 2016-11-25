/**
 * VotesController
 *
 * @description :: Server-side logic for managing votes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) { // req et res, 2 objets identifient l'utilisateur
    	var voteid = Number(req.param('voteid')); // on recupere la valeur dans l'url

		Votes.findOne({id: voteid}).exec(function (err, results) { // requete sql
			if (err) return res.view("500");
			else {
				if(results) {
					if(results.endTime > new Date().getTime() / 1000)
						return res.view("vote", {voteid: voteid, name: results.name, endtime: results.endTime});
					else
						res.redirect("/viewer/" + voteid);
				}
				else {
					return res.view("404");
				}
			}
		});
  	},
  	postSendvote: function (req, res) {
  		var voteid = Number(req.param('voteid'));
    	var status = Number(req.param('status'));

    	if(!voteid || !status) {
    		return res.json(500, "Params error");
    	}
    	else {
    		if(req.session.voteid == voteid && req.session.time < new Date().getTime()) {
    			sails.log.info("[VOTEBOX] Un utilisateur vient d'essayer de revoter, en vain.");
    			return res.json(200, "Vous avez déjà voté.");
    		}
    		else {
    			Users.create({status: status, voteid: voteid}).exec(function (err, results) {
					if (err) return res.json(500, "Internal server error 500");
					else {
						Votes.findOne({id: voteid}).exec(function (err, results) {
							if (err) return res.json(500, "Internal server error");
							else {
								if(results) {
									sails.log.info("[VOTEBOX] Un utilisateur vient de voter!")
									req.session.voteid = voteid
									req.session.time = results.endTime;
									sails.sockets.broadcast(voteid, "newvote");
									return res.json(200, "OK");
								}
								else
									return res.json(500, "Internal server error");
							}
						});
					}
				});
    		}
		}
  	}
};