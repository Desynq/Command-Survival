export class Money {

	public static fromDollar(number: number, charm?: boolean): number {
		if (charm) {
			return (number - 0.01) * 100;
		}
		return number * 100;
	}

	public static toDollar(number: number): number {
		return number / 100;
	}

	public static toDollarString(number: number): string {
		const moneyFormatted = this.toDollar(Math.abs(number)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return `${number < 0 ? '-' : ''}${moneyFormatted}`;
	}

	public static fromSimpleDollarString(dollarString: string): number {
		const regex = /^\d+(\.\d{1,2})?$/;
		if (!regex.test(dollarString)) {
			return NaN;
		}

		const parts = dollarString.split('\\.');
		if (parts.length === 1) // 1
		{
			return parseInt(parts[0], 10) * 100;
		}
		if (parts[1].length === 1) // 1.0
		{
			return parseInt(parts[0] + parts[1], 10) * 10;
		}
		return parseInt(parts[0] + parts[1], 10); // 1.00
	}
}