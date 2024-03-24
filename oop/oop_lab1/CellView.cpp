#include "CellView.h"



void CellView::Draw( int x, int y, sf::RenderWindow& fldView ) // отрисовка поля
{
	sprite.setPosition( (float)x * CellPixelSize, (float)y * CellPixelSize );
	fldView.draw( sprite ); // draw the sprDog
}

//отрисовка наследников

CellViewDog::CellViewDog()
{
	texture.loadFromFile( ".\\Images\\Dog.png" );
	sprite.setTexture( texture, true );
}

CellViewGrass::CellViewGrass()
{
	texture.loadFromFile( ".\\Images\\Grass.png" );
	sprite.setTexture( texture, true );
}

CellViewRock::CellViewRock()
{
	texture.loadFromFile( ".\\Images\\Rock.png" );
	sprite.setTexture( texture, true );
}

CellViewBarb::CellViewBarb()
{
	texture.loadFromFile( ".\\Images\\Thorn.png" );
	sprite.setTexture( texture, true );
}

CellViewBone::CellViewBone()
{
	texture.loadFromFile( ".\\Images\\Bone.png" );
	sprite.setTexture( texture, true );
}


CellViewCrystal::CellViewCrystal()
{
	texture.loadFromFile( ".\\Images\\flowers.png" );
	sprite.setTexture( texture, true );
}

CellViewBoneGround::CellViewBoneGround()
{
	texture.loadFromFile( ".\\Images\\bone_in_ground.png" );
	sprite.setTexture( texture, true );
}

CellViewMap::CellViewMap()
{
	texture.loadFromFile( ".\\Images\\map.png" );
	sprite.setTexture( texture, true );
}
