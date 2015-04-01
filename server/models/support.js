'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
/**
* Message schema
*/
var MessageSchema = new Schema({
	user: {
		type: Schema.Types.Mixed
  	},
	created: {
	    	type: Date,
	    	default: Date.now
	},
	text: {
		type: String,
		required: true,
		trim: true
	},
	type:{
		type: String,
		enum: ['question', 'reply'],
		default: 'question'
	}
});

/**
* Support schema
*/
var SupportSchema = new Schema({
	user: {
    		type: Schema.ObjectId,
    		ref: 'User'
  	},
	created: {
    		type: Date,
    		default: Date.now
  	},
	status:{
		type: String,
		enum: ['open', 'closed'],
		default: 'open'
	},
	messages :[MessageSchema],
	updated: {
		type: Date,
    		default: Date.now	
	}	
});

/**
 * Validations
 */
MessageSchema.path('text').validate(function(text) {
  return !!text;
}, 'Title cannot be blank');

SupportSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'username email _id').exec(cb);
};

/**
* Create the model for users and expose it to our app
*/
mongoose.model('Support', SupportSchema);

mongoose.model('Message', MessageSchema);
