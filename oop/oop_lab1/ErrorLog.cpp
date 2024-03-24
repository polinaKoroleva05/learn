#include "ErrorLog.h"


Message* ErrorLog::create_msg( Info info )
{
	switch ( info.code )
	{
	case ERROR_FIELD_SIZE:
		{
		std::string str = "Field size is incorrect - " + std::to_string( info.x ) + " x " + std::to_string( info.y ) + " default size used";
		Message* res = new ErrorMessage( info.time, info.file, info.line, info.function, str );
		return res;
		}
	case ERROR_UNPASSABLE:
		{
		std::string str = "Attempt to stand on an impassable cell " + std::to_string( info.x ) + " ; " + std::to_string( info.y );
		Message* res = new ErrorMessage( info.time, info.file, info.line, info.function, str );
		return res;
		}
	default:
		return nullptr;
	}
}