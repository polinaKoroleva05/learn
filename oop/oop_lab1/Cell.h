#pragma once
#include "Event.h"
#include <SFML/Graphics.hpp>

//--

enum CellType
{
	ctRock,
	ctBarb, // шип
	ctBone, // кость
	сtCrystal,
	ctMap,
	ctGrass, // трава
	ctDog,
	ctBoneGround
};

class Cell
{
	public:
	Cell();
	void set_event( Event* event);
	void     update();
	CellType clType;
	bool PlayerHere;
	bool     passable;

	private:
	Event* event;
};

