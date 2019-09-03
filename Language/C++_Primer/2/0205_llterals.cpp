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
	//(a) ’a’, L’a’, "a", L"a"
	std::cout << "(a):" << std::endl;
	std::cout << type_name<decltype('s')>()		<< std::endl;	//char
	std::cout << type_name<decltype(L'a')>()	<< std::endl;	//wchar_t
	std::cout << type_name<decltype("a")>()		<< std::endl;	//char [2] const&
	std::cout << type_name<decltype(L"a")>()	<< std::endl;	//wchar_t [2] const&
	std::cout << "\n" << std::endl;

	//(b) 10, 10u, 10L, 10uL, 012, 0xC
	std::cout << "(b):" << std::endl;
	std::cout << type_name<decltype(10)>()		<< std::endl;	//int
	std::cout << type_name<decltype(10u)>()		<< std::endl;	//unsigned int
	std::cout << type_name<decltype(10L)>()		<< std::endl;	//long
	std::cout << type_name<decltype(10uL)>()	<< std::endl;	//unsigned long
	std::cout << type_name<decltype(012)>()		<< std::endl;	//int
	std::cout << type_name<decltype(0xC)>()		<< std::endl;	//int
	std::cout << "\n" << std::endl;

	//(c) 3.14, 3.14f, 3.14L
	std::cout << "(c):" << std::endl;
	std::cout << type_name<decltype(3.14)>()		<< std::endl;	//double
	std::cout << type_name<decltype(3.14f)>()		<< std::endl;	//float
	std::cout << type_name<decltype(3.14L)>()		<< std::endl;	//long double
	std::cout << "\n" << std::endl;

	//(d) 10, 10u, 10., 10e-2
	std::cout << "(d):" << std::endl;
	std::cout << type_name<decltype(10)>()		<< std::endl;	//int
	std::cout << type_name<decltype(10u)>()		<< std::endl;	//unsigned int
	std::cout << type_name<decltype(10.)>()		<< std::endl;	//double
	std::cout << type_name<decltype(10e-2)>()	<< std::endl;	//double
	std::cout << "\n" << std::endl;
	return 0;
}