import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Confirm, Icon } from 'semantic-ui-react';


function DeleteScenarioButton({ storyId, scenarioId, handleCallback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
   

    const [deleteScenario] = useMutation(DELETE_SCENARIO_MUTATION, {
       update(proxy) {
            setConfirmOpen(false);                                                        
       },
       variables: {
           storyId,
           scenarioId
       }
    });

    return(
        <>            
            <Icon color="red" name="delete" link onClick={() => setConfirmOpen(true)}/>                    
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deleteScenario}
            />
        </>
    );
}
    

const DELETE_SCENARIO_MUTATION = gql`
    mutation deleteScenario($storyId: ID!, $scenarioId: ID!) {
        deleteScenario(storyId: $storyId, scenarioId: $scenarioId) {
            id
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
        }                    
    }
`;


export default DeleteScenarioButton;