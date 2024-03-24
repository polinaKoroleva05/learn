#pragma once
#include "FieldView.h"

class CommandReciever
{
	public:
	virtual char recieve() = 0;
	//virtual ~CommandReciever() = 0;
};

class ConsoleCommandReciever : public CommandReciever
{
	public:
	ConsoleCommandReciever(){};
	char recieve() override;
};


class GUICommandReciever : public CommandReciever
{
	FieldView& fldView;
	public:
	GUICommandReciever( FieldView& fldvw );
	char recieve() override;
};