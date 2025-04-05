#pragma once

// Отрисовка Field (игровой карты)

//--

#include <SFML/Graphics.hpp>

#include "CellView.h"
#include "Field.h"
#include "Player.h"


class FieldView
{
	private:
	sf::RenderWindow rndrWindow; // окно приложения, где все отрисовывается

	std::vector< CellView > CellViews; // рисовальщики ячеек в порядке описанном в CellType

	Field& field;
	Player& player;

	sf::Font fontStatus;
	void DrawStatus(); // отрисовка строки статуса

	public:

	FieldView( Player& APlayer, Field& AField ); // конструктор

	bool IsWork();
	bool GetEvent( sf::Event& event );

	void        Draw(); // отрисовка поля
	inline void Close() { rndrWindow.close(); };
};
