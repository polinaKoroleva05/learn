#pragma once

// ��������� ������

#include <SFML/Graphics.hpp>
#include "Cell.h"

constexpr int CellPixelSize{ 100 }; // ������ ������ ��� �����������


class CellView
{
	protected:
	sf::Sprite  sprite;
	sf::Texture texture;

	bool DogHere; // ��� �� �������

	public:
	void Draw( int x, int y, sf::RenderWindow& fldView ); // ��������� ����
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

// Barb - ���
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