#pragma once
#include "Log.h"

class GameLog: public Log
{
	public:
	Message* create_msg( struct Info info ) override;
};