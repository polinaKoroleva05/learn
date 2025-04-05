#pragma once
#include "EventPLayer.h"

class Damage : public EventPlayer
{
	public:
	Damage( Player& player );
	void execute() override;
	void send_log( int code );
};