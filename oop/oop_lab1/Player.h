#pragma once

class Player
{
	private:
	int hp;
	int exp;
	int level;

	public:

	int xPos; 
	int yPos;

	Player( int health, int experience, int level );

	int get_health() const;
	int get_exp() const;
	int get_level() const;

	void change_health( int health );
	void add_exp( int exp );
	void change_level( int level );
};
