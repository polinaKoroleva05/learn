#pragma once

#include <vector>
#include <random>
#include "Cell.h"

class Field
{
	private:
	int columns;
	int rows;
	int victory_condition;

	public:
	std::vector< std::vector< Cell > > cells;
	std::vector< std::vector< Cell > > get_field() const;

	Field( int AColumns = 10, int ARows = 10 );
	Field( const Field& other );
	Field( Field&& other );

	Field& operator=( const Field& other );
	Field& operator=( Field&& other );

	void swap( Field& other );
	void send_log( int code, int x, int y, const char* file, const char* func, int line );
	Cell& get_random_cell();
	int get_victory_condition();
	void  change_victory_condition(int value);
	void  resize( int new_columns, int new_rows );

	int RowCount();
	int ColumnCount();
};
