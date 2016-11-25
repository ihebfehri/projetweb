/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
		if(req.session.admin != 1)
			res.view("admin/login");
		else 
			res.view("admin/panel");
	},
	logIn: function(req, res) {
		var email = req.param('email');
		var password = req.param('password');

		var errors = [];

		if(!email)
			errors.push("Veuillez entrer une adresse e-mail");
		if(!password)
			errors.push("Veuillez entrer un mot de passe");

		if(errors[0])
			return res.json(403, errors);
		else {
			Admin.findOne({email: email, password: dataProcess.encryptPassword(password)}).exec(function (err, results) {
				if (err) return res.json("500", "Internal server error");
				else {
					if(results) {
						req.session.admin = 1;
						res.json(200, "Found")
					}
					else
						res.json(403, "Not found")
				}
			});
		}
	},
	addVote: function(req, res) {
		if(req.session.admin != 1)
			return res.json(403, "Forbidden");
		else {
			var errors = [];
			var name = req.param("name");
			var date = Number(req.param("date"));

			if(!name)
				errors.push("Veuillez entrer un nom de vote");

			if(isNaN(date))
				errors.push("Veuillez entrer une date valide");

			if(date < new Date().getTime() / 1000)
				errors.push("Veuillez entrer une date posterieur");

			if(errors.length)
				return res.json(403, errors);

			Votes.findOne({name: name}).exec(function (err, results) {
				if (err) return res.json(500, "Internal server error");
				else {
					if(results) {
						errors.push("Ce nom de vote est déjà utilisé");
						return res.json(403, errors);
					}
					else {
						Votes.create({name: name, endTime: date}).exec(function (err, created) {
							if (err) return res.json(500, "Internal server error");
							else {
								Votes.findOne({name: name}).exec(function (err, results) {
									if (err) return res.json(500, "Internal server error");
									else return res.json(200, {id: results.id});
								});
							}
						});
					}
				}
			});
		}
	},
	getVotes: function(req, res) {
		if(req.session.admin != 1)
			return res.json(403, "Forbidden");
		else {
			Votes.find({}).exec(function (err, results) {
				if (err) return res.json(500, "Internal server error");
				else return res.json(200, results);
			});
		}
	},
	deleteVote: function(req, res) {
		if(req.session.admin != 1)
			return res.json(403, "Forbidden");
		else {
			var id = Number(req.param("id"));

			if(isNaN(id))
				return res.json(500, "Param ID is not a number");

			Votes.findOne({id: id}).exec(function (err, results) {
				if (err) return res.json(500, "Internal server error");
				else {
					Votes.destroy({id:id}).exec(function (err) {
						if (err) return res.json(500, "Internal server error");
						else return res.json(200, {name: results.name, id: results.id});
					});
				}
			});
		}
	}
};

