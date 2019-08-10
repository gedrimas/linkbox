import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Modal,
  Button,
  Tab,
  Row,
  Col,
  Nav,
  InputGroup,
  FormControl,
} from 'react-bootstrap'

import { registration } from '../../store/actions/authRegActions'

export default function AuthLogModal(props) {
  const [regName, setRegName] = useState('')
  const [regPass, setRegPass] = useState('')
  const [logName, setLogName] = useState('')
  const [logPass, setLogPass] = useState('')
  const dispatch = useDispatch()

  const trimInputs = (select) => {
    if (select === 'first') {
      setLogName('')
      setLogPass('')
    } else if (select === 'second') {
      setRegName('')
      setRegPass('')
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    eventKey="first"
                    onSelect={(selected) => { trimInputs(selected) }}
                  >
                      Registr your new LinkBox
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="second"
                    onSelect={(selected) => { trimInputs(selected) }}
                  >
                      Enter to your LinkBox
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-default">set your login</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      onChange={e => setRegName(e.target.value)}
                      value={regName}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-default">set your password</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      onChange={e => setRegPass(e.target.value)}
                      value={regPass}
                    />
                  </InputGroup>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      onChange={e => setLogName(e.target.value)}
                      value={logName}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-default">Password</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      onChange={e => setLogPass(e.target.value)}
                      value={logPass}
                    />
                  </InputGroup>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(registration({ regName, regPass }))}>Register</Button>
      </Modal.Footer>
    </Modal>
  )
}
