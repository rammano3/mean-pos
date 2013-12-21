/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Item Schema
 */
var ItemSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required : true,
        default: ''
    },
    category: {
        type: String,
        required : true,
        default: ''
    },
    //categories: [{ category: String, type: String }],
    price : {
        type : Number,
        required : true,
        validate : [
            function(v) { return v >= 0; },
            'Price must be positive']
    },
    quantity : {
        type : Number,
        required : true,
        validate : [
            function(v) { return v >= 0; },
            'Quantity must be positive']
    },
    create_user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    last_edit: {
        type: Date,
        default: Date.now
    }
});

/**
 * Validations
 */
ItemSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */

ItemSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};

mongoose.model('Item', ItemSchema);