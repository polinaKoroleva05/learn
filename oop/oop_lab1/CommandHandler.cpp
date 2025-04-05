#include "CommandHandler.h"

CommandHandler::CommandHandler( CommandReciever* cmd_recvr ) : cmd_recvr(cmd_recvr)
{
	//instruction.emplace( 'W', commands::cmdMoveUp );
	//instruction.emplace( 'A', commands::cmdMoveLeft );
	//instruction.emplace( 'S', commands::cmdMoveDown );
	//instruction.emplace( 'D', commands::cmdMoveRight );
	//instruction.emplace( 'Q', commands::cmdFinish );


}

void CommandHandler::set_instruction( std::map< char, commands > instrct )
{
	instruction = instrct;
}


commands CommandHandler::get_the_command() 
{
	char     tmp = cmd_recvr->recieve();
	if ( instruction.find( tmp ) != instruction.end() )
	{
		return instruction.at( tmp );
	}
	else
		return cmdNone;
}