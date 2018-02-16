//(b) 10, 10u, 10L, 10uL, 012, 0xC
//(c) 3.14, 3.14f, 3.14L
//(d) 10, 10u, 10., 10e-2

#include <iostream>
int main()
{
	//(a) ’a’, L’a’, "a", L"a"
	std::cout << "(a):" << std::endl;
	std::cout << 'a' << std::endl;	//char
	std::cout << L'a' << std::endl;	//wchar_t
	std::cout << "a" << std::endl;	//String
	std::cout << L"a" << std::endl; //wchar_t
	return 0;
}