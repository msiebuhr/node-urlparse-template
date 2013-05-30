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
