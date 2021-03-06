var ut = require('url-template'),
    parse = require('./url').parse;

module.exports = function (template, directData) {
    var t = ut.parse(template);

    // Enrich the template with data, parse it and return output
    function fillTemplate(data) {
        // Fill the template and parse it.
        var res = parse(t.expand(data));

        // Special treatment for auth.
        if (res.auth) {
            var authParts = res.auth.split(':');
            if (authParts.length > 0) {
                res.username = authParts.shift();
                if (authParts.length > 0) {
                    res.password = authParts.join(':');
                }
            }
        }

        // URL-decode data (we use a fork of url.parse() that doesn't
        // URI-decode for us)
        Object.keys(res).forEach(function (k) {
            if (k !== 'href' && k !== 'path' && k !== 'pathname' && typeof res[k] === 'string') {
                res[k] = decodeURIComponent(res[k]);
            }
        });

        return res;
    }

    // Two arguments? Then the secon is some data we should apply
    if (arguments.length === 2) {
        return fillTemplate(directData);
    } else {
        return fillTemplate;
    }
};
