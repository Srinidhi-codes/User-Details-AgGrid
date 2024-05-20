import React, { useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import { request } from '../utils/fetchApi';
import { getAllUsers, updateUser } from '../redux/userSlice';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';


const EditComp = ({ onEdit, value }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <EditIcon onClick={onEdit} style={{ cursor: 'pointer' }} />
            <span style={{ marginLeft: '8px' }}>{value}</span>
        </div>
    );
};

const DeleteComp = ({ data, onDelete }) => {
    return (
        <><DeleteOutlineIcon onClick={() => onDelete(data)} /></>
    )
}

const Home = () => {
    const { userData } = useSelector(state => state.users);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [rowData, setRowData] = useState(userData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                };
                const allUsersResponse = await request('/user', "GET", options);
                if (allUsersResponse.success === true) {
                    dispatch(getAllUsers(allUsersResponse.userData));
                } else {
                    toast.error('Error fetching all users:', allUsersResponse.error);
                }
            } catch (error) {
                toast.error('Error fetching all users:', error);
            }
        };

        fetchData();
    }, [dispatch, token]);

    const handleCellValueChanged = async (params) => {
        try {
            const { colDef, data, newValue } = params;
            const updatedUserData = {
                _id: data._id,
                [colDef.field]: newValue,
                newPassword: newValue
            };
            const options = {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            };
            const res = await request(`/user/${updatedUserData._id}`, "PUT", options, updatedUserData);
            dispatch(updateUser({ id: updatedUserData._id, updatedData: updatedUserData }))
            toast.success(res.message)

        } catch (error) {
            toast.error('Error updating user data:', error);
        }
    };

    const handleDeleteUser = async (user) => {
        try {
            const options = {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            };
            const data = await request(`/user/${user._id}`, "DELETE", options);
            toast.success(data.message)

        } catch (error) {
            toast.error('Error deleting user:', error);
        }
    };

    const defaultColDef = useMemo(() => {
        return {
            filter: true,
            editable: true,
            floatingFilter: true
        };
    }, []);

    const colDefs = useMemo(() => {
        return [
            { field: 'Action', cellRenderer: (params) => <DeleteComp data={params.data} onDelete={handleDeleteUser} />, editable: false },
            {
                field: "firstName", cellRenderer: (params) => (
                    <EditComp
                        onEdit={() => handleCellValueChanged(params.data)}
                        value={params.value}
                    />
                )
            },
            {
                field: 'lastName', cellRenderer: (params) => (
                    <EditComp
                        onEdit={() => handleCellValueChanged(params.data)}
                        value={params.value}
                    />
                )
            },
            {
                field: 'gender', cellRenderer: (params) => (
                    <EditComp
                        onEdit={() => handleCellValueChanged(params.data)}
                        value={params.value}
                    />
                )
            },
            {
                field: 'dob', cellRenderer: (params) => (
                    <EditComp
                        onEdit={() => handleCellValueChanged(params.data)}
                        value={params.value}
                    />
                )
            },
            {
                field: 'country', cellRenderer: (params) => (
                    <EditComp
                        onEdit={() => handleCellValueChanged(params.data)}
                        value={params.value}
                    />
                )
            },
            {
                field: 'state', cellRenderer: (params) => (
                    <EditComp
                        onEdit={() => handleCellValueChanged(params.data)}
                        value={params.value}
                    />
                )
            },
            {
                field: 'city', cellRenderer: (params) => (
                    <EditComp
                        onEdit={() => handleCellValueChanged(params.data)}
                        value={params.value}
                    />
                )
            },
            {
                field: 'zip', cellRenderer: (params) => (
                    <EditComp
                        onEdit={() => handleCellValueChanged(params.data)}
                        value={params.value}
                    />
                )
            },
            {
                field: 'areaOfInterest', cellRenderer: (params) => (
                    <EditComp
                        onEdit={() => handleCellValueChanged(params.data)}
                        value={params.value}
                    />
                )
            },
            {
                field: 'email', cellRenderer: (params) => (
                    <EditComp
                        onEdit={() => handleCellValueChanged(params.data)}
                        value={params.value}
                    />
                )
            },
            {
                field: 'password', cellRenderer: (params) => (
                    <EditComp
                        onEdit={() => handleCellValueChanged(params.data)}
                        value={params.value}
                    />
                ), minWidth: 350
            },
            { field: 'createdAt', hide: true },
            { field: 'updatedAt', hide: true }
        ];
    }, []);

    return (
        <>
            <Navbar />
            <div className='ag-theme-quartz' style={{ height: 1230 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={5}
                    paginationPageSizeSelector={[5, 20]}
                    onCellValueChanged={handleCellValueChanged}
                />
            </div>
        </>
    );
};

export default Home;
