#include "Level_up.h"

Level_up::Level_up( Player& player ) : EventPlayer( player )
{
	send_log( EVENT_CREATED );
}

void Level_up::execute() {
	if (player_.get_exp() >= player_.get_level() * 5) {
		send_log( EVENT_ACTIVATED );
		player_.change_level( 1 );
	}
}

void Level_up::send_log(int code) {
	struct Info info     = { __TIME__, __FILE__, 0, "Level_up", code, 0, 0 };
	LoggerPool& instance = LoggerPool::instance();
	instance.update( info );
}