import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Column from './Column'

const Container = styled.div`
  display: flex;
`
export default function MainPage() {
  const [startColumnIndex, setStartColumnIndex] = useState()

  const data = useSelector(state => state.dnd)
  
  const onDragStart = (start) => {
    const startColumn = data.columnOrder.indexOf(start.source.droppableId)
  }

  const onDragUpdate = (update) => {
    const { destination } = update
    console.log(destination)
  }

  const onDragEnd = (result) => {

    this.setState({
      homeIndex: null,
    })

    document.body.style.color = 'inherit'
    document.body.style.backgroundColor = 'inherit'
    const {destination, source, draggableId, type} = result 

    if (!destination) {
      return
    }

    if(destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if(type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      }

      this.setState(newState)
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    if(start === finish){
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
      
      const newColumn = {
        ...start, 
        taskIds: newTaskIds,
      }
  
      const newState = {
        ...this.state, 
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        }
      }
  
      this.setState(newState)
      return
    }

    //Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }
    
    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }
    this.setState(newState)
  }



  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="all-columns">
        {provided => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId]
              const links = column.linkIds.map(linkId => data.links[linkId])

              return (
                <Column
                  key={column.id}
                  column={column}
                  links={links}
                  index={index}
                />
              )
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}
