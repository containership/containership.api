'use strict';

const _ = require('lodash');

module.exports = {
    // get variable
    get(req, res, next) {
        const core = req.core;
        return core.cluster.myriad.persistence.get([core.constants.myriad.USER_VARIABLES_PREFIX, req.params.variable].join(core.constants.myriad.DELIMITER), (err, value) => {
            if(err && err.name == core.constants.myriad.ENOKEY) {
                res.stash.code = 404;
            } else if(err) {
                res.stash.code = 500;
            } else {
                res.stash = {
                    code: 200,
                    body: value
                };
            }

            return next();
        });
    },

    // create variable
    create(req, res, next) {
        const core = req.core;
        if(!_.has(req.body, 'value')) {
            res.stash = {
                code: 400,
                body: {
                    error: 'Missing \'value\' field!'
                }
            };

            return next();
        }

        const variable_key = _.toUpper(req.params.variable);
        const myriad_key = [core.constants.myriad.USER_VARIABLES_PREFIX, variable_key].join(core.constants.myriad.DELIMITER);
        return core.cluster.myriad.persistence.set(myriad_key, req.body.value, { if_not_exists: true }, (err) => {
            if(err) {
                res.stash = {
                    code: 400,
                    body: {
                        error: 'Variable already exists!'
                    }
                };

                return next();
            }

            res.stash.code = 201;
            return next();
        });
    },

    // update variable
    update(req, res, next) {
        const core = req.core;
        if(!_.has(req.body, 'value')) {
            res.stash = {
                code: 400,
                body: {
                    error: 'Missing \'value\' field!'
                }
            };

            return next();
        }

        return core.cluster.myriad.persistence.get([core.constants.myriad.USER_VARIABLES_PREFIX, req.params.variable].join(core.constants.myriad.DELIMITER), (err/*, value*/) => {
            if(err && err.name == core.constants.myriad.ENOKEY) {
                res.stash.code = 404;
                return next();
            } else if(err) {
                res.stash.code = 500;
                return next();
            }

            return core.cluster.myriad.persistence.set([core.constants.myriad.USER_VARIABLES_PREFIX, req.params.variable].join(core.constants.myriad.DELIMITER), req.body.value, (err) => {
                if(err) {
                    res.stash.code = 500;
                } else {
                    res.stash.code = 200;
                }
                return next();
            });

        });
    },

    // delete variable
    delete(req, res, next) {
        const core = req.core;
        return core.cluster.myriad.persistence.delete([core.constants.myriad.USER_VARIABLES_PREFIX, req.params.variable].join(core.constants.myriad.DELIMITER), (err/*, value*/) => {
            if(err && err.name == core.constants.myriad.ENOKEY) {
                res.stash.code = 404;
            } else if(err) {
                res.stash.code = 500;
            } else {
                res.stash.code = 204;
            }
            return next();
        });
    }
};
