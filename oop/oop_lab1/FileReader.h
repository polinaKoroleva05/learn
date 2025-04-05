#pragma once
#include "CommandHandler.h"
#include <set>


class FileReader
{
	public:
	explicit FileReader( const std::string file_name, CommandHandler& cmd_hndl);

	~FileReader();

	void create_instruction();
	void emplace_and_check( char button, commands cmd );

	private:
	CommandHandler&             cmd_hndl;
	std::ifstream file;
	std::set<char> buttons_for_check;
	std::map< char, commands > instruction;
	std::map< char, commands > default_instruction = {
		{ 'W', commands::cmdMoveUp },
		{ 'A', commands::cmdMoveLeft },
		{ 'S', commands::cmdMoveDown },
		{ 'D', commands::cmdMoveRight },
		{ 'Q', commands::cmdFinish }
	};
};