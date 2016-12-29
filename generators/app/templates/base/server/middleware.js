exports.sendJSON = (request, response, next) => {
	function sendJSON(obj, ttl = 60) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST');
		response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
		response.setHeader('Content-Type', 'application/json');
		const cacheControl = (ttl === 0) ? 'public, must-revalidate, proxy-revalidate, max-age=0' : `public, max-age=${ttl}`;
		response.setHeader('Cache-Control', cacheControl );
		response.send(JSON.stringify(obj));
	}

	response.sendJSON = sendJSON;
	next();
};
