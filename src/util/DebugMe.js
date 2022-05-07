import React, { useContext } from 'react'; 

import { AuthContext } from '../context/auth';

function DebugMe(value) {
    const { user } = useContext(AuthContext);
    console.log(`USEr is ${JSON.stringify(user)}`) ;
    console.log(`value is ${JSON.stringify(value)}`);

    return (
        null
    );
}

export default DebugMe;