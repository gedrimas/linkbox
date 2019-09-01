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
  const [wornMessage, setWornMessage] = useState('')

  const allLinks = useSelector(state => state.dnd.links)
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const delLink = () => {

    if (show) {
      setShow(false)
    }
  }

  const saveLink = () => {

    for (let key in allLinks) {
      const { link: oneOfLinks } = allLinks[key]
      if(oneOfLinks === link) {
        setWornMessage('This link is already exist in your linkbox')
        return
      }
    }

    const linkId = uniqid()
    const newLink = {
      [linkId]: {
        id: linkId,
        link,
      },
    }

    const isValidLink = () => {
      if (link) {
        dispatch(addLink({ newLink, parentColumnId, linkId }))
        setBlockTitle('')
        setShow(false)
      }
    }

    isValidLink()
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
          <p>{wornMessage}</p>
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
