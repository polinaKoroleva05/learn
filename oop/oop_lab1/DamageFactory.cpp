#include "CommonEventsFactory.h"
#include "Damage.h"

Event* DamageFactory::createEvent() 
{
	return new Damage(player_);
}