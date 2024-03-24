#if 0
#pragma once
#include "CommonEventsFactory.h"


class Change_typeFactory : public CommonEventsFactory
{
	public:
	Change_typeFactory( Field& field ) : field_( field ){};
	Event* createEvent() override;

	private:
	Field& field_;
};
#endif