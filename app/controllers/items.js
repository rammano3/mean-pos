/**
 * Module dependencies .
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Item = mongoose.model('Item'),
    logp = require('consolelogpretty'),
    _ = require('underscore');

/**
 * Find item by id
 */
exports.item = function(req, res, next, id) {
    Item.load(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load item ' + id));
        req.item = item;
        next();
    });
};

/**
 * Create an item
 */
exports.create = function(req, res) {
    var item = new Item(req.body);
    //item.category = req.category;
    item.save(function(err) {
        //logp.log('itemsave-err',err);
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                item: item
            });
        } else {
            console.log('create success?');
            res.jsonp(item);
        }
    });
};

/**
 * Update an item
 */
exports.update = function(req, res) {
    var item = req.item;

    item = _.extend(item, req.body);

    item.save(function(err) {
        res.jsonp(item);
    });
};

/**
 * Delete an item
 */
exports.destroy = function(req, res) {
    var item = req.item;

    item.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(item);
        }
    });
};

/**
 * Show an item
 */
exports.show = function(req, res) {
    res.jsonp(req.item);
};

/**
 * List of Items
 */
exports.all = function(req, res) {
    Item.find().sort('-created').exec(function(err, items) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(items);
        }
    });
};
