#include "FileReader.h"

#include <string>
#include <iostream>
#include <fstream>
#include <sstream>

FileReader::FileReader( std::string file_name, CommandHandler& cmd_hndl ) : cmd_hndl(cmd_hndl)
{
	file.open( file_name, std::ios_base::in );
}

FileReader::~FileReader()
{
	file.close();
}

void FileReader::emplace_and_check(char button, commands cmd) {
	instruction.emplace( button, cmd );
	if ( button != '\0' )
	{
		buttons_for_check.emplace( button );
	} 
}

void FileReader::create_instruction()
{
	std::set< char > buttons_for_check;

	if ( !file.is_open() )
	{
		cmd_hndl.set_instruction( default_instruction );
		return;
	}
	std::string str;
	while ( getline( file, str ) )
	{
		std::string command;
		char        button = '\0';

		std::istringstream stream( str );
		stream >> command >> button;

		if ( command == "right:" )
		{
			emplace_and_check( button, cmdMoveRight );
		}
		else if ( command == "left:" )
		{
			emplace_and_check( button, cmdMoveLeft );
		}
		else if ( command == "up:" )
		{
			emplace_and_check( button, cmdMoveUp );
		}
		else if ( command == "down:" )
		{
			emplace_and_check( button, cmdMoveDown );
		}
		else if ( command == "finish:" )
		{
			emplace_and_check( button, cmdFinish );
		}
	}

	if (buttons_for_check.size() >= 5) {
		cmd_hndl.set_instruction( instruction );
		return;
	}

	cmd_hndl.set_instruction( default_instruction );
}
