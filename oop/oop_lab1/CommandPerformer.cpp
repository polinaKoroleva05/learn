#include <SFML/Window/Keyboard.hpp>
#include "CommandPerformer.h"
#include <iostream>
using namespace std::string_literals;

CommandPerformer::CommandPerformer( Controller& AController, FieldView& FldView, CommandReciever* cmd_recvr )
    : controller(AController), 
	fldView( FldView )
{
	cmd_handle = new CommandHandler( cmd_recvr );
	FileReader filereader( "instruction.txt"s, *cmd_handle );
	filereader.create_instruction();
}



// ��������� ������� ����������

CommandPerformer::~CommandPerformer() {
	delete cmd_handle;
}

void CommandPerformer::perform_cmd(commands code_cmd) {
	switch (code_cmd)
	{
	case cmdMoveDown: // ����
		controller.PlayerMove( 0, 1 );
		break;

	case cmdMoveUp:
		controller.PlayerMove( 0, -1 );
		break;

	case cmdMoveLeft:
		controller.PlayerMove( -1, 0 );
		break;

	case cmdMoveRight:
		controller.PlayerMove( 1, 0 );
		break;
	case cmdFinish: // ���������� ������
		fldView.Close();
		break;
	}
}



//void CommandPerformer::KeyToCmd( const sf::Keyboard::Key keycode )
//{
//	switch ( keycode )
//	{
//
//	case sf::Keyboard::Down: // ����
//		controller.PlayerMove(0, 1);
//		break;
//
//	case sf::Keyboard::Up:
//		controller.PlayerMove( 0, -1 );
//		break;
//
//	case sf::Keyboard::Left: 
//		controller.PlayerMove( -1, 0 );
//		break;
//
//	case sf::Keyboard::Right:
//		controller.PlayerMove( 1, 0 );
//		break;
//
//	case sf::Keyboard::N: // ����
//		controller.NewGame();
//		break;
//
//	case sf::Keyboard::Escape: // ���������� ������
//		fldView.Close();
//		break;
//	}
//}

bool CommandPerformer::NotEndGame() {
	int status = controller.fail_or_win();

	if (status == -1) {
		std::cout << "Oh no! \nYou spent all your health";
		return false;
	}
	if ( status == 1 )
	{
		std::cout << "You win! \nCongratulations";
		return false;
	}
	return true;
}

//
//void CommandPerformer::WaitCommand()
//{
//	sf::Event event;
//	commands  tmp_cmd;
//
//	while ( fldView.IsWork() && NotEndGame() ) // ������� ���� ���������
//	{
//		while ( fldView.GetEvent( event ) )
//		{
//			switch ( event.type )
//			{
//			case sf::Event::Closed: // ���������� ������
//				fldView.Close();
//				break;
//			}
//		}
//		//if ( tmp_cmd = cmd_handle->get_the_command() )
//		//{
//		//	perform_cmd( tmp_cmd );
//		//}
//		fldView.Draw(); // ����� ��� �� ������ ����
//	}
//}
//


void CommandPerformer::WaitCommand()
{
	commands tmp_cmd;

	while ( fldView.IsWork() && NotEndGame() ) // ������� ���� ���������
	{
		fldView.Draw(); // ����� ��� �� ������ ����
		if (tmp_cmd = cmd_handle->get_the_command()){
			perform_cmd( tmp_cmd );
		}
	}
}


//void CommandPerformer::WaitCommand()
//{
//	sf::Event event;
//
//	while ( fldView.IsWork() && NotEndGame()) // ������� ���� ���������
//	{
//		while ( fldView.GetEvent( event ) )
//			switch ( event.type )
//			{
//			case sf::Event::KeyPressed: // ������� ����������
//				KeyToCmd( event.key.code );
//				break;
//
//			case sf::Event::Resized: // the fldView.rndrWindow was resized
//				// doSomethingWithTheNewSize( event.size.width, event.size.height );
//				break;
//
//			case sf::Event::Closed: // ���������� ������
//				fldView.Close();
//				break;
//			}
//
//		fldView.Draw();	 // ����� ��� �� ������ ����
//	}
//}

/* //����� �������
* 
* 
void CommandPerformer::WaitCommand()
{
	sf::Event event;

	while ( fldView.IsWork() && NotEndGame()) // ������� ���� ���������
	{
		while ( fldView.GetEvent( event ) )

			if ( event.type = sf::Event::Closed)
			{
				// ���������� ������ ���� ���� �������
				fldView.Close();
				break;
			}
		fldView.Draw();	 // ����� ��� �� ������ ����
	}
}
 
 ���� ����� ������ ������� ���� ���� � ����, ����� �� ������������ ������������ ������� �������� :0
 � ������ �������.. �� ���� �����,����

 �� �� ���� �������� � ����, ����� ����� ����� ������� ������������ ���������, ����� ��

*/