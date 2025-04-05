#include "LevelTwo.h"

Field& LevelTwo::create_field()
{
	FieldGenerator< RuleSize <14, 7>,
					RuleRock <20>,
					RuleBarb <20>,
	                RuleBone <15>,
	                RuleMap <10>,
	                RuleLevelUp< 10 >,
					RuleWin <5>	> some_generator;
	Field& inited_field = some_generator.create();
	return inited_field;
}