#include <iostream>

#include "CommandPerformer.h" /* ������ ���� ������� � ������ ������������ */
#include "FieldView.h"     /* ��������� �������� ���� */
#include "CellView.h"
#include "Controller.h"
#include "LoggerPoolManager.h"


int main()
{
	LoggerPoolManager LoggerPM;
	LoggerPM.initialisate();
	Player player( 5, 0, 1 ); // �������� ���������
	Controller    controller( player);      // ������� � ��������
	Field&     field = controller.get_field();
	FieldView     fldView( player, field ); // ��� ��������� �������� ����

	//ConsoleCommandReciever input;
	GUICommandReciever input(fldView);


	controller.NewGame(); // ���������� ����� ���������

	CommandPerformer cmdPerf( controller, fldView, &input ); // ������ ���� ������� � ������ ������������



	cmdPerf.WaitCommand();


	return 0;
}
