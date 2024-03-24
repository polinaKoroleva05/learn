#include "BoneGround.h"
#include "Field.h"

BoneGround::BoneGround( Field& field, Player& player ) : EventField( field, player )
{
	send_log( EVENT_CREATED );
}

void BoneGround::execute()
{
	if (player_.get_level() >= 2) {
		send_log( EVENT_ACTIVATED );
		auto& tmp_cell = field_.cells[ player_.xPos ][ player_.yPos ];
		
		tmp_cell.clType = ctGrass;
		player_.add_exp( 2 );
		tmp_cell.set_event( nullptr );
	}
}

void BoneGround::send_log( int code )
{
	struct Info info     = { __TIME__, __FILE__, 0, "BoneGround", code, 0, 0 };
	LoggerPool& instance = LoggerPool::instance();
	instance.update( info );
}