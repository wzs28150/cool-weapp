const getDistance = (lat1, lng1, lat2, lng2) => {
	lat1 = lat1 || 0;
	lng1 = lng1 || 0;
	lat2 = lat2 || 0;
	lng2 = lng2 || 0;
	var rad1 = (lat1 * Math.PI) / 180.0;
	var rad2 = (lat2 * Math.PI) / 180.0;
	var a = rad1 - rad2;
	var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
	var r = 6378137;
	return (
		(
			r *
			2 *
			Math.asin(
				Math.sqrt(
					Math.pow(Math.sin(a / 2), 2) +
						Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2),
				),
			)
		).toFixed(0) / 1000
	);
};

module.exports = {
	getDistance
};
