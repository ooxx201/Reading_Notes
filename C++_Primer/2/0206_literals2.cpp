#include <type_traits>
#include <typeinfo>
#ifndef _MSC_VER
#   include <cxxabi.h>
#endif
#include <memory>
#include <string>
#include <cstdlib>
template <class T> std::string type_name() {
	typedef typename std::remove_reference<T>::type TR;
	std::unique_ptr<char, void(*)(void*)> own
	(
#ifndef _MSC_VER
	    abi::__cxa_demangle(typeid(TR).name(), nullptr,
	                        nullptr, nullptr),
#else
	    nullptr,
#endif
	    std::free
	);
	std::string r = own != nullptr ? own.get() : typeid(TR).name();
	if (std::is_const<TR>::value)
		r += " const";
	if (std::is_volatile<TR>::value)
		r += " volatile";
	if (std::is_lvalue_reference<T>::value)
		r += "&";
	else if (std::is_rvalue_reference<T>::value)
		r += "&&";
	return r;
}


#include <iostream>
int main()
{
	int m1 = 9, d1 = 7;
	std::cout << "int month = 9, day = 7;" << std::endl;
	std::cout << m1 << " : " << type_name<decltype(m1)>()	<< std::endl;
	std::cout << d1 << " : " << type_name<decltype(d1)>()	<< std::endl;
	std::cout << "\n" << std::endl;

	//int m2 = 09, d2 = 07; //error: invalid digit "9" in octal const
	int m2 = 011, d2 = 07;
	std::cout << "int month = 011, day = 07;" << std::endl;
	std::cout << m2 << " : " << type_name<decltype(m2)>()	<< std::endl;
	std::cout << d2 << " : " << type_name<decltype(d2)>()	<< std::endl;
	std::cout << "\n" << std::endl;
	return 0;
}