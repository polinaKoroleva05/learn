#if 0
#pragma once
#include "CommonEventsFactory.h"


class DamageFactory : public CommonEventsFactory
{
	public:
	DamageFactory( Player& player ) : player_( player ){};
	Event* createEvent() override;

	private:
	Player& player_;
};

#endif