import React, { useContext } from 'react'; 
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';

import { AuthContext } from '../context/auth';

function AuthRoute({ component: Component, ...rest }) {
    const { user } = useContext(AuthContext);

    return (
        // <Route 
        //     {...rest}
        //     render={(props) => 
        //         user ? (
        //             <>
        //             <Route path="/" element={<Home />} />
        //             </>
        //         ):( 
        //             <>
        //             <Route path="/" element={<Component {...props} />} />
        //             </>
        //         )
        //     }
        // />
    //    (props) => user ? <Home /> : <Component {...props} />
    (props) => user ? <Home /> : <Register />
    );
}


export default AuthRoute;