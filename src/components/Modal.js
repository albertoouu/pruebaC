import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import firebaseConfig from "../config";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc, getDocs, collection } from "firebase/firestore";

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const ModalU = ({ show, setShow, modalUserInfo }) => {

  const handleClose = () => setShow(false);
  const [date, setDate] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const timeStamp = Date.parse(date) + 107999000
    console.log(timeStamp)
    if (!timeStamp) {
      alert('Ingrese una fecha')
      return
    }
    const nuevaFecha = new Date(timeStamp) //La nueva fecha de pago
    console.log(nuevaFecha)
    console.log(modalUserInfo.id)
    let docRef = doc(db, `Users/${modalUserInfo.id}`)
    await updateDoc(docRef, {
      payday: modalUserInfo.payday,
      next_payday: nuevaFecha
      //--------------------------------------------falta agregar el push al arreglo de pagos
    })
    setDate({})
    handleClose()
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalUserInfo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ultimo Pago: {modalUserInfo.strPayday}</p>
          <p>Proximo pago: {modalUserInfo.strNext_payday}</p>
          <Form>
            <Form.Group>
              <Form.Label>Fecha del próximo pago</Form.Label>
              <Form.Control type="date" required id="date" onChange={e => setDate(e.target.value)} />
              <Form.Text className="text-muted">
                Fecha del próximo pago
              </Form.Text>
            </Form.Group>
            <Button variant="danger" type="submit" onClick={handleSubmit}>
              Actualizar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalU