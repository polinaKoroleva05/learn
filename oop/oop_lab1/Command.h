#pragma once
#include "Controller.h"

class Command
{
	public:
	virtual void execute() = 0;
	virtual ~Command()     = 0;

};

class MoveUp : public Command
{
	Controller& cntrl;

	public:
	MoveUp( Controller& cntrl ) : cntrl( cntrl ){};
	void execute() override;
};

class MoveDown : public Command
{
	Controller& cntrl;

	public:
	MoveDown( Controller& cntrl ) : cntrl( cntrl ){};
	void execute() override;
};

class MoveRight : public Command
{
	Controller& cntrl;

	public:
	MoveRight( Controller& cntrl ) : cntrl( cntrl ){};
	void execute() override;
};

class MoveLeft : public Command
{
	Controller& cntrl;

	public:
	MoveLeft( Controller& cntrl ) : cntrl( cntrl ){};
	void execute() override;
};

class GameStart : public Command
{
	void execute() override;
};

class GameFinish : public Command
{
	void execute() override;
};
