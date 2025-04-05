#include "Event.h"

class CommonEventsFactory
{
	public:
	virtual Event* createEvent() = 0;
};


class BoneFactory : public CommonEventsFactory
{
	public:
	BoneFactory( Field& field, Player& player ) : field_( field ), player_(player){};
	Event* createEvent() override;

	private:
	Field& field_;
	Player& player_;
};



class DamageFactory : public CommonEventsFactory
{
	public:
	DamageFactory( Player& player ) : player_( player ){};
	Event* createEvent() override;

	private:
	Player& player_;
};


class Level_upFactory : public CommonEventsFactory
{
	public:
	Level_upFactory( Player& player ) : player_( player ){};
	Event* createEvent() override;

	private:
	Player& player_;
};

class Bone_from_groundFactory : public CommonEventsFactory
{
	public:
	Bone_from_groundFactory( Field& field, Player& player ) : field_( field ), player_( player ){};
	Event* createEvent() override;

	private:
	Field&  field_;
	Player& player_;
};

class MapFactory : public CommonEventsFactory
{
	public:
	MapFactory( Field& field, Player& player ) : field_( field ), player_( player ){};
	Event* createEvent() override;

	private:
	Field&  field_;
	Player& player_;
};