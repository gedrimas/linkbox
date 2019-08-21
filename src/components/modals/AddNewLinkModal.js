import React, { useState } from 'react'
import uniqid from 'uniqid'
import { useDispatch, useSelector } from 'react-redux'
import {
  Modal,
  Button,
  Badge,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import styled from 'styled-components'

import { addLink } from '../../store/actions/contentActions'

const ColumnControlBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
export default function AddNewLinkModal(props) {
  const { parentColumnId } = props

  const [show, setShow] = useState(false)
  const [link, setBlockTitle] = useState('')

  const dispatch = useDispatch()
  const currentState = useSelector(state => state.dnd)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const saveLink = () => {
    const linkId = uniqid()
    const newLink = {
      [linkId]: {
        id: linkId,
        link,
      },
    }
    console.log('newlink', newLink)
    console.log('parentColumnId', parentColumnId)

    dispatch(addLink({ newLink, parentColumnId, linkId }))
    setBlockTitle('')
    setShow(false)
  }

  return (
    <>
      <ColumnControlBlock>
        <Badge
          variant="success"
          onClick={handleShow}
        >
          Add
        </Badge>
        <Badge
          variant="danger"
          style={{ width: '100%' }}
          onClick={handleShow}
        >
          Del
        </Badge>
      </ColumnControlBlock>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please, add new link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Link</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-describedby="basic-addon1"
              onChange={e => setBlockTitle(e.target.value)}
              value={link}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveLink}>
            Save link
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
