#include "CommonEventsFactory.h"
#include "Map.h"

Event* MapFactory::createEvent()
{
	return new Map( field_, player_ );
}