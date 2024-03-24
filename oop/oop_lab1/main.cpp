#include <iostream>

#include "CommandPerformer.h" /* чтение всех событий и команд пользователя */
#include "FieldView.h"     /* отрисовка игрового поля */
#include "CellView.h"
#include "Controller.h"
#include "LoggerPoolManager.h"


int main()
{
	LoggerPoolManager LoggerPM;
	LoggerPM.initialisate();
	Player player( 5, 0, 1 ); // описание персонажа
	Controller    controller( player);      // команды в действие
	Field&     field = controller.get_field();
	FieldView     fldView( player, field ); // под отрисовку игрового поля

	//ConsoleCommandReciever input;
	GUICommandReciever input(fldView);


	controller.NewGame(); // заполнение карты объектами

	CommandPerformer cmdPerf( controller, fldView, &input ); // чтение всех событий и команд пользователя



	cmdPerf.WaitCommand();


	return 0;
}
