#include "ModelLog.h"

Message* ModelLog::create_msg( Info info )
{
	switch ( info.code )
	{
	case PLAYER_MOVE: 
		{
		std::string str = "Player moved at position (" + std::to_string( info.x ) + "," + std::to_string( info.y ) + ")";
		Message* res = new ModelMessage( info.time, info.file, str );
		return res;
		}
	case CREATE_EVENT:
		{
		std::string str = "Create event at position (" + std::to_string( info.x ) + "," + std::to_string( info.y ) + ")";
		Message* res = new ModelMessage( info.time, info.file, str );
		return res;
		}
	case EVENT_CREATED:
		{
		std::string name   = info.function;
		std::string str = "Event created: " + name;
		Message* res = new ModelMessage( info.time, info.file, str );
		return res;
		}
	case EVENT_ACTIVATED:
		{
		std::string name = info.function;
		std::string str = "Event activated: " + name;
		Message* res = new ModelMessage( info.time, info.file, str );
		return res;
		}
	case FIELD_INITIALIZED:
		{
		Message* res = new ModelMessage( info.time, info.file, "Field initialisated" );
		return res;
		}
	default:
		return nullptr;
	}
}