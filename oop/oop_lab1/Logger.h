#pragma once
#include "Message.h"

class Logger
{
	public:
	virtual void print_msg(Message* msg) = 0;
};
