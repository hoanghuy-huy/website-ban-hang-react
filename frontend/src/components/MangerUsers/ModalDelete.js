import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function ModalDelete(props) {


    return (
        <>
            <Modal size='large' show={props.showModalDelete} onHide={props.handleCloseModalDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Bạn muốn xóa người dùng này ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn muốn xóa {props.user.email}? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCloseModalDelete}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={props.handleDeleteUser}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;
