#include "CommonEventsFactory.h"
#include "Level_up.h"

Event* Level_upFactory::createEvent()
{
	return new Level_up(player_);
}