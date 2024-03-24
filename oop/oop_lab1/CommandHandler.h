#pragma once
#include "CommandReciever.h"
#include "Command.h"
#include <map>

enum commands
{
	cmdNone,
	cmdMoveUp,
	cmdMoveDown,
	cmdMoveRight,
	cmdMoveLeft,
	cmdFinish
};

class CommandHandler
{
	std::map< char, commands > instruction;
	//std::map< commands, Command* > controllers;
	CommandReciever* cmd_recvr;
	public:

	CommandHandler( CommandReciever* cmd_recvr ); //его будем инициализировать из мейна
	void     set_instruction( std::map< char, commands > instrct );
	commands get_the_command();
};