var path = require('path');

function init() {
    return {
        "task": "grunt-injector",
        "name": "injector",
        "config": {
            "options": {
                template: 'public/views/shared/layout.jade',
                starttag: "// injector:{{ext}}",
                endtag: "// endinjector",
                ignorePath: 'public',
                transform: function (filename) {
                    var ext = function (file) {
                        return path.extname(file).slice(1);
                    };
                    var e = ext(filename);
                    var fileTag = '';
                    if (e === 'css') {
                        fileTag = 'link(rel="stylesheet",href="';
                    } else if (e === 'js') {
                        fileTag = 'script(src="';
                    } else if (e === 'html') {
                        fileTag = 'link(rel="import", href="';
                    }
                    return fileTag + filename + '")';
                }
            },
            "local": {
                files: {
                    "public/views/shared/layout.jade": [
                        "<%= meta.dependencies.js %>",
                        "<%= meta.js %>startup/**/*.js",
                        "<%= meta.js %>app/**/*.js",
                        "<%= meta.dependencies.css %>",
                        "<%= meta.client %>css/*.css"
                    ]
                }
            }
        }
    };
}

module.exports = init();