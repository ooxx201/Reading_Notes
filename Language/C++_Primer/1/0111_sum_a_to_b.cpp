#include <iostream>
int main()
{
	int sum = 0, v1 = 0, v2 = 0, st = 0, ed = 0;
	std::cout << "Enter two numbers:" << std::endl;
	std::cin >> v1 >> v2;

	if (v1 < v2) {
		st = v1;
		ed = v2;
	} else {
		st = v2;
		ed = v1;
	}
	// keep executing the while as long as val is largger than or equal to st
	while (ed >= st) {
		sum += ed; // assigns sum + val to sum
		--ed; // minus 1 to ed
	}
	std::cout << "Sum of " << v1 << " to " << v2 << " inclusive is "
	<< sum << std::endl;
	return 0;
}