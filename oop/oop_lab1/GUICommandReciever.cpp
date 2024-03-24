#include "CommandReciever.h"
#include <SFML/Graphics.hpp>
#include <SFML/Window/Keyboard.hpp>

GUICommandReciever::GUICommandReciever( FieldView& fldvw ) : fldView(fldvw)
{

}

char GUICommandReciever::recieve()
{
	sf::Event event;
	char      result = 0;
	if (fldView.GetEvent(event)) {
		if (event.type == sf::Event::KeyPressed) {
			result = (int)event.key.code + (int)'A';
			return result;
		}
	}
}

