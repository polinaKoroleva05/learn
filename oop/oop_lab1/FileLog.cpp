#include "FileLog.h"


FileLog::FileLog(const std::string& name) {
	file.open( name );
}

void FileLog::print_msg(Message* msg) {
	file << msg;
}

FileLog::~FileLog() {
	file.close();
}