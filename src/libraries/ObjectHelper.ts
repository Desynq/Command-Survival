


export class ObjectHelper {
	public static values(obj: Record<any, any>): any[] {
		if (obj !== Object(obj)) {
			throw new TypeError("values called on a non-object");
		}

		let values = [];
		for (let key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				values.push(obj[key]);
			}
		}
		return values;
	}
}