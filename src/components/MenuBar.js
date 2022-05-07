import React, { useContext, useState } from 'react';
import { Menu, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const pathname = window.location.pathname;
    
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);        

    const menuBar = user ? (
        <>        
        <Menu pointing secondary size="massive" color="teal">                        
            <Menu.Item><Label color='black' horizontal size="big">{user.orgName}</Label></Menu.Item>
            <Menu.Item 
                data-cy="epicsMenu" 
                name="epics" 
                onClick={handleItemClick}
                active={activeItem === "epics"} 
                as={Link} to={`/${user.orgName}/epics`} 
            />
            
            <Menu.Menu position="right">
                <Menu.Item
                    data-cy="loggedInUsername" 
                    name={user.username} 
                    active={activeItem === `${user.username}`} 
                    onClick={handleItemClick}
                    as={Link} 
                    to={`/${user.orgName}/${user.username}`} 
                />
                <Menu.Item name="logout" onClick={logout} />               
            </Menu.Menu>
        </Menu>
        </>
    ) : (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item 
                name="home"
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />
            
            <Menu.Menu position="right">                           
                <Menu.Item
                    name="login"
                    active={activeItem === "login"}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                />
                <Menu.Item
                    name="register"
                    active={activeItem === "register"}
                    onClick={handleItemClick}
                    as={Link}
                    to="/register"
                />
            </Menu.Menu>
        </Menu>
    );
    
    return menuBar;            
}

export default MenuBar;