#pragma once
#include <iostream>
#include "Logger.h"


class ConsoleLog : public Logger
{
	public:
	void print_msg( Message* msg ) override;

};