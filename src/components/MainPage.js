import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Column from './Column'
import { 
  moveColumn,
  moveLinkInsideColumn, 
} from '../store/actions/dndActions'

const Container = styled.div`
  display: flex;
`
export default function MainPage() {
  const [startColumnIndex, setStartColumnIndex] = useState()

  const data = useSelector(state => state.dnd)
  const dispatch = useDispatch()
  
  const onDragStart = (start) => {
    const startColumn = data.columnOrder.indexOf(start.source.droppableId)
    setStartColumnIndex(startColumn)
  }

  const onDragUpdate = (update) => {
    const { destination } = update
  }

  const onDragEnd = (result) => {

    setStartColumnIndex(null)

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
      const newColumnOrder = Array.from(data.columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)
      dispatch(moveColumn(newColumnOrder))
      return
    }

    const start = data.columns[source.droppableId]
    const finish = data.columns[destination.droppableId]

    console.log('start', start)
    console.log('finish', finish)


    if(start === finish){
      const newLinksIds = Array.from(start.linksIds)
      newLinksIds.splice(source.index, 1)
      newLinksIds.splice(destination.index, 0, draggableId)
      
      const newColumn = {
        ...start, 
        linksIds: newLinksIds,
      }
      dispatch(moveLinkInsideColumn(start.id, newLinksIds))
/*       const newState = {
        ...this.state, 
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        }
      }
  
      this.setState(newState) */
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
      <Droppable 
        droppableId="all-columns"
        direction="horizontal"
        type="column"
        >
        {provided => (
          <Container
          {...provided.droppableProps}
          ref={provided.innerRef}
          >
          {console.log('data.columnOrder', data.columnOrder)}
          {console.log('data', data)}

            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId]
              const links = column.linksIds.map(linkId => data.links[linkId])

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
