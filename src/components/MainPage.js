import React, {useState} from 'react'
import initialData from '../data/initial-data'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import styled from 'styled-components'
import Column from './Column'

const Container = styled.div`
  display: flex;
`
export default function MainPage() {
  const [data, setData] = useState(initialData)

  return(
    <DragDropContext>
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