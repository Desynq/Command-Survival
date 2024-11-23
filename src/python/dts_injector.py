

def inject_method(internal_number: int, method_definition: str, class_definition: str):
	file_path = "kubejs/probe/generated/internals/internal_" + str(internal_number) + ".d.ts"
	with open(file_path, "r") as file:
		lines = file.readlines()
	
	class_index = next((i for i, line in enumerate(lines) if class_definition in line), None)
	method_exists = any(method_definition in line for line in lines)

	if class_index is not None and not method_exists:
		lines.insert(class_index + 1, f"\t\t{method_definition}\n")
		print(f"inserted '{method_definition}' into '{class_definition}'")
		with open(file_path, "w") as file:
			file.writelines(lines)
	else:
		if method_exists:
			print(f"The method '{method_definition}' already exists in the file.")
		else:
			print("Vec3d class not found in the file.")




inject_method(14, "subtract(x: number, y: number, z: number): this;", "class Vec3d")

inject_method(43, "tell(message: string): void;", "abstract class Player")