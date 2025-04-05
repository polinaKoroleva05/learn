#pragma once

// „тение всех событий и команд пользовател€

#include <SFML/Graphics.hpp>

#include "FieldView.h"
#include "Controller.h"
#include "FileReader.h"

class CommandPerformer
{
	private:
	FieldView&  fldView;
	Controller& controller;
	CommandHandler* cmd_handle;
	//void KeyToCmd( const sf::Keyboard::Key keycode ); // ќбработка нажатий клавиатуры
	void perform_cmd( commands code_cmd );


	public:
	CommandPerformer( Controller& AController, FieldView& FldView, CommandReciever* cmd_recvr);
	~CommandPerformer();
	void WaitCommand();
	bool NotEndGame();
};
