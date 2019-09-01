import React, { useState } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Card, Badge } from 'react-bootstrap'
import ReactTinyLink from 'react-tiny-link'
import { useDispatch, useSelector } from 'react-redux' 
import dnd from '../store/reducers/dndReducer';
import { dellLink } from '../store/actions/contentActions'
import { saveUserChanges } from '../store/actions/authRegActions'


export default function Link(props) {

  const {
    parentBlock,
    index,
    link: {
      id: id,
    },
    link: {
      link: link,
    },
  } = props

  const dispatch = useDispatch()
  const columns = useSelector(state => state.dnd.columns)
  const registration = useSelector(state => state.registration)
  const newUserState = {}
  newUserState.state = useSelector(state => state.dnd)
  let token = ''
  if (registration.token) token = registration.token
  
  const deleteLink = () => {
    const arrOfLinksIds = [...columns[parentBlock].linksIds]
    const isNoEmpty = arrOfLinksIds.length
    if (isNoEmpty) {
      for (let i = 0; i < isNoEmpty; i++) {
        if (arrOfLinksIds[i] === id) {
          arrOfLinksIds.splice(i, 1)
        }
      }
    }
    dispatch(dellLink({ parentBlock, arrOfLinksIds, id }))
  }

  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {(provided, snapshot) => (
        <Card
        {...provided.draggableProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        {...provided.dragHandleProps}
        >
            <Card.Body>
              <Badge 
                variant="danger"
                onClick={deleteLink}
              >
                Del
              </Badge>
              <ReactTinyLink
                cardSize="large"
                showGraphic={true}
                maxLine={5}        
                header={true}
                url={link}
              />
            </Card.Body>
        </Card>
      )}
    </Draggable>
  )
}
