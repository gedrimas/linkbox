import React from 'react'
import { useSelector } from 'react-redux'
import AuthLogModal from './modals/AuthLogModal'
import MainPage from './MainPage'
import MainPageUser from './MainPageUser'

export default function App() {
  const [modalShow, setModalShow] = React.useState(true);
  const userState = useSelector(state => state.userStateReducer)

  console.log('TEST', userState)
  return (
    <>
      <AuthLogModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MainPage />
    </>
  );
}
