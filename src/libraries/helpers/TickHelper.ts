


export namespace TickHelper {

	/**
	 * 
	 * @param interval The interval in ticks to check for
	 * @param callback the function to run if the server tick count has hit the interval
	 * @returns whether the server tick count is on interval
	 */
	export function every(interval: number, callback?: () => void): boolean {
		if (Utils.server.tickCount % interval === 0) {
			callback?.();
			return true;
		}
		return false;
	}
}