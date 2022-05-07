import React, { useState, useContext } from "react";
import { Form, Grid, List, Checkbox } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from "../context/auth";
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useParams } from "react-router-dom";
import { FETCH_EPICS_QUERY, CREATE_JIRA_EPIC_MUTATION, GET_JIRA_EPICS } from '../util/graphql';


function JiraEpics() {   
    const { orgName } = useParams(); 
    const [projectKey, setProjectKey] = useState("TES")    
    const { user } = useContext(AuthContext);
    const { data, loading, error } = useQuery(GET_JIRA_EPICS, {
        variables: { projectKey },
        errorPolicy: "all",
        fetchPolicy: "cache-first"
    });  
    const { values, onChange, onSubmit } = useForm(createEpicCallback, {                
        epicName: '',
        description: '',                
    });    

    const [createEpic] = useMutation(CREATE_JIRA_EPIC_MUTATION, {        
        variables: values,
        refetchQueries:[
            {query: FETCH_EPICS_QUERY,
                variables: { orgName }
            },
            {query: GET_JIRA_EPICS,
                variables: {projectKey}
            }
        ],
        awaitRefetchQueries: true,
        onError: (err) => {
            console.log(`Error ${err}`);
        }                
    });
            
    
    function createEpicCallback() { 
        createEpic();                   
    }  
    
    let navigate = useNavigate();
    
    if (!user) { navigate("/login")}
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    
    return (      
        <Grid >
            <Grid.Row className="page-title">
                <h1 className="epic-form">Import Epics</h1>                
                
            </Grid.Row> 
            <Grid.Row className="page-title">
                <h3 className="epic-form">Select one or more epics to import</h3> 
                <hr style={{width: "80%"}}/>
                
            </Grid.Row>       
            <Grid.Row className="epic-form" columns={3}>
                <Grid.Column></Grid.Column>
                <Grid.Column>                                                                
                    <List>              
                        <Form onSubmit={onSubmit}>
                            {
                            Object.values(data?.getJiraEpics).map((key, index) => ( 
                            <List.Item className="epic-form" key={index}>
                                <Checkbox 
                                    className="epic-form-list" 
                                    label={<label className="epic-form">{key.fields.summary}</label>} 
                                    name="epicName"  
                                    disabled={key.epicImported}  
                                    checked={key.epicImported}                                
                                    onChange={() => {
                                        createEpic({
                                            variables: {
                                                epicName: key.fields.summary,
                                                description: key.fields?.description?.content[0]?.content[0]?.text,
                                                jiraKey: key.key,
                                                jiraId: key.id  
                                            }
                                        })
                                    }}
                                    value={key.fields.summary}                                      
                                />
                                </List.Item> 
                            ))
                            }
                            
                        </Form> 
                    </List>
                    
                </Grid.Column>    
                <Grid.Column></Grid.Column>
            </Grid.Row>            
            <Grid.Row></Grid.Row>
        </Grid>
        
    );
}

export default JiraEpics;
