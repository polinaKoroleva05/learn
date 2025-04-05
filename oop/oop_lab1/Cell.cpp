#include "Cell.h"
#include <iostream>
#include "LoggerPool.h"

Cell::Cell()
    : clType{ ctGrass },
      PlayerHere{ false },
      event{ nullptr },
      passable{true}
{}

void Cell::update()
{
    if (event) {
	    event->execute();
    }
}
    
    
    
void Cell::set_event( Event* event)
{
	Event* tmp = this->event;
    delete tmp;

	this->event = event;
}
