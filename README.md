urlparse-template
=================

[url.parse()]() with templating support (via. Bram Stein's [url-template]().

Built for being able to give 'tempalted' URLs in configuration files, that you
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

## License

ISC
