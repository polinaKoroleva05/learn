#pragma once

// Отрисовка ячейки

#include <SFML/Graphics.hpp>
#include "Cell.h"

constexpr int CellPixelSize{ 100 }; // размер ячейки при отображении


class CellView
{
	protected:
	sf::Sprite  sprite;
	sf::Texture texture;

	bool DogHere; // тут же собачка

	public:
	void Draw( int x, int y, sf::RenderWindow& fldView ); // отрисовка поля
};

class CellViewDog : public CellView
{
	public:
	CellViewDog();
};

class CellViewGrass : public CellView
{
	public:
	CellViewGrass();
};

class CellViewRock : public CellView
{
	public:
	CellViewRock();
};

// Barb - шип
class CellViewBarb : public CellView
{
	public:
	CellViewBarb();
};

class CellViewBone : public CellView
{
	public:
	CellViewBone();
};

class CellViewCrystal : public CellView
{
	public:
	CellViewCrystal();
};

class CellViewBoneGround : public CellView
{
	public:
	CellViewBoneGround();
};

class CellViewMap : public CellView
{
	public:
	CellViewMap();
};