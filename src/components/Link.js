import React, {useState} from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import Card from 'react-bootstrap/Card'
import ReactTinyLink from "react-tiny-link" 

const Container = styled.div`
  border: solid 1px green;
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

  const [redirect, setRedirect] = useState(false)
  const [isDoubleClick, setDoubleClick] = useState(false)
  const [firstClick, setfirstClick] = useState(false)


  function handleClick(e) {
    e.preventDefault()
    setDoubleClick(false)
    setRedirect(false)
    setfirstClick(true) 

    const elem = e.target
    setTimeout(() =>{
      setRedirect(elem)
    }, 1000)
  }

  const handleDbClick = (e) => {
    e.preventDefault()
    setDoubleClick(true)
  }
  
  if(redirect && !isDoubleClick && firstClick){
    const event = document.createEvent('MouseEvents')
    event.initEvent('click', false, false)
    setfirstClick(false) 
    redirect.dispatchEvent(event)
  }else{
    console.log('yes')
  }

  return (
    <Draggable
      draggableId={props.link.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Card
        {...provided.draggableProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        {...provided.dragHandleProps}
        >
            <Card.Body
            >
              <ReactTinyLink
                cardSize="large"
                showGraphic={true}
                maxLine={5}        
                header={true}
                url={props.link.link}
              />
            </Card.Body>
        </Card>
      )}
    </Draggable>
  )
}
