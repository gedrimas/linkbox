import React, { useState } from 'react'
import uniqid from 'uniqid'
import { useDispatch } from 'react-redux'
import {
  Modal,
  Button,
  Badge,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import styled from 'styled-components'

import { addBlock } from '../../store/actions/contentActions'

const StyledBadgeDiv = styled.div`
position: fixed;
margin: 5px 0px 0px 5px;
z-index: 999;
`
export default function SetBlockTitleModal() {
  const [show, setShow] = useState(false)
  const [blockTitle, setBlockTitle] = useState('')
  const dispatch = useDispatch()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const saveBlock = () => {
    const blockId = uniqid()
    const newBlock = {
      [blockId]: {
        id: blockId,
        title: blockTitle,
        linksIds: [],
      },
    }
    dispatch(addBlock(newBlock))
    setBlockTitle('')
    setShow(false)
  }


  return (
    <>
      <StyledBadgeDiv>
        <Badge
          pill
          variant="light"
          onClick={handleShow}
          style={{ marginRight: '5px' }}
        >
          Create new block
        </Badge>

        <Badge
          pill
          variant="dark"
        >
          Log out
        </Badge>
      </StyledBadgeDiv>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please, enter title for your new block</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-describedby="basic-addon1"
              onChange={e => setBlockTitle(e.target.value)}
              value={blockTitle}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveBlock}>
            Create block
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
