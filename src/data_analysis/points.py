max_value = 20
base_cost = 80
total_points = 0
total_cost = 0

for i in range(max_value):
    total_cost += base_cost * total_points
    total_points += 1

print(total_points, total_cost)