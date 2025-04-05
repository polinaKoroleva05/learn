#pragma once
#include "Log.h"

class ModelLog : public Log
{
	public:
	Message* create_msg( struct Info info ) override;
};