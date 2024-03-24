#pragma once
#include "Player.h"
#include "LoggerPool.h"

class Field;

class Event
{
	public:
	virtual void execute() = 0;
};
