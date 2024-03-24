#pragma once

// ��������� Field (������� �����)

//--

#include <SFML/Graphics.hpp>

#include "CellView.h"
#include "Field.h"
#include "Player.h"


class FieldView
{
	private:
	sf::RenderWindow rndrWindow; // ���� ����������, ��� ��� ��������������

	std::vector< CellView > CellViews; // ������������ ����� � ������� ��������� � CellType

	Field& field;
	Player& player;

	sf::Font fontStatus;
	void DrawStatus(); // ��������� ������ �������

	public:

	FieldView( Player& APlayer, Field& AField ); // �����������

	bool IsWork();
	bool GetEvent( sf::Event& event );

	void        Draw(); // ��������� ����
	inline void Close() { rndrWindow.close(); };
};
