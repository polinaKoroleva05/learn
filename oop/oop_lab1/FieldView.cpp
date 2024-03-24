#include "FieldView.h"

bool FieldView::IsWork()
{
	return rndrWindow.isOpen();
}

bool FieldView::GetEvent( sf::Event& event )
{
	return rndrWindow.pollEvent( event );
}

// ��������� ������ �������
void FieldView::DrawStatus()
{
	std::string stdstr;
	stdstr += "Health: " + std::to_string( player.get_health() ) + "\n";
	stdstr += "Exp: " + std::to_string( player.get_exp() ) + "\n";
	stdstr += "Level: " + std::to_string( player.get_level() );

	sf::Text txtStatus;
	txtStatus.setFont( fontStatus );
	txtStatus.setString( stdstr.c_str() );


	rndrWindow.draw( txtStatus );
}

// ��������� ����
void FieldView::Draw()
{
	//-- ��������� ����� --

	const auto& cells{ field.get_field() };

	for ( int y = 0; y < field.RowCount(); y++ )
		for ( int x = 0; x < field.ColumnCount(); x++ )
		{
			const auto cell{ cells[ x ][ y ] }; // ���. �� ������
			const auto cellType{ cell.clType }; // ��� ������

			if ( ctGrass != cellType ) // �� �����, �� ��� ������ ����
				CellViews[ ctGrass ].Draw( x, y, rndrWindow );

			CellViews[ cellType ].Draw( x, y, rndrWindow );
		}

	CellViews[ ctDog ].Draw( player.xPos, player.yPos, rndrWindow ); // ��� �������

	DrawStatus(); // ��������� ������ �������

	rndrWindow.display(); //����������� �� �����
}

// �����������
FieldView::FieldView( Player& APlayer, Field& AField )
    : rndrWindow{ sf::VideoMode( AField.ColumnCount() * CellPixelSize, AField.RowCount() * CellPixelSize ), "SFML-labs by Polina" },
      field( AField ),
      player( APlayer )
{
	CellViews.emplace_back( *new CellViewRock() );
	CellViews.emplace_back( *new CellViewBarb() );
	CellViews.emplace_back( *new CellViewBone() );
	CellViews.emplace_back( *new CellViewCrystal() );
	CellViews.emplace_back( *new CellViewMap() );
	CellViews.emplace_back( *new CellViewGrass() );
	CellViews.emplace_back( *new CellViewDog() );
	CellViews.emplace_back( *new CellViewBoneGround() );

	fontStatus.loadFromFile( "arial.ttf" );
}
