#include "Map.h"
#include "Field.h"
#include "BoneGround.h"

Map::Map( Field& field, Player& player ) : EventField( field, player )
{
	send_log( EVENT_CREATED );
}

void Map::execute()
{
	send_log( EVENT_ACTIVATED );
	std::random_device                                         dev;
	std::mt19937                                               mtrng( dev() );
	std::uniform_int_distribution< std::mt19937::result_type > distx( 0, field_.ColumnCount() - 1 );
	std::uniform_int_distribution< std::mt19937::result_type > disty( 0, field_.RowCount() - 1 );

	while ( true )
	{
		unsigned int x{ distx( mtrng ) };
		unsigned int y{ disty( mtrng ) };

		auto& cell{ field_.cells[ x ][ y ] };

		if ( ctGrass == cell.clType ) // подходит только травка
		{
			cell.clType = ctBoneGround;
			Event* tmp  = new BoneGround(field_, player_);
			cell.set_event( tmp );
			break;
		}
	}
	auto& tmp_cell = field_.cells[ player_.xPos ][ player_.yPos ];

	tmp_cell.clType = ctGrass;
	tmp_cell.set_event( nullptr );


}

void Map::send_log( int code )
{
	struct Info info     = { __TIME__, __FILE__, 0, "Map", code, 0, 0 };
	LoggerPool& instance = LoggerPool::instance();
	instance.update( info );
}