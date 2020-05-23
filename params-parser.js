function parse(req) {
	const urlData = req.url;
	var params = [];

	if (urlData.indexOf('?') > 0) {
		params = urlData.split('?')[1].split('&');
		for (var i = params.length - 1; i >= 0; i--) {
			const param = params[i].split('=');
			params[param[0]] = param[1]; 
		}
	}

	return params;
}

module.exports.parse = parse;
