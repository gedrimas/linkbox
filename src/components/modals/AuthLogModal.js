import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import {
  Modal,
  Button,
  Tab,
  Row,
  Col,
  Nav,
  InputGroup,
  FormControl,
  Badge,
} from 'react-bootstrap'

import { registration, authorization, signOut, showSignModal } from '../../store/actions/authRegActions'

const StyledBadgeDiv = styled.div`
  position: fixed;
  margin: 5px 0px 0px 125px;
  z-index: 999;
`

export default function AuthLogModal(props) {
  const [regName, setRegName] = useState('')
  const [regPass, setRegPass] = useState('')
  const [logName, setLogName] = useState('')
  const [logPass, setLogPass] = useState('')
  const [logButtonText, setLogButtonText] = useState('Sign in')
  const [textButton, setTextButton] = useState('Registration')
  const [cookies, setCookies] = useCookies(['linkBoxName', 'linkBoxPass'])
  const [isFetchData, setFetchData] = useState(true)

  const dispatch = useDispatch()
  const token = useSelector(state => state.registration.token)
  const state = useSelector(st => st)

  const signInOrOutAndDellCookies = () => {
    if (logButtonText === 'Sign in'){
      dispatch(showSignModal())
    }else{
      dispatch(signOut())
      setCookies('linkBoxName', '')
      setCookies('linkBoxPass', '')
    }
  }

  useEffect(() => {
    if (token) {
      setLogButtonText('Sign out')
    } else {
      setLogButtonText('Sign in')
    }
  })

  if (token && isFetchData && !cookies.linkBoxPass && !cookies.linkBoxName) {
    setCookies('linkBoxName', logName || regName)
    setCookies('linkBoxPass', logPass || regPass)
    setFetchData(false)
  }

  const trimInputs = (select) => {
    if (select === 'first') {
      setTextButton('Registration')
      setLogName('')
      setLogPass('')
    } else if (select === 'second') {
      setTextButton('Authorization')
      setRegName('')
      setRegPass('')
      setLogName('')
      setLogPass('')
    }
  }

  const handleRegistration = () => {
    dispatch(registration({ regName, regPass }))
    //setRegName('')
    //setRegPass('')
    props.setModalShow(false)
  }

  const handleAuthorization = () => {
    dispatch(authorization({ logName, logPass }))
    //setLogName('')
    //setLogPass('')
    props.setModalShow(false)
    console.log('2222222222222222222')
  }


  return (
    <>
      <StyledBadgeDiv>
        <Badge
          pill
          variant="dark"
          onClick={signInOrOutAndDellCookies}
        >
          {logButtonText}
        </Badge>
      </StyledBadgeDiv>
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
          <Button
            onClick={textButton === 'Registration'
              ? handleRegistration
              : handleAuthorization}
          >
            {textButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
