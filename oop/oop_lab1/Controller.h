#pragma once

#include "Player.h"
#include "Field.h"
#include "CommonEventsFactory.h"
#include "FieldView.h"
#include <SFML/Graphics.hpp>
#include "LevelContext.h"
#include "LevelOne.h"
#include "LevelTwo.h"


class Controller
{
	private:
	Player& player;
	Field*  field;
	bool TestNewPos( int x, int y );
	bool       game_on;
	LevelContext context;

	public:


	void PlayerMove( int delta_x, int delta_y );
	void NewGame();
	void   EndGame();
	Event* init_event( CommonEventsFactory& concrete_factory );
	int fail_or_win();

	void InitMap();
	Controller( Player& APlayer);
	void send_log( int code, int x = 0, int y = 0, const char* file = "", const char* str = "", int line = 0 );
	void init_map_with_level();
	Field& get_field();
};
