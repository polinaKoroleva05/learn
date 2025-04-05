#include "LevelOne.h"

Field& LevelOne::create_field() 
{
	FieldGenerator< RuleBarb <10>,
	                RuleBone <15>,
					RuleRock <10>,
	                RuleLevelUp< 20 >,
	                RuleMap <15>	> some_generator;
	Field& inited_field = some_generator.create();
	return inited_field;
}