#pragma once
#include "Field.h"

template < int count >

class RuleRock
{
	public:
	void operator()( Field& field )
	{
		for ( int i = 0; i < count; i++ )
		{
			auto& tmp_cell  = field.get_random_cell();
			tmp_cell.clType = ctRock;
			tmp_cell.passable = false;
		}
	}
};