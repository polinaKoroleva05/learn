#include "CommonEventsFactory.h"
#include "BoneGround.h"

Event* Bone_from_groundFactory::createEvent()
{
	return new BoneGround( field_, player_ );
}