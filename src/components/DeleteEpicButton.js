import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Confirm, Icon } from 'semantic-ui-react';

import { FETCH_EPICS_QUERY, GET_JIRA_EPICS } from '../util/graphql';
import CustomPopup from '../util/CustomPopup';


function DeleteEpicButton({ epicId, orgName, handleCallback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);   
    const [projectKey, setProjectKey] = useState("TES")    
  
    const [deleteEpic, { error, loading }] = useMutation(DELETE_EPIC_MUTATION, {
        variables: {epicId},
        refetchQueries: [{ 
            query: FETCH_EPICS_QUERY, 
            variables: {orgName},            
            },
            {query: GET_JIRA_EPICS,
                variables: {projectKey}
            }],
      });
    

    return(
        <>
            <CustomPopup content={'Delete epic?'}>              
                
                    <Icon  
                        data-cy="deleteButton"                       
                        className="trash-button"
                        onClick={() => setConfirmOpen(true)} 
                        color="red" 
                        name="trash" style={{ margin: 0 }} 
                    />
                
                {/* </Button> */}
            </CustomPopup>
        
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deleteEpic}
            />
        </>
    );
}
    

const DELETE_EPIC_MUTATION = gql`
    mutation deleteEpic($epicId: ID!) {
        deleteEpic(epicId: $epicId)                  
    }
`;

export default DeleteEpicButton;