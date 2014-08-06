var assert = require('chai').assert,
    p = require('../');

describe('Basic', function () {
    it('Single parameter returns templating function', function () {
        var t = p('proto://{username}:pwd@{sub}.domain.tld');
        assert.isFunction(t);
        assert.lengthOf(t, 1);

        // Fill the tempalte
        var d = t({username: '123', sub: '456'});
        assert.isObject(d);
        assert.propertyVal(d, 'auth', '123:pwd');
        assert.propertyVal(d, 'host', '456.domain.tld');
        assert.propertyVal(d, 'hostname', '456.domain.tld');
        assert.propertyVal(d, 'href', 'proto://123:pwd@456.domain.tld');
        assert.propertyVal(d, 'password', 'pwd');
        assert.propertyVal(d, 'protocol', 'proto:');
        assert.propertyVal(d, 'slashes', true);
        assert.propertyVal(d, 'username', '123');
    });
    
    it('Two parameters invokes it directly', function () {
        var d = p(
            'proto://{username}:pwd@{sub}.domain.tld',
            {username: '123', sub: '456'}
        );

        assert.isObject(d);
        assert.propertyVal(d, 'auth', '123:pwd');
        assert.propertyVal(d, 'host', '456.domain.tld');
        assert.propertyVal(d, 'hostname', '456.domain.tld');
        assert.propertyVal(d, 'href', 'proto://123:pwd@456.domain.tld');
        assert.propertyVal(d, 'password', 'pwd');
        assert.propertyVal(d, 'protocol', 'proto:');
        assert.propertyVal(d, 'slashes', true);
        assert.propertyVal(d, 'username', '123');
    });
});

describe('Colons in usernames', function () {
    var tpl = p('proto://{u}:{p}@domain.tld/foobar/');
    it('Can handle : in username', function () {
        var out = tpl({u: 'user:name', p: 'pwd'});
        assert.propertyVal(out, 'auth', 'user:name:pwd');
        assert.propertyVal(out, 'username', 'user:name');
        assert.propertyVal(out, 'password', 'pwd');
    });

    it('Can handle : in password', function () {
        var out = tpl({u: 'u', p: 'pass:word'});
        assert.propertyVal(out, 'auth', 'u:pass:word');
        assert.propertyVal(out, 'username', 'u');
        assert.propertyVal(out, 'password', 'pass:word');
    });

    it('Can handle : in username & password', function () {
        var out = tpl({u: 'user:name', p: 'pass:word'});
        assert.propertyVal(out, 'auth', 'user:name:pass:word');
        assert.propertyVal(out, 'username', 'user:name');
        assert.propertyVal(out, 'password', 'pass:word');
    });
});

describe('does not touch the non-atomic parts of the parsed url', function () {
    var tpl = p('http://foo.com/{?url}');
    it('leaves chars encoded by url-template alone in href', function () {
        var out = tpl({url: 'http://bar.com/?quux=baz&blah=blerg'});
        assert.propertyVal(out, 'href', 'http://foo.com/?url=http%3A%2F%2Fbar.com%2F%3Fquux%3Dbaz%26blah%3Dblerg');
    });
});
