import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { apiGetAllGroup } from '~/services/groupApiService';
import _ from 'lodash';
import { apiCreateNewUser, apiUpdateUser } from '~/services/userService';

function ModalUser(props) {
    const [dataGroup, setDataGroup] = useState([]);
    const [defaultIdGroup, setDefaultIdGroup] = useState('')

    const defaultDataUser = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        gender: '',
        groupId: defaultIdGroup,
    };

    const defaultValidInputs = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        gender: true,
        groupId: true,
    };

    const [userData, setUserData] = useState({});

    const [validInputs, setValidInputs] = useState({});

    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleValidInputs = () => {
        if (props.actions === 'EDIT') return true;

        setValidInputs(defaultValidInputs);
        let arr = ['email', 'phone', 'password'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(defaultValidInputs);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);
                toast.error(`Input ${arr[i]} can not empty`);
                check = false;
                break;
            }
        }

        if (check && !isEmailValid(userData.email)) {
            const _validInputs = _.cloneDeep(defaultValidInputs);
            _validInputs.email = false;
            setValidInputs(_validInputs);
            toast.error('Invalid email address');
            check = false;
        }

        return check;
    };

    const handleSubmitForm = async () => {
        let valid = handleValidInputs();
        if (valid) {
            let _userData = _.cloneDeep(userData);
            setUserData({ ..._userData, groupId: userData['groupId'] });
            const res = props.actions === 'EDIT' ? await apiUpdateUser(userData) : await apiCreateNewUser(userData);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                setUserData(defaultDataUser);
                props.fetchDataUser();
                props.handleClose(false);
            }else {
                toast.error(res.EM)
            }
        }
    };
    const dataGender = [
        {
            id: 0,
            name: 'Female',
        },
        {
            id: 1,
            name: 'Male',
        },
    ];

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        setValidInputs(defaultValidInputs);
        setUserData({});
        if (props.actions === 'EDIT') {
            let _userData = _.cloneDeep(props.user);
            let _groupId = props.user.Group ? props.user.Group.id : '';
            let _gender = props.user.gender;
            setUserData({ ..._userData, groupId: JSON.stringify(_groupId), gender: _gender ? '1' : '0' });
        }
        // eslint-disable-next-line
    }, [props.actions]);

    const fetchData = async () => {
        let dataGroup = await apiGetAllGroup();

        if (dataGroup && dataGroup.EC === 0) {
            setDataGroup(dataGroup.DT);
            if (dataGroup.DT.length > 0) {
                let group = dataGroup.DT[0].id;
                setDefaultIdGroup(group)
                setUserData({ ...defaultDataUser, groupId: group});
            }
        } else {
            toast.error(dataGroup.EM);
        }
    };

    const handleCloseUserModel = () => {
        props.handleClose();
        setUserData(defaultDataUser);
        setValidInputs(defaultValidInputs);
    };

    return (
        <>
            <Modal show={props.show} onHide={handleCloseUserModel} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-body row">
                        <div className="input grid-3 col-12 col-sm-6 form-group">
                            <label>
                                Email (<span className="red"> * </span>) :
                            </label>
                            <input
                                disabled={props.actions === 'EDIT' ? true : false}
                                type="text"
                                className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                                placeholder="email@example.com"
                                value={userData.email}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'email')}
                            />
                        </div>
                        <div className="input grid-3 col-12 col-sm-6 form-group ">
                            <label>
                                Phone (<span className="red"> * </span>) :
                            </label>
                            <input
                                disabled={props.actions === 'EDIT' ? true : false}
                                type="text"
                                className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                                placeholder="Phone"
                                value={userData.phone}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'phone')}
                            />
                        </div>
                        <div className="input grid-3 col-12 col-sm-6 form-group ">
                            <label>Username :</label>
                            <input
                                type="text"
                                className={'form-control'}
                                placeholder="Username"
                                value={userData.username}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'username')}
                            />
                        </div>
                        <div className="input grid-3 col-12 col-sm-6 form-group ">
                            <form>
                                {props.actions === 'EDIT' ? (
                                    ''
                                ) : (
                                    <>
                                        <label>
                                            Password (<span className="red"> * </span>) :
                                        </label>
                                        <input
                                            type="password"
                                            className={
                                                validInputs.password ? 'form-control' : 'form-control is-invalid'
                                            }
                                            placeholder="enter yor password"
                                            value={userData.password}
                                            autoComplete="on"
                                            onChange={(event) => handleOnChangeInput(event.target.value, 'password')}
                                        />
                                    </>
                                )}
                            </form>
                        </div>
                        <div className="input grid-3 col-12 col-sm-12 form-group ">
                            <label>Address :</label>
                            <input
                                type="text"
                                className={'form-control'}
                                placeholder="Address"
                                value={userData.address}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'address')}
                            />
                        </div>
                        <div className="grid-3 col-12 col-sm-6 form-group mt-3">
                            <label>Gender : </label>
                            <select
                                className={'form-select'}
                                defaultValue={userData.gender}
                                value={userData.gender}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'gender')}
                            >
                                {dataGender.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid-3 col-12 col-sm-6 form-group mt-3">
                            <label>
                                Group (<span className="red"> * </span>) :{' '}
                            </label>

                            <select
                                className={validInputs.groupId ? 'form-select' : 'form-select is-invalid'}
                                defaultValue={userData.groupId}
                                value={userData.groupId}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'groupId')}
                            >
                                {dataGroup.map((item, index) => (
                                    <option
                                        key={index}
                                        value={item.id}
                                        onChange={(event) => handleOnChangeInput(event.target.value, 'groupId')}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseUserModel()}>
                        Close
                    </Button>
                    {props.actions !== 'EDIT' ? (
                        <Button variant="primary" onClick={handleSubmitForm}>
                            Save Changes
                        </Button>
                    ) : (
                        <Button variant="warning" onClick={handleSubmitForm}>
                            Save Changes
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUser;
