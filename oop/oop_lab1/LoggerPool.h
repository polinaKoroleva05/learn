#pragma once
#include "Logger.h"
#include "Log.h"
#include <vector>

class LoggerPool
{
	std::vector< Logger* > output;
	std::vector <Log*> logs;
	LoggerPool(){};
	~LoggerPool();
	LoggerPool( LoggerPool const& ) = delete;
	LoggerPool& operator=( LoggerPool const& ) = delete;

	public:
	void add_log( Log* some_log );
	void add_logger( Logger* some_logger );
	static LoggerPool& instance();
	void update( struct Info info);
	
};
