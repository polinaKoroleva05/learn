#pragma once
#include "LevelStrategy.h"

class LevelContext
{
	public:
	//LevelContext(){};
	void   set_level( std::unique_ptr< LevelStrategy >&& level );
	Field* get_field();

	private:
	Field* field;
	std::unique_ptr< LevelStrategy > some_level;
};