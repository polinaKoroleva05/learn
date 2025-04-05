#pragma once
#include <fstream>
#include "Logger.h"


class FileLog : public Logger
{
	std::ofstream file;

	public:
	explicit FileLog( const std::string& name = "log.txt" );
	void print_msg( Message* msg ) override;
	~FileLog();
};