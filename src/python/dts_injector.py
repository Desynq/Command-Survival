# File path to the .d.ts file
file_path = "kubejs/probe/generated/internals/internal_14.d.ts"

# The function you want to inject
method_definition = "subtract(x: number, y: number, z: number): this;"

# Read the content of the file
with open(file_path, "r") as file:
	lines = file.readlines()

# Find the class declaration to inject the method after it
class_index = next((i for i, line in enumerate(lines) if "class Vec3d" in line), None)

# Check if the method is already present to avoid duplicate insertion
method_exists = any(method_definition in line for line in lines)

# If class Vec3d is found and the method is not already present, insert the method definition
if class_index is not None and not method_exists:
	lines.insert(class_index + 1, f"\t\t{method_definition}\n")

	# Write the updated content back to the file
	with open(file_path, 'w') as file:
		file.writelines(lines)
else:
	if method_exists:
		print(f"The method '{method_definition}' already exists in the file.")
	else:
		print("Vec3d class not found in the file.")