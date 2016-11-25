/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	connection: 'MysqlVoteBox',
	tableName: sails.config.votebox.dbprefix + 'Users',
	attributes: {
		id: {
		    type: 'int',
		    primaryKey: true,
		    required: false
		},
		status: {
		    type: 'int',
		    required: true
		},
		voteid: {
		    type: 'int',
		    required: true
		}
	}
};

