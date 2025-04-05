#pragma once
#include "EventField.h"

class Map : public EventField
{
	public:
	Map( Field& field, Player& player );
	void execute() override;
	void send_log( int code );
};