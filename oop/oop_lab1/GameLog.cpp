#include "GameLog.h"

Message* GameLog::create_msg(Info info) {
	switch (info.code)
	{
	case GAME_STARTED:
		{
		Message* res = new GameMessage(info.time, "Start Game");
		return res;
		}
	case GAME_WIN:
		{
		Message* res = new GameMessage( info.time, "Game finisfed witn win" );
		return res;
		}
	case GAME_FAIL:
		{
		Message* res = new GameMessage(info.time, "Game finished with fail");
		return res;
		}
	default:
		return nullptr;
	}
}