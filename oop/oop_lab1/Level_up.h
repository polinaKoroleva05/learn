#pragma once
#include "EventPLayer.h"

class Level_up : public EventPlayer
{
	public:
	Level_up( Player& player );
	void execute() override;
	void send_log( int code);
};