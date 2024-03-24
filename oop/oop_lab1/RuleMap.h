#pragma once
#include "Field.h"

template < int count >

class RuleMap
{
	public:
	void operator()( Field& field )
	{
		for ( int i = 0; i < count; i++ )
		{
			auto& tmp_cell  = field.get_random_cell();
			tmp_cell.clType = ctMap;
		}
	}
};