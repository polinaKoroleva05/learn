#pragma once
#include "RuleBarb.h"
#include "RuleBone.h"
#include "RuleMap.h"
#include "RuleRock.h"
#include "RuleSize.h"
#include "RuleWin.h"
#include "RuleLevelUp.h"

template < class... rules >
class FieldGenerator
{
	public:
	Field& create()
	{
		auto* field = new Field;
		( rules()( *field ), ... );

		return *field;
	}
};