import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import './RoleUser.scss';
import { toast } from 'react-toastify';
import { apiCreateRole } from '~/services/roleService';
import RoleTable from './RoleTable';

const RoleUser = () => {
    const defaultRoleChild = { url: '', description: '', isValid: true };
    const childRef = useRef();
    
    const [listRole, setListRole] = useState({
        child: defaultRoleChild,
    });

    const handleOnChangeInputs = (name, value, key) => {
        const _listRoleChild = _.cloneDeep(listRole);

        _listRoleChild[key][name] = value;
        _listRoleChild[key]['isValid'] = true;
        setListRole(_listRoleChild);
    };
    const handleAddNewRoleChild = () => {
        const _listRoleChild = _.cloneDeep(listRole);
        const id = uuidv4();
        _listRoleChild[id] = defaultRoleChild;
        setListRole(_listRoleChild);
    };

    const handleDeleteRoleChild = (key) => {
        const _listRoleChild = _.cloneDeep(listRole);
        delete _listRoleChild[key];
        setListRole(_listRoleChild);
    };

    const handleSaveRole = async () => {
        const _listRoleChild = _.cloneDeep(listRole);

        let obj = Object.entries(listRole).find(([key, value]) => {
            return listRole[key]['url'] === '';
        });

        if (obj) {
            let key = obj[0];

            _listRoleChild[key]['isValid'] = false;

            setListRole(_listRoleChild);
            toast.error('Input can not empty');
        } else {
            const res = await apiCreateRole(listRole);

            if (res && res.EC === 0) {
                toast.success(res.EM);
                childRef.current.fetchData()
            } else {
                toast.error(res.EM);
            }
        }
    };

    return (
        <div className="container">
            <div className="role-container">
                <h4 className="role-title mb-3">Add new role</h4>
                <div className="role-parent col-12">
                    {Object.entries(listRole).map(([key, value], index) => {
                        return (
                            <div className="role-child row my-3" key={`child-${value}`}>
                                <div className="col-10 col-sm-5">
                                    <label>Url</label>
                                    <input
                                        className={value.isValid ? 'form-control' : 'form-control is-invalid'}
                                        value={value.url}
                                        onChange={(e) => handleOnChangeInputs('url', e.target.value, key)}
                                    />
                                </div>
                                <div className="col-10 col-sm-5">
                                    <label>Description</label>
                                    <input
                                        className="form-control"
                                        value={value.description}
                                        onChange={(event) =>
                                            handleOnChangeInputs('description', event.target.value, key)
                                        }
                                    />
                                </div>
                                <div className="col-2 role-actions">
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className="icon add"
                                        onClick={() => handleAddNewRoleChild()}
                                    />
                                    {index !== 0 && (
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="icon delete"
                                            onClick={() => handleDeleteRoleChild(key)}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    <button className="btn btn-success mt-3" onClick={() => handleSaveRole()}>
                        Save
                    </button>
                </div>
            </div>
            <hr />
            <div className="role-body my-3">
                <RoleTable title="List Current Roles" ref={childRef}/>
            </div>
        </div>
    );
};

export default RoleUser;
