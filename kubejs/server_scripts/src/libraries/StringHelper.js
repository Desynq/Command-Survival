// priority: 2147483647

/**
 * @returns {string}
 */
function ConcatString()
{
	return Array.prototype.join.call(arguments, "");
}