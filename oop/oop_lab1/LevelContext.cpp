#include "LevelContext.h"

//LevelContext::LevelContext( std::unique_ptr< LevelStrategy >&& level = {} ) : 
//	some_level( std::move( level ) ), 
//	field( some_level->create_field() )
//{}

void LevelContext::set_level( std::unique_ptr< LevelStrategy > && level )
{
	some_level = std::move( level );
	field = &(some_level->create_field());
}
	
	
Field* LevelContext::get_field()
{
	return field;
}