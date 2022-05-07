import React, { useState, useContext } from "react";
import { Form, Grid, List, Checkbox } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from "../context/auth";
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useParams } from "react-router-dom";
import { FETCH_STORIES_QUERY, GET_JIRA_STORIES } from '../util/graphql';


function JiraStories() {   
    const { epicId } = useParams();
    const [projectKey, setProjectKey] = useState("TES")    
    const { user } = useContext(AuthContext);
    const { data, loading, error } = useQuery(GET_JIRA_STORIES, {
        variables: { projectKey, epicId },
        errorPolicy: "all",
        fetchPolicy: "cache-first"
    });  
    const { values, onChange, onSubmit } = useForm(createStoryCallback, {                
        epicId,      
        body: '',
        acceptanceCriteria: ''              
    });    

    const [createStory] = useMutation(CREATE_JIRA_STORY_MUTATION, {        
        variables: values,
        refetchQueries:[
            {query: FETCH_STORIES_QUERY,
                variables: {
                    epicId
                }
            },
            {query: GET_JIRA_STORIES,
                variables: {projectKey, epicId}
            }
        ],
        awaitRefetchQueries: true,
        onError: (err) => {
            console.log(`Error ${err}`);
        }                
    });
            
    
    function createStoryCallback() { 
        console.log(`what is values here? ${values}`)       
        createStory();                   
    }  
    
    let navigate = useNavigate();
    
    if (!user) { navigate("/login")}
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    
    return (      
        <Grid >
            <Grid.Row className="page-title">
                <h1 className="epic-form">Import Stories</h1>                                
            </Grid.Row> 
            <Grid.Row className="page-title">
                <h3 className="epic-form">Select one or more stories to import</h3> 
                <hr style={{width: "80%"}}/>
                
            </Grid.Row>       
            <Grid.Row className="epic-form" columns={3}>
                <Grid.Column></Grid.Column>
                <Grid.Column>                                                                
                    <List>              
                        <Form onSubmit={onSubmit}>
                            {
                            Object.values(data?.getJiraStories).map((key, index) => ( 
                            <List.Item className="epic-form" key={index}>
                                <Checkbox 
                                    className="epic-form-list" 
                                    label={<label className="epic-form">{key.fields.summary}</label>} 
                                    name="epicName"  
                                    disabled={key.storyImported}  
                                    checked={key.storyImported}                                
                                    onChange={() => {
                                        createStory({
                                            variables: {
                                                epicId,
                                                body: key.fields.summary,
                                                acceptanceCriteria: key.fields.description?.content?.[0].content?.[0].text || "No acceptance criteria",                                                
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


const CREATE_JIRA_STORY_MUTATION = gql`
    mutation createStory($epicId: ID!, $body: String!, $acceptanceCriteria: String, $jiraKey: String, $jiraId: String) {
        createStory(epicId: $epicId, body: $body, acceptanceCriteria: $acceptanceCriteria, jiraKey: $jiraKey, jiraId: $jiraId) {
            id            
            body
            acceptanceCriteria
            epic {
                id
                epicName
                createdAt
            }
            createdAt
            username
            likes {
                id                
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
            testScenarioCount 
            testScenarios {
                id
                scenario
                username
                createdAt
                approvalCount
                approvals {
                    id
                    username
                    createdAt
                }
                commentCount
                comments {
                    id
                    username
                    createdAt
                }                                
            }
            jiraKey
            jiraId
        }
    }
`;

export default JiraStories;
