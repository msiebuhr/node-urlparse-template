urlparse-template
=================

[url.parse()](http://nodejs.org/docs/latest/api/url.html) with templating
support (via. Bram Stein's
[url-template](https://github.com/bramstein/url-template)).

Built for being able to give 'templated' URLs in configuration files, which you
then can fill out + get parsed on demand:

    var utp = require('urlparse-template');

	var template = utp('http://{username}:{password}@{username}.service.tld/');

	// Later

	var urlparts = template({
		username: 'foo',
		password: 'bar'
	});
	
	// Gives:
	// {
	//   protocol: 'http:',
	//   href: 'http://foo:bar@foo.service.tld/',
	//   auth: 'foo:bar',
	//   username: 'foo', // Parsed out from auth
	//   password: 'bar', // Parsed out from auth
	//   host: 'foo.service.tld',
	//   hostname: 'foo.service.tld',
	//   ...
	// }

It also works without the explicit template function:

    var data = utp(templateString, fillData);

## Details

We actually use a fork of `url.parse()` that doesn't call
`decodeURIComponent()` in the parsed data. This allows us to parse the
auth-section in a sane manner, even if users have `:` in their username.

(Yes it does suck to have legacy-systems with lax validation...)

## License

ISC
