import React, { useContext, Component, useState } from 'react'
import { Card, Icon, Image, Label, Grid, Menu, Segment } from 'semantic-ui-react'
import { useNavigate } from "react-router"
import { useParams } from "react-router-dom";
import moment from 'moment';
import {AuthContext} from "../context/auth";
import JiraConfig from "../pages/JiraConfig";

function Profile() {
    const [state, setState] = useState({ activeItem: 'bio' });
    const user = useContext(AuthContext);
    const { orgName, userName } = useParams();
    

    const handleItemClick = (e, { name }) => setState({ activeItem: name })
    const { activeItem } = state

    // if (loading) return <p>Loading ...</p>;
    // if (error){
    //     if (error?.message?.includes("Authorization token must be provided")) {
    //         navigate("/login")
    //     }    
    // }
    let navigate = useNavigate();
    if(!user) { navigate("/login")}

    const profile = (
        <>
        <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
            <Card.Header>
                {userName}                
            </Card.Header>
            <Card.Meta>
                <Label  color='purple' horizontal>{orgName}</Label>
                
            </Card.Meta>
            <Card.Description>
                Matthew is a musician living in Nashville.
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <a>
                <Icon name='user' />
                22 Friends
            </a>
            </Card.Content>
        </Card>
        <Card>
            <Card.Content>
                
            </Card.Content>
        </Card>
        </>
    )

    const sideBar = (
        <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name='bio'
              active={activeItem === 'bio'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='team'
              active={activeItem === 'team'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='integrations'
              active={activeItem === 'integrations'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='data'
              active={activeItem === 'data'}
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>            
            {activeItem === "bio" ? profile : ""}
            {activeItem === "team" ? "This is the Team" : ""}
            {activeItem === "integrations" ? (
                
                <JiraConfig />
                ) : 
                ("")}
            {activeItem === "data" ? "This is where you export your data" : ""}
          </Segment>
        </Grid.Column>
      </Grid>
    )

    
    return sideBar;
};

export default Profile;