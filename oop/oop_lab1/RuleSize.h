#pragma once
#include "Field.h"

template < int columns, int rows >

class RuleSize
{
	public:
	void operator()( Field& field )
	{
		field.resize( columns, rows );
	}
};