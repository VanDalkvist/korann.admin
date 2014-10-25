function init() {
    return {
        "task": "grunt-injector",
        "name": "injector",
        "config": {
            "options": {
                template: 'public/views/shared/layout.jade',
                "starttag": "// injector:{{ext}}",
                "endtag": "// endinjector",
                transform: function (filename) {
                    return 'script(src="' + filename + '")';
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