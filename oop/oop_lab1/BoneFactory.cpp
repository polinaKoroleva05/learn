#include "CommonEventsFactory.h"
#include "Bone.h"

Event* BoneFactory::createEvent()
{
	return new Bone(field_ , player_);
}