#include "Field.h"

Field::Field( int AColumns, int ARows )
    : columns( AColumns ),
      rows( ARows ), cells{ columns, std::vector< Cell >( rows ) }, victory_condition( 4 )
{
	//if (columns < 1 || rows < 1) {
	//	send_log( ERROR_FIELD_SIZE, columns, rows, __FILE__, __func__, __LINE__ );
	//	columns = 10;
	//	rows = 10;
	//}
	//cells.resize( columns );
	//for (int i = 0; i < columns; ++i) 
	//{
	//	cells[ i ].resize( rows );
	//}
}

Field::Field( const Field& other )
    : columns( other.columns ),
      rows( other.rows ),
      cells( other.cells ),
      victory_condition(other.victory_condition)
{
}

void Field::swap( Field& other )
{
	std::swap( columns, other.columns );
	std::swap( rows, other.rows );
	std::swap( cells, other.cells );
}

Field& Field::operator=( const Field& other )
{
	if ( this != &other )
		Field( other ).swap( *this );

	return *this;
}

Field::Field( Field&& other )
{
	this->swap( other );
}

Field& Field::operator=( Field&& other )
{
	if ( this != &other )
		this->swap( other );

	return *this;
}

std::vector< std::vector< Cell > > Field::get_field() const
{
	return cells;
}

int Field::RowCount()
{
	return rows;
}

int Field::ColumnCount()
{
	return columns;
}

void Field::send_log(int code, int x, int y, const char* file, const char* func, int line)
{
	struct Info info     = { __TIME__, file, line, func, code, x, y };
	LoggerPool& instance = LoggerPool::instance();
	instance.update( info );
}


Cell& Field::get_random_cell()
{
	std::random_device dev;
	std::mt19937       mtrng( dev() );

	std::uniform_int_distribution< std::mt19937::result_type > distx( 0, columns - 1 );
	std::uniform_int_distribution< std::mt19937::result_type > disty( 0, rows - 1 );

	while ( true )
	{
		unsigned int x{ distx( mtrng ) };
		unsigned int y{ disty( mtrng ) };

		auto& cell{ cells[ x ][ y ] };

		if ( ctGrass == cell.clType ) // если ячейка ничем не занята
		{
			return cell;
		}
	}
}


int  Field::get_victory_condition()
{
	return victory_condition;
}


void Field::change_victory_condition(int value)
{
	victory_condition = value;
}

void Field::resize(int new_columns, int new_rows) 
{
	cells.resize( new_columns );
	for ( int i = 0; i < new_columns; ++i )
	{
		cells[ i ].resize( new_rows );
	}
	columns = new_columns;
	rows    = new_rows;
}