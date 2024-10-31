// priority: 2147483646

/*
import numpy as np

bias_factor = 10
min_val = 0.01
max_val = 0.1
num_samples = 1_000_000

highly_biased_random_samples = min_val + (np.random.rand(num_samples) ** bias_factor) * (max_val - min_val)

average_highly_biased_random = np.mean(highly_biased_random_samples)
print(average_highly_biased_random)
*/

/**
 * @param {number} min 
 * @param {number} max 
 * @param {number} bias higher numbers give a bias towards the minimum
 */
function biasedRandom(min, max, bias)
{
	const random = Math.random() ** bias;
	return (max - min) * random + min;
}



const MathHelper = {};

/**
 * 
 * @param {number} radius 
 */
MathHelper.get2dPointInCircle = function (radius) {
	const theta = Math.random() * 2 * Math.PI;
	const r = radius * Math.sqrt(Math.random());
	const x = r * Math.cos(theta);
	const y = r * Math.sin(theta);
	return x, y;
}