import React, { useState, useContext } from "react";
import { Grid, List } from 'semantic-ui-react';
import { AuthContext } from "../context/auth";
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router';

const GET_EPICS = gql`
  query GetEpics($projectKey: String!) {
    jira(projectKey: $projectKey) {
      id
      key
      total
      url    
      fields {
        summary
        description
      }    
    }
  }
`;


function JiraConfig() {    
    const [projectKey, setProjectKey] = useState("TES")    
    const { user } = useContext(AuthContext);
    const { data, loading, error } = useQuery(GET_EPICS, {
        variables: { projectKey }
    })    
    
    let navigate = useNavigate();
    
    if (!user) { navigate("/login")}
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    return (      
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Jira Config</h1>                
                
            </Grid.Row>        
            <Grid.Row>
              <p>Pulling in some data from Jira to show that it works </p>
            </Grid.Row>
            <Grid.Row>                                
                <List>              
                    {
                    Object.values(data.jira).map((key, index) => ( 
                      <List.Item key={index}> {key.key} and {key.fields.summary}</List.Item> 
                    ))
                  }
                </List>
            </Grid.Row>
        </Grid>
        
    );
}

export default JiraConfig;
