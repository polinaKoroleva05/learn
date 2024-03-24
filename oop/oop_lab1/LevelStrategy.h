#pragma once

#include "FieldGenerator.h"


class LevelStrategy
{
	public:
	virtual Field& create_field() = 0;
};