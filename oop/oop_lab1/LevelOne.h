#pragma once
#include "LevelStrategy.h"


class LevelOne : public LevelStrategy
{
	public:
	Field& create_field() override;
};