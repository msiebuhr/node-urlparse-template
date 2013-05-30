var ut = require('url-template'),
    parse = require('url').parse;

module.exports = function (template, directData) {
    var t = ut.parse(template);
    function fillTemplate(data) {
        var res = parse(t.expand(data));
        if (res.auth) {
            var authParts = res.auth.split(':');
            if (authParts.length >= 2) {
                res.username = authParts.shift();
                res.password = authParts.join(':');
            }
        }
        return res;
    }

    // Two arguments? Then the secon is some data we should apply
    if (arguments.length === 2) {
        return fillTemplate(directData);
    } else {
        return fillTemplate;
    }
};
