#pragma once

#include "LevelStrategy.h"


class LevelTwo : public LevelStrategy
{
	public:
	Field& create_field() override;
};