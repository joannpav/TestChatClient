import React, {useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Form, Card } from 'semantic-ui-react';
import {FETCH_STORY_QUERY} from '../util/graphql';
import { useNavigate } from 'react-router';


const TestScenarioForm = ({storyId, handleCallback}) => {
    const[scenario, setScenario] = useState('');    
    let navigate = useNavigate();

    const [createScenario, { error }] = useMutation(CREATE_TEST_SCENARIO_MUTATION, {        
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_STORY_QUERY,                
                variables: {
                    storyId
                }                
            });              
            data.getStory.testScenarios = result.data.createTestScenario.testScenarios;            
            
            proxy.writeQuery({ query: FETCH_STORY_QUERY, data });                        
            handleCallback(data.getStory);
            setScenario('');
        },
        variables: {
            storyId,
            scenario
        },
        onError: (err) => {
            console.log(`Error creating scenario, user likely not logged in. ${err}, ${error}`);
            navigate("/login");
        }        
    });

  
    let scenarioFormMarkup = (
        <Card fluid>
            <Card.Content>
                <p>Build a test scenario</p>
                <Form>
                    <div className="ui action input fluid">
                        <input
                            type="text"
                            placeholder="Scenario..."
                            name="scenario"
                            value={scenario}
                            onChange={event => setScenario(event.target.value)}                            
                        />
                        <button type="submit"
                            className="ui button teal"
                            disabled={scenario.trim() === ''}
                            onClick={createScenario}
                        >Submit</button>
                    </div>
                </Form>
            </Card.Content>
        </Card>
    );

    return scenarioFormMarkup;    
};

const CREATE_TEST_SCENARIO_MUTATION = gql`
    mutation($storyId: ID!, $scenario: String!) {
        createTestScenario(storyId: $storyId, scenario: $scenario) {    
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
                disapprovalCount
                disapprovals {
                    id
                    username
                    createdAt
                }
                commentCount
                comments {
                    id
                    username
                    body
                    createdAt
                }
            }        
            
        }
    }
`;


export default TestScenarioForm;