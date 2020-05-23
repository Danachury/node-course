function render(html, params) {

	var htmlString = html.toString();
	const variables = htmlString.match(/[^\{\}]+(?=\})/g);

	for (var i = variables.length - 1; i >= 0; i--) {
		const value = variables[i];
		htmlString = htmlString.replace('{' + variables[i] + '}', params[value]);
	}

	return htmlString;
}

module.exports.render = render;
