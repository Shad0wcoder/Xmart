import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

const AdminPanel = () => {
    const { user, role } = useContext(AppContext);
    
    if (role !== 'admin') {
        return <div>You do not have access to this page.</div>;
    }

    return (
        <div>
            <h1>Admin Panel</h1>
            {/* Admin-specific content goes here */}
        </div>
    );
};

export default AdminPanel;
