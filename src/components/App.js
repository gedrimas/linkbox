import React, { useState } from 'react'
import AuthLogModal from './modals/AuthLogModal'
import MainPage from './MainPage'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { authorization, hideSignModal } from '../store/actions/authRegActions'




/* async function enterViaCookies (linkBoxName, linkBoxPass) {
  if(linkBoxName && linkBoxPass) {
    dispatch(authorization({ linkBoxName, linkBoxPass }))
  }
} */

export default function App() {
  const [modalShow, setModalShow] = useState(true);
  const [isFetchData, setFetchData] = useState(true)
  const [isShowSpinner, setShowSpinner] = useState(false)
  const AuthRegModalState = useSelector(state => state.registration.isModalShow)

  const dispatch = useDispatch()
  const [cookies] = useCookies()
  const { linkBoxName, linkBoxPass } = cookies
  console.log('cookies', cookies)

  if(linkBoxName && linkBoxPass && isFetchData) {
    console.log('linkBoxName', linkBoxName)
    console.log('linkBoxPass', linkBoxPass)
    const logName = linkBoxName
    const logPass = linkBoxPass
    
    dispatch(authorization({ logName, logPass }))
    //setModalShow(false)
    setFetchData(false)
    //setShowSpinner(true)
  }

  const hideModal = () => {
    dispatch(hideSignModal())
    setModalShow(false)
  }
  
  return (
    <>
      <AuthLogModal
        show={modalShow || AuthRegModalState}
        onHide={hideModal}
      />
      {

      }
      <MainPage />
    </>
  );
}
