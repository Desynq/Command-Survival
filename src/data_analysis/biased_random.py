import random

def biased_random(min_val, max_val, bias):
    random_value = random.random() ** bias
    return (max_val - min_val) * random_value + min_val

# Parameters
min_val = 0  # Replace with the desired min value
max_val = 0.5  # Replace with the desired max value
bias = 50     # Replace with the desired bias value

# Run 1 million samples and compute the average
num_runs = 10_000_000
total = sum(biased_random(min_val, max_val, bias) for _ in range(num_runs))
average = total / num_runs

print(f"Average after {num_runs} runs: {average}")