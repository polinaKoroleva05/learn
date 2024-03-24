#pragma once
#include "Event.h"


class EventField : public Event
{
	public:
	explicit EventField( Field& field, Player& player ) : field_( field ), player_(player) {}
	void execute() override = 0;

	protected:
	Field& field_;
	Player& player_;
};