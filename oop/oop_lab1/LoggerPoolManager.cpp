#include "LoggerPoolManager.h"

#include "ErrorLog.h"
#include "GameLog.h"
#include "ModelLog.h"
#include "ConsoleLog.h"
#include "FileLog.h"

void LoggerPoolManager::initialisate() {
	LoggerPool& instance = LoggerPool::instance();
	char answer;
	std::cout << "Choose level of logging. Enter the number. If you want some levels, print them without space\n"
	          << "1 - Status of game\n"
	          << "2 - Model changing\n"
	          << "3 - Error loging\n";
	//std::cin >> answer;
	answer = getchar();
	while ( answer != '\n'){
		Log* some;
		switch (answer) {
		case '1':
			some = new GameLog;
			break;
		case '2':
			some = new ModelLog;
			break;
		case '3':
			some = new ErrorLog;
			break;
		default:
			std::cout << "incorrect answer, default game logger will be used\n";
			some = new GameLog;
		}
		instance.add_log( some );

		answer = getchar();
	};
	
	int answer1;
	std::cout << "Choose logging output type. Enter the number\n"
	          << "1 - Console\n"
	          << "2 - File\n"
	          << "3 - Console and file\n";
	std::cin >> answer1;
	Logger* some_logger;
	switch ( answer1 )
	{
	case 1:
		some_logger = new ConsoleLog;
		break;
	case 2:
		some_logger = new FileLog;
		break;
	case 3:
		{
		Logger* extra_logger = new ConsoleLog;
		instance.add_logger( extra_logger );
		}
		some_logger = new FileLog;
		break;
	default:
		std::cout << "incorrect answer, default console logger will be used\n";
		some_logger = new ConsoleLog;
	}
	instance.add_logger( some_logger );
}
