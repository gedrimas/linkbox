
import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Link from './Link'
import AddNewLinkModal from './modals/AddNewLinkModal'

const StyledCard = styled(Card)`
  margin: 8px;
  background-color: white;
  width: 220px;
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
const ColumnControlBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const AddLinkButton = styled.button`
  color: green;
  border: none;
  background: none;
  margin-right: 8px;
`
const DellColumnButton = styled.button`
  color: red;
  border: none;
  background: none;
`

export default function ColumnUser(props) {
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

  console.log('links', links)

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
              <AddNewLinkModal parentColumnId={id} />
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