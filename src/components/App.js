import React from 'react'
import AuthLogModal from './modals/AuthLogModal'
import MainPage from './MainPage'

export default function App() {
  const [modalShow, setModalShow] = React.useState(true);

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
