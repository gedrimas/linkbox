import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: solid 1px red;
  border-radius: 2px;
  padding: 8px;
  margin-buttom: 8px;
  background-color: ${props => props.isDragging ? 'lightgreen' : 'white'}
  display: flex;
`
const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`

export default function Link (props) {
  return (
    <Draggable
      draggableId={props.link.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Handle {...provided.dragHandleProps} />
          {props.link.description}
          <br />
          {props.link.link}
        </Container>
      )}
    </Draggable>
  )
}
