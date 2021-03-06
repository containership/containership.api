'use strict';

const _ = require('lodash');
const async = require('async');

module.exports = {
    // get all variables
    get(req, res, next) {
        const core = req.core;

        const get_variable_by_type = (variable_type, callback) => {
            const vars = {};

            return core.cluster.myriad.persistence.keys(variable_type, (err, variables) => {
                if(err) {
                    return callback(err);
                }

                return async.each(variables, (variable_name, callback) => {
                    return core.cluster.myriad.persistence.get(variable_name, (err, value) => {
                        if(err) {
                            return callback(err);
                        }
                        variable_name = _.last(variable_name.split(core.constants.myriad.DELIMITER));
                        vars[variable_name] = value;

                        return callback();
                    });
                }, (err) => {
                    if(err) {
                        return callback(err);
                    }

                    return callback(null, vars);
                });
            });
        };

        return async.parallel({
            user: (callback) => {
                return get_variable_by_type(core.constants.myriad.USER_VARIABLES, callback);
            },
            autogenerated: (callback) => {
                return get_variable_by_type(core.constants.myriad.AUTOGENERATED_VARIABLES, callback);
            }
        }, (err, all_variables) => {
            if(err) {
                res.stash.code = 500;
                return next();
            }

            res.stash.code = 200;
            res.stash.body = all_variables;
            return next();
        });
    }
};
