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
	//(a) "Who goes with F\145rgus?\012" (b) 3.14e1L (c) 1024f (d) 3.14L

	std::cout << "int month = 9, day = 7;" << std::endl;
	std::cout << "Who goes with F\145rgus?\012" << " :\t " << type_name<decltype("Who goes with F\145rgus?\012")>()	<< std::endl;
	std::cout << 3.14e1L << " :\t " << type_name<decltype(3.14e1L)>() << std::endl;
	//std::cout << 1024f << " :\t " << type_name<decltype(1024f)>() << std::endl; 
	//error: unable to find numeric literal operator 'operator""f'
	//Should use 1024.f
	std::cout << 1024.f << " :\t " << type_name<decltype(1024.f)>() << std::endl;
	std::cout << 3.14L << " :\t " << type_name<decltype(3.14L)>() << std::endl;
	std::cout << "\n" << std::endl;

	return 0;
}