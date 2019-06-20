import React from 'react'
import styled from 'styled-components'
import {Droppable, Draggable} from 'react-beautiful-dnd' 
import Task from './task'

const Contaner = styled.div`
  margin: 8px;
  border: 1px solid green;
  background-color: white;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'inherit'}
  flex-grow: 1;
  min-height: 100px;
`

export default function Column (props) {
    return(
      <Draggable draggableId={props.column.id} index={props.index}>
        {(provided) => (
          <Contaner
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Title {...provided.dragHandleProps}>
              {props.column.title}
            </Title>
              <Droppable 
                droppableId={props.column.id}
                isDropDisabled={props.isDropDisabled}
              >
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {props.links.map((link, index) => 
                      <Task key={link.id} task={link} index={index} />
                    )}
                    {provided.placeholder}
                  </TaskList>
                  )
                }
              </Droppable>
          </Contaner>
        )}
      </Draggable>
    )
}