#include "Controller.h"
#include "LoggerPool.h"


Controller::Controller( Player& APlayer)
    : player( APlayer ), game_on( true )
{
	init_map_with_level();
}

void Controller::send_log( int code, int x, int y, const char* file, const char* func, int line )
{
	struct Info info = {__TIME__, file, line, func, code, x, y};
	LoggerPool& instance = LoggerPool::instance();
	instance.update(info );
}


bool Controller::TestNewPos( int x, int y )
{
	//Ячейка куда мы переходим

	auto& cell{ field->cells[ x ][ y ] };

	if( cell.passable )
	{
		return true;
	}
	send_log( ERROR_UNPASSABLE, x, y, __FILE__, __func__, __LINE__ );
	return false;
}

void Controller::PlayerMove(int delta_x, int delta_y)
{
	int oldY = player.yPos;
	int oldX = player.xPos;
	int newY = oldY + delta_y;
	int newX = oldX + delta_x;
	newY     = ( newY + field->RowCount() ) % field->RowCount();
	newX     = ( newX + field->ColumnCount() ) % field->ColumnCount();


	if (TestNewPos(newX, newY)) { //если можно - ставим игрока сюда
		player.xPos = newX;
		player.yPos = newY;
		field->cells[ oldX ][ oldY ].PlayerHere = false;
		field->cells[ newX ][ newY ].PlayerHere = true;
		send_log( PLAYER_MOVE, newX, newY, __FILE__);
	}
	//здесь будет метод для перемещения в нужную сторону animate.move(delta x, delta y)
	//когда игрок перейет в клетку, то есть закончится анимация перхода, вызовем реагирование клеточки
	field->cells[ newX ][ newY ].update();
}

Event* Controller::init_event(CommonEventsFactory& concrete_factory) {
	return concrete_factory.createEvent();
}

int Controller::fail_or_win() {
	if (player.get_health() <= 0) {
		send_log( GAME_FAIL );
		return -1;
	}
	if (player.get_level() == field->get_victory_condition()) {
		send_log( GAME_WIN );
		return 1;
	}
	return 0;
}


void Controller::InitMap()
{

	auto& cells{ field->cells }; //***

	BoneFactory chg_type_fact( *field, player );
	DamageFactory      dmg_fact( player );
	Level_upFactory    lvl_up_fact( player );
	MapFactory              mp_fact( *field, player );


	for ( int y = 0; y < field->RowCount(); ++y )
	{
		for ( int x = 0; x < field->ColumnCount(); ++x )
		{
			Cell& tmp_cell = cells[ x ][ y ];
				
			switch ( tmp_cell.clType )
			{
				case 0:
				break;

				case 1: 
				{
				send_log( CREATE_EVENT, x, y, __FILE__ );
				Event* tmp = init_event( dmg_fact );
				tmp_cell.set_event(tmp);
				}
				break;

				case 2: 
				{
				send_log( CREATE_EVENT, x, y, __FILE__ );
				Event* tmp = init_event( chg_type_fact);
				tmp_cell.set_event( tmp );
				}
				break;

				case 3: 
				{
				send_log( CREATE_EVENT, x, y, __FILE__ );
				Event* tmp = init_event( lvl_up_fact );
				tmp_cell.set_event( tmp );
				}
				break;

				case 4: {
				send_log( CREATE_EVENT, x, y, __FILE__ );
				Event* tmp = init_event( mp_fact );
				tmp_cell.set_event( tmp );
				}
				break;
			}

		}
	}

	//-- Выбрать собачке место на травке --

	{
		std::random_device                                         dev;
		std::mt19937                                               mtrng( dev() );
		std::uniform_int_distribution< std::mt19937::result_type > distx( 0, field->ColumnCount() - 1 );
		std::uniform_int_distribution< std::mt19937::result_type > disty( 0, field->RowCount() - 1 );

		while ( true )
		{
			unsigned int x{ distx( mtrng ) };
			unsigned int y{ disty( mtrng ) };

			auto& cell{ cells[ x ][ y ] };

			if ( ctGrass == cell.clType ) // подходит только травка
			{
				player.xPos = x;
				player.yPos = y;

				cell.PlayerHere = true;
				break;
			}
		}
	}
}

void Controller::NewGame()
{
	send_log( GAME_STARTED );
	InitMap();
	send_log( FIELD_INITIALIZED, 0, 0, __FILE__);
}

void Controller::EndGame() 
{
	game_on = false;
}

void Controller::init_map_with_level() 
{
	int level;
	std::cout << "Enter number of level:\n" << "1 level:\nstandart size of field, you win if your character recieve 4 level\n\n" << "2 level:\nlong field, more barbs and rocks, you win if your character recieve 5 level\n";
	std::cin >> level;
	if ( level == 1 )
	{
		context.set_level( std::make_unique< LevelOne >() );
	}
	else
	{
		context.set_level( std::make_unique< LevelTwo >() );
	}
	field = context.get_field();
}

Field& Controller::get_field()
{
	return *field;
}