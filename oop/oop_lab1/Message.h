#pragma once
#include <iostream>
#include <fstream>
#include < string >

#define GAME_STARTED		1
#define GAME_WIN			2
#define GAME_FAIL			3
#define PLAYER_MOVE			4
#define CREATE_EVENT		5
#define EVENT_CREATED		6
#define EVENT_ACTIVATED		7
#define FIELD_INITIALIZED	8
#define ERROR_FIELD_SIZE	9
#define ERROR_UNPASSABLE	10




struct Info
{
	const char*     time;
	const char*     file;
	int				line;
	const char*     function;
	int				code;
	int				x;
	int             y;
};

class Message
{
	public:
	virtual std::string to_string() = 0;
	friend std::ostream& operator<<( std::ostream& os, Message* p );
};

class GameMessage : public Message
{

	const char* time;
	std::string message;

	public:
	GameMessage( const char* time, std::string message ) : time( time ), message( message ) {}
	std::string to_string() override;
};



class ErrorMessage : public Message
{
	const char* time;
	const char* file;
	int line;
	const char* function;
	std::string message;

	public:
	ErrorMessage( const char* time,
	              const char* file,
	              int line,
	              const char* function,
	              std::string message ) : time( time ), file( file ), line( line ), function( function ), message( message ) {}
	std::string to_string() override;
};


class ModelMessage : public Message
{
	const char* time;
	const char* file;
	std::string message;

	public:
	ModelMessage( const char* time,
	             const char* file,
	              std::string message ) : time( time ), file( file ), message( message ) {}
	std::string to_string() override;
};

