


export class IOHelper {
	
	public static renderTemplate(template: string, variables: Record<string, any>): string {
		return template.replace(/\${(.*?)}/g, (_, v) => variables[v]);
	}

	public static parseJSON(path: string, variables: Record<string, any>): string {
		const text = String(JsonIO.readString(path as any));
		return this.renderTemplate(text, variables);
	}
}