#include "LoggerPool.h"

#include "ErrorLog.h"
#include "GameLog.h"
#include "ModelLog.h"
#include "ConsoleLog.h"
#include "FileLog.h"


void LoggerPool::add_log(Log* some_log) {
	logs.push_back(some_log);
}

void LoggerPool::add_logger(Logger* some_logger) {
	output.push_back( some_logger );
}

LoggerPool& LoggerPool::instance()
{
	static LoggerPool LP;
	return LP;
}

void LoggerPool::update(struct Info info) 
{
	for ( auto& current_log : logs )
	{
		Message* msg = current_log->create_msg( info );
		if (msg) {
			for ( auto& logger : output )
			{
				logger->print_msg( msg );
			}
		delete msg;
		}
	}
}

LoggerPool::~LoggerPool() {
	for ( auto& log : logs )
	{
		delete log;
	}
	for ( auto& logger : output )
	{
		delete logger;
	}
}