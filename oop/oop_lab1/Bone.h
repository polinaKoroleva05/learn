#pragma once
#include "EventField.h"

class Bone: public EventField
{
	public:
	Bone( Field& field, Player& player );
	void execute() override;
	void send_log( int code );
};