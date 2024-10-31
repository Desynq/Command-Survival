// priority: 2147483647


const IOHelper = {};


/**
 * 
 * @param {string} string 
 * @param {Object<string, any>} variables 
 */
IOHelper.renderTemplate = function (string, variables) {
	return string.replace(/\${(.*?)}/g, (_, v) => variables[v]);
}