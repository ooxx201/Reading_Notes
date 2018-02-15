#include <iostream>
int main()
{
	int sum = 0;
	// sum values from 1 through 10 inclusive
	for (int val = -100; val <= 100; ++val)
		sum += val; // equivalent to sum = sum + val
	std::cout << "Sum of -100 to 100 inclusive is "
	<< sum << std::endl;
	return 0;
}