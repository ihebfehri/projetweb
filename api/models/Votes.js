/**
 * Votes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	connection: 'MysqlVoteBox',
	tableName: sails.config.votebox.dbprefix + 'Votes',
	attributes: {
		id: {
		    type: 'int',
		    primaryKey: true,
		    required: false
		},
		name: {
		    type: 'string',
		    required: true
		},
		endTime: {
		    type: 'int',
		    required: true
		}
	}
};

