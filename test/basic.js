var expect = require('unexpected'),
    p = require('../');

describe('Basic', function () {
    it('Single parameter returns templating function', function () {
        var t = p('proto://{username}:pwd@{sub}.domain.tld');
        expect(t, 'to be a function').and('to have arity', 1);

        // Fill the tempalte
        expect(t({username: '123', sub: '456'}), 'to satisfy', {
            auth: '123:pwd',
            host: '456.domain.tld',
            hostname: '456.domain.tld',
            href: 'proto://123:pwd@456.domain.tld',
            password: 'pwd',
            protocol: 'proto:',
            slashes: true,
            username: '123'
        });
    });

    it('Two parameters invokes it directly', function () {
        var d = p(
            'proto://{username}:pwd@{sub}.domain.tld',
            {username: '123', sub: '456'}
        );

        expect(d, 'to satisfy', {
            auth: '123:pwd',
            host: '456.domain.tld',
            hostname: '456.domain.tld',
            href: 'proto://123:pwd@456.domain.tld',
            password: 'pwd',
            protocol: 'proto:',
            slashes: true,
            username: '123'
        });
    });
});

it('should populate the username field even when there is no password', function () {
    expect(p('smtp://{username}@foo.com/', {username: 'theuser'}), 'to satisfy', {
        auth: 'theuser',
        username: 'theuser'
    });
});

it('should populate the password field with an empty string when there is a colon before the @', function () {
    expect(p('smtp://{username}:@foo.com/', {username: 'theuser'}), 'to satisfy', {
        auth: 'theuser:',
        username: 'theuser',
        password: ''
    });
});

describe('Colons in usernames', function () {
    var tpl = p('proto://{u}:{p}@domain.tld/foobar/');
    it('Can handle : in username', function () {
        expect(tpl({u: 'user:name', p: 'pwd'}), 'to satisfy', {
            auth: 'user:name:pwd',
            username: 'user:name',
            password: 'pwd'
        });
    });

    it('Can handle : in password', function () {
        expect(tpl({u: 'u', p: 'pass:word'}), 'to satisfy', {
            auth: 'u:pass:word',
            username: 'u',
            password: 'pass:word'
        });
    });

    it('Can handle : in username & password', function () {
        expect(tpl({u: 'user:name', p: 'pass:word'}), 'to satisfy', {
            auth: 'user:name:pass:word',
            username: 'user:name',
            password: 'pass:word'
        });
    });
});

describe('does not touch the non-atomic parts of the parsed url', function () {
    it('leaves chars encoded by url-template alone in href', function () {
        expect(p('http://foo.com/{?url}')({url: 'http://bar.com/?quux=baz&blah=blerg'}), 'to satisfy', {
            href: 'http://foo.com/?url=http%3A%2F%2Fbar.com%2F%3Fquux%3Dbaz%26blah%3Dblerg'
        });
    });
});
