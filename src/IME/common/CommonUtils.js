import Constants from './Constants'

export default {
	getBrowser: function () {
		if (navigator.userAgent.indexOf(Constants.constants.CHROME) > -1 && navigator.userAgent.indexOf(Constants.constants.SAFARI) > -1 && navigator.userAgent.indexOf(Constants.constants.EDGE) > -1) {
			return Constants.browserType.EDGE;
		}
		if (navigator.userAgent.indexOf(Constants.constants.CHROME) > -1 && navigator.userAgent.indexOf(Constants.constants.SAFARI) > -1 && navigator.userAgent.indexOf(Constants.constants.OPR) > -1) {
			return Constants.browserType.OPERA;
		}
		if (navigator.userAgent.indexOf(Constants.constants.CHROME) > -1 && navigator.userAgent.indexOf(Constants.constants.SAFARI) > -1) {
			return Constants.browserType.CHROME;
		}
		if (navigator.userAgent.indexOf(Constants.constants.FIREFOX)) {
			return Constants.browserType.FIREFOX;
		}
		if (navigator.userAgent.indexOf(Constants.constants.SAFARI)) {
			return Constants.browserType.SAFARI;
		}
		if (navigator.userAgent.indexOf(Constants.constants.MSIE) > -1 || navigator.userAgent.indexOf(Constants.constants.WIN) > -1 || navigator.userAgent.indexOf(Constants.constants.TRIDENT) > -1) {
			return Constants.browserType.MSIE;
		}

		return '';
	}
}