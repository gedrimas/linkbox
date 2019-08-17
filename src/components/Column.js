
import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import styled from 'styled-components'
import {Droppable, Draggable} from 'react-beautiful-dnd'
import Link from './Link'

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

export default function Column (props) {

  /* const [redirect, setRedirect] = useState(false)
  const [isDoubleClick, setDoubleClick] = useState(false)

  function handleClick(e) {
    e.preventDefault()
    setDoubleClick(false)
    setRedirect(false) 

    const elem = e.target
    setTimeout(() =>{
      setRedirect(elem)
    }, 1000)
  }

  const handleDbClick = (e) => {
    e.preventDefault()
    setDoubleClick(true)
  }
  
  if(redirect && !isDoubleClick){
    const event = document.createEvent('MouseEvents')
    event.initEvent('click', false, false)
    redirect.dispatchEvent(event)
  }else{
    console.log('yes')
  } */

    return(
      <Draggable 
        draggableId={props.column.id} 
        index={props.index}
      >
        {(provided) => (
          <StyledCard
          {...provided.draggableProps}
          ref={provided.innerRef}
          >
            <Card.Body>
              <StyledCardTitle 
                {...provided.dragHandleProps}>
                <h3>{props.column.title}</h3>
                <ColumnControlBlock>
                  <Badge variant="success">Add</Badge>
                  <Badge variant="danger" style={{width:'100%'}}>Del</Badge>
                </ColumnControlBlock>
              </StyledCardTitle>
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
                        <Link key={link.id} link={link} index={index} />
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