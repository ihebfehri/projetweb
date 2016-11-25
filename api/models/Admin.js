/**
 * Admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	connection: 'MysqlVoteBox',
	tableName: sails.config.votebox.dbprefix + 'Admins',
	attributes: {
		id: {
		    type: 'int',
		    primaryKey: true,
		    required: false
		},
		email: {
		    type: 'string',
		    required: true
		},
		password: {
		    type: 'string',
		    required: true
		}
	}
};