/*
 *  Injection factories
 */

// #region dependents

var fs = require('fs');
var path = require('path');
var _ = require('underscore');

// #region exports

/*
 *  Factories for inject modules.
 *  Types: single - injected file or directory as one module;
 *         all - if file injected by single strategy and directory - injected recursively all files.
 */
module.exports = {
    "single": injectSingleModule,
    "all": injectFolderModules
};

// #region private methods

// todo: add checking if file name contains 'index'. Then directory inject as single module;
function injectSingleModule(p, tree, aggregateOn) {
    var key = path.basename(p, path.extname(p));

    var module = require(p);

    var options = { identifier: key, aggregateOn: aggregateOn };
    _.isFunction(module)
        ? tree.register(key, module, options)
        : tree.constant(key, module);
}

function injectFolderModules(p, tree, aggregateOn) {
    var stat = getPathStat(p);

    var internalInjectionFactory = stat.isDirectory() ? injectFilesFrom : injectSingleModule;

    internalInjectionFactory(p, tree, aggregateOn);
}

function injectFilesFrom(p, tree, aggregateOn) {
    var files = fs.readdirSync(p);
    _.each(files, function (file) {
        var filePath = path.join(p, file);
        injectFolderModules(filePath, tree, aggregateOn);
    });
}

function getPathStat(p) {
    try {
        return fs.statSync(p);
    }
    catch (err) {
        throw new Error('File or directory ' + p + ' could not be found! Check your "map.json" file. \n' + err.stack);
    }
}