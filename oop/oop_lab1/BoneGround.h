#include "EventField.h"


class BoneGround : public EventField
{
	public:
	BoneGround( Field& field, Player& player );
	void execute() override;
	void send_log( int code );
};
