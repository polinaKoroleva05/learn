#include "Damage.h"

Damage::Damage( Player& player ) : EventPlayer( player )
{
	send_log( EVENT_CREATED );
}

void Damage::execute() {
	player_.change_health( -1 );
	send_log( EVENT_ACTIVATED );
}

void Damage::send_log(int code) {
	struct Info info     = { __TIME__, __FILE__, 0, "Damage", code, 0, 0 };
	LoggerPool& instance = LoggerPool::instance();
	instance.update( info );
}