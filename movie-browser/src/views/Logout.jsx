import React from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'; // Import SweetAlert2 CSS
import { useAuth } from '../components/AuthContext/AuthContext';

const Logout = () => {
    const auth = useAuth();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to log out?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                auth.logout();
            }
        });
    };

    return (
        <>
            <button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
        </>
    );
}

export default Logout;
