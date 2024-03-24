#include "Bone.h"
#include "Field.h"

Bone::Bone( Field& field, Player& player ) : EventField( field, player )
{
	send_log( EVENT_CREATED );
}

void Bone::execute()
{
	send_log( EVENT_ACTIVATED );
	player_.add_exp( 1 );

	for (auto& element_j : field_.cells) {
		for (auto& element_i : element_j) {
			if (element_i.PlayerHere) {
				element_i.clType = ctGrass;
				element_i.set_event(nullptr);
			}
		}
	}
}


void Bone::send_log( int code )
{
	struct Info info     = { __TIME__, __FILE__, 0, "Bone", code, 0, 0 };
	LoggerPool& instance = LoggerPool::instance();
	instance.update( info );
}