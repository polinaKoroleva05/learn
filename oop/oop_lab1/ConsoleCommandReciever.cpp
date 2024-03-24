#include "CommandReciever.h"
#include <iostream>

char ConsoleCommandReciever::recieve()
{
	char cmd;
	cmd = getchar();
	//std::cin >> cmd;
	return cmd;
}