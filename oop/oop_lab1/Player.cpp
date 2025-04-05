#include "Player.h"

Player::Player( int health, int experience, int level )
    : hp( health ), 
	exp( experience ), 
	level( level ) {}

int Player::get_health() const
{
	return hp;
}
int Player::get_exp() const
{
	return exp;
}
int Player::get_level() const
{
	return level;
}

void Player::change_health( int health )
{
	hp += health;
}
void Player::add_exp( int exp )
{
	this->exp += exp;
}
void Player::change_level( int level )
{
	this->level += level;
}
