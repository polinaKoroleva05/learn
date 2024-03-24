#include "Command.h" 

void MoveUp::execute() {
	cntrl.PlayerMove( 0, -1 );
}

void MoveDown::execute() {
	cntrl.PlayerMove( 0, 1 );
}

void MoveRight::execute()
{
	cntrl.PlayerMove( 1, 0 );
}

void MoveLeft::execute()
{
	cntrl.PlayerMove( -1, 0 );
}