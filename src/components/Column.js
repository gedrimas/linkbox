
import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Link from './Link'
import AddNewLinAndDelBlockkModals from './modals/AddNewLinAndDelBlockkModals'

const StyledCard = styled(Card)`
  margin: 8px;
  background-color: white;
  width: 30vw;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  background-color: #FFF267;
`

const StyledCardTitle = styled(Card.Title)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px;
  color: #0B1DC9;
  font-weight: 700;
`

const TaskList = styled.div`
  padding: 4px;
  transition: background-color 0.2s ease;
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'inherit'}
  flex-grow: 1;
  min-height: 100px;
`

export default function Column(props) {
  const {
    links,
    index,
    isDropDisabled,
    column: {
      id: id
    },
    column: {
      title: title
    },
  } = props

  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {provided => (
        <StyledCard
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Card.Body>
            <StyledCardTitle
              {...provided.dragHandleProps}
            >
              <h3>{title}</h3>
              <AddNewLinAndDelBlockkModals parentColumnId={id} />
            </StyledCardTitle>
            <Droppable
              droppableId={id}
              isDropDisabled={isDropDisabled}
            >
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {links.map((linkItem, indexItem) =>
                    <Link 
                      key={linkItem.id}
                      link={linkItem}
                      index={indexItem}
                      parentBlock={id}
                    />
                  )}
                  {provided.placeholder}
                </TaskList>
              )
              }
            </Droppable>
          </Card.Body>
        </StyledCard>
      )}
    </Draggable>
  )
}