#pragma once
#include "Message.h"

class Log
{
	public:
	virtual Message* create_msg(struct Info info) = 0;
};