import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function ModalErrorPurchaseItem({ show, handleHide }) {
    return (
        <Modal size="sm" className="d-flex align-items-center" show={show} onHide={() => handleHide()}>
            <Modal.Body className="d-flex gap-1">
                <InfoOutlinedIcon sx={{ color: 'var(--primary-color) !important' }} />
                <div>Bạn vẫn chưa chọn sản phẩm nào để mua</div>
            </Modal.Body>
            <Modal.Footer>
                <div onClick={() => handleHide()}>
                    <Button outline>OK, đã hiểu</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalErrorPurchaseItem;
