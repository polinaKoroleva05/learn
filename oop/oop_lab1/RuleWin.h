#pragma once
#include "Field.h"

template < int level_for_win >

class RuleWin
{
	public:
	void operator()( Field& field )
	{
		field.change_victory_condition( level_for_win );
	}
};