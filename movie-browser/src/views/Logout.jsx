import React from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'; // Import SweetAlert2 CSS for styling
import { useAuth } from '../components/AuthContext/AuthContext';

const Logout = () => {
    const auth = useAuth(); // Hook to access authentication context

    // Handle logout action with confirmation dialog
    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to log out?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel',
            ariaLabel: 'Logout Confirmation' // ARIA label for better accessibility
        }).then((result) => {
            if (result.isConfirmed) {
                auth.logout(); // Call logout function from AuthContext
            }
        });
    };

    return (
        <>
            <button 
                className='btn btn-outline-danger' 
                onClick={handleLogout}
                aria-label="Logout" // ARIA label to describe the button action
            >
                Logout
            </button>
        </>
    );
};

export default Logout;
