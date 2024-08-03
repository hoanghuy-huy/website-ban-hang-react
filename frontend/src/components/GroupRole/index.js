import React from 'react';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { apiGetAllGroup } from '~/services/groupApiService';
import { apiGetAllRole, apiGetRoleByGroup } from '~/services/roleService';
import _ from 'lodash';
import { apiAssignGroupRole } from '~/services/groupRoleService';
const GroupRole = () => {
    const [dataGroup, setDataGroup] = useState([]);
    const [roles, setRoles] = useState([]);
    const [assignRoleByGroup, setAssignRoleByGroup] = useState([]);
    const [selectGroup, setSelectGroup] = useState('');
    useEffect(() => {
        fetchDataGetAllRole();
        fetchDataGetAllGroup();
        // eslint-disable-next-line
    }, []);

    const fetchDataGetAllGroup = async () => {
        let dataGroup = await apiGetAllGroup();

        if (dataGroup && dataGroup.EC === 0) {
            setDataGroup(dataGroup.DT);
        } else {
            toast.error(dataGroup.EM);
        }
    };

    const fetchDataGetAllRole = async () => {
        const res = await apiGetAllRole();

        if (res && res.EC === 0) {
            setRoles(res.DT);
        } else {
            toast(res.EM);
        }
    };

    const handleOnChangeInput = async (id) => {
        setSelectGroup(id);
        if (id) {
            let res = await apiGetRoleByGroup(id);

            if (res && res.EC === 0) {
                let data = builtDataRolesByGroup(res.DT.Roles, roles);
                setAssignRoleByGroup(data);
            } else {
                toast.error(res.EM);
            }
        }
    };

    const builtDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];

        if (allRoles && allRoles.length > 0) {
            // eslint-disable-next-line
            allRoles.map((role) => {
                let obj = {};
                obj.id = role.id;
                obj.url = role.url;
                obj.assigned = false;

                if (groupRoles && groupRoles.length > 0) {
                    obj.assigned = groupRoles.some((role) => {
                        return role.url === obj.url;
                    });
                }

                result.push(obj);
            });
            return result;
        }
    };

    const handleOnChangeSelected = (value) => {
        let _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);

        let foundIndex = _assignRoleByGroup.findIndex((item) => +item.id === +value);
        if (foundIndex > -1) {
            _assignRoleByGroup[foundIndex].assigned = !_assignRoleByGroup[foundIndex].assigned;
        }

        setAssignRoleByGroup(_assignRoleByGroup);
    };

    const handleOnClickSubmit = async () => {
        //data = {groupid : , Group_Role[{groupID},{roleId}]}
        let result = {};
        let _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
        result.groupId = +selectGroup;
        let filterRoleAssign = _assignRoleByGroup.filter((item) => {
            return item.assigned === true;
        });

        let dataGroupRole = filterRoleAssign.map((item) => {
            let data = { groupId: +selectGroup, roleId: item.id };

            return data;
        });
        result.groupRole = dataGroupRole;

        const res = await apiAssignGroupRole(result);

        if(res && res.EC === 0) {
            toast.success(res.EM)
            
        }else {
            toast.error(res.EM)
        }
    };

    return (
        <div className="group-role-container">
            <div className="container">
                <h4>Group Role</h4>
                <div className="grid-3 col-12 col-sm-6 form-group mt-3">
                    <label>
                        Select group (<span className="red"> * </span>) :{' '}
                    </label>

                    <select className={'form-select'} onChange={(event) => handleOnChangeInput(event.target.value)}>
                        <option value="">Please choose your group</option>
                        {dataGroup.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <hr />
                {assignRoleByGroup && assignRoleByGroup.length > 0 ? (
                    <>
                        <div className="roles my-5">
                            <h5 className="mb-3">Assign Role</h5>
                            {assignRoleByGroup &&
                                assignRoleByGroup.length > 0 &&
                                assignRoleByGroup.map((item, index) => {
                                    return (
                                        <div className="form-check" key={index}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={item.assigned}
                                                value={item.id}
                                                onChange={(e) => handleOnChangeSelected(e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                {item.url}
                                            </label>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="mt-3">
                            <button className="btn btn-warning" onClick={() => handleOnClickSubmit()}>
                                Save
                            </button>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default GroupRole;
