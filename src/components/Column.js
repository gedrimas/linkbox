
import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
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
`

const TaskList = styled.div`
  padding: 4px;
  transition: background-color 0.2s ease;
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'inherit'}
  flex-grow: 1;
  min-height: 100px;
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
              <Card.Title {...provided.dragHandleProps}>
                {props.column.title}
              </Card.Title>
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

{/*                 <Card.Link 
                  href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background" 
                  target="_blank"
                  onClick={(e) => handleClick(e)}
                  onDoubleClick={(e) => handleDbClick(e)}
                >Card Link
                </Card.Link> */}

              </Card.Body>
          </StyledCard>
        )}
      </Draggable>
    )
}