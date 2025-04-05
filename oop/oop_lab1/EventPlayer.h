#pragma once
#include "Event.h"


class EventPlayer : public Event
{
	public:
	explicit EventPlayer( Player& player ) : player_( player ) {}
	void execute() override = 0;

	protected:
	Player& player_;
};