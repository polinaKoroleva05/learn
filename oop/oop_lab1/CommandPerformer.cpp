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



// Обработка нажатий клавиатуры

CommandPerformer::~CommandPerformer() {
	delete cmd_handle;
}

void CommandPerformer::perform_cmd(commands code_cmd) {
	switch (code_cmd)
	{
	case cmdMoveDown: // вниз
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
	case cmdFinish: // завершение работы
		fldView.Close();
		break;
	}
}



//void CommandPerformer::KeyToCmd( const sf::Keyboard::Key keycode )
//{
//	switch ( keycode )
//	{
//
//	case sf::Keyboard::Down: // вниз
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
//	case sf::Keyboard::N: // вниз
//		controller.NewGame();
//		break;
//
//	case sf::Keyboard::Escape: // завершение работы
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
//	while ( fldView.IsWork() && NotEndGame() ) // главный цикл программы
//	{
//		while ( fldView.GetEvent( event ) )
//		{
//			switch ( event.type )
//			{
//			case sf::Event::Closed: // завершение работы
//				fldView.Close();
//				break;
//			}
//		}
//		//if ( tmp_cmd = cmd_handle->get_the_command() )
//		//{
//		//	perform_cmd( tmp_cmd );
//		//}
//		fldView.Draw(); // этого тут не должно быть
//	}
//}
//


void CommandPerformer::WaitCommand()
{
	commands tmp_cmd;

	while ( fldView.IsWork() && NotEndGame() ) // главный цикл программы
	{
		fldView.Draw(); // этого тут не должно быть
		if (tmp_cmd = cmd_handle->get_the_command()){
			perform_cmd( tmp_cmd );
		}
	}
}


//void CommandPerformer::WaitCommand()
//{
//	sf::Event event;
//
//	while ( fldView.IsWork() && NotEndGame()) // главный цикл программы
//	{
//		while ( fldView.GetEvent( event ) )
//			switch ( event.type )
//			{
//			case sf::Event::KeyPressed: // нажатие клавиатуры
//				KeyToCmd( event.key.code );
//				break;
//
//			case sf::Event::Resized: // the fldView.rndrWindow was resized
//				// doSomethingWithTheNewSize( event.size.width, event.size.height );
//				break;
//
//			case sf::Event::Closed: // завершение работы
//				fldView.Close();
//				break;
//			}
//
//		fldView.Draw();	 // этого тут не должно быть
//	}
//}

/* //новый вариант
* 
* 
void CommandPerformer::WaitCommand()
{
	sf::Event event;

	while ( fldView.IsWork() && NotEndGame()) // главный цикл программы
	{
		while ( fldView.GetEvent( event ) )

			if ( event.type = sf::Event::Closed)
			{
				// завершение работы если окно закроют
				fldView.Close();
				break;
			}
		fldView.Draw();	 // этого тут не должно быть
	}
}
 
 либо можно просто вынести этот цикл в мейн, чтобы не загромождать пространство лишними классами :0
 с другой стороны.. да хотя ладно,норм

 НЕ не буду выносить в мейн, пусть будет класс который контролирует отрисовку, круто же

*/