#if 0
#pragma once
#include "CommonEventsFactory.h"


class Level_upFactory : public CommonEventsFactory
{
	public:
	Level_upFactory( Player& player ) : player_( player ){};
	Event* createEvent() override;

	private:
	Player& player_;
};

#endif