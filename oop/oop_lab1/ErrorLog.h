#pragma once
#include "Log.h"

class ErrorLog : public Log
{
	public:
	Message* create_msg( struct Info info ) override;
};