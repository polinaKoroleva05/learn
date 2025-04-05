#include "Message.h"


std::string GameMessage::to_string() {
	std::string time_str = time;
	std::string res      = "GM " + time_str + "\t\t" + message;
	return res;
}

std::string ModelMessage::to_string()
{
	std::string time_str = time;
	std::string file_str = file;
	std::string res      = "MM " + time_str + ' ' + file_str + "\t\t" + message;
	return res;
}

std::string ErrorMessage::to_string()
{
	std::string time_str = time;
	std::string file_str = file;
	std::string func_str = function;

	std::string res = "EM " + time_str + ' ' + file_str + ' ' + std::to_string(line) + "\t\t" + message;
	return res;
}


std::ostream& operator<<( std::ostream& os, Message* msg )
{
	os << msg->to_string() << '\n';
	return os;
}
