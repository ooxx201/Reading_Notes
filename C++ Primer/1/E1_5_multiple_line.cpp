#include <iostream>
int main()
{
	std::cout << "Enter two numbers:" << std::endl;
	int v1 = 0, v2 = 0;
	std::cin >> v1 >> v2;
	std::cout << "The product of :\n" 
	<< v1 << "\n" 
	<< "*\n"
	<< v2 << "\n"
	<< "=" << v1 * v2 << std::endl;
	return 0;
}