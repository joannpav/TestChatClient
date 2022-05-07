import React, { useState, useEffect } from 'react';
import { Icon, Feed, Popup, Image } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


function DisapprovalButton({user, story, testScenario: {id, disapprovalCount, disapprovals}}) {
    const [disapproved, setDisapproved] = useState(false);
    const [errors, setErrors] = useState({});
    
    useEffect(() => {        
        if (disapprovals) {            
            if(user && disapprovals.find(disapprove => disapprove.username === user.username)){
                setDisapproved(true)
            } else setDisapproved(false)
        }
        
        return () => setDisapproved(false);
    }, [user, disapprovals]);

    const [disapproveScenario] = useMutation(DISAPPROVE_SCENARIO_MUTATION, {
        variables: { 
            storyId: story,
            scenarioId: id},
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
            console.log(errors);
        }
    })
    
    const disapprovalButton = user ? (            
        <Feed.Like onClick={disapproveScenario} color={disapproved ? "teal" : "grey"}>
            {disapprovalCount > 0 ? (<>
                <Popup
                    content={disapprovals && disapprovals.map((disapproval) => (
                        <>                        
                        <p><Image size="mini" src="https://react.semantic-ui.com/images/avatar/small/molly.png"  avatar />{disapproval.username}</p>
                        </>
                        ))}
                    trigger={<Icon size="small" circular inverted name="thumbs down" color={disapproved ? "teal" : "grey"} />}               
                />
                <span style={{color:disapproved ? "teal" : "grey" }}>{disapprovalCount}  </span>                                  
            </>) : (<>
                <Icon size="small" circular inverted name="thumbs down" color={disapproved ? "teal" : "grey"} />
                <span style={{color:disapproved ? "teal" : "grey" }}>{disapprovalCount}  </span>                                  
            </>)}            
        </Feed.Like>
    
    ) : (
        <Feed.Like><Icon name='thumbs down' color="grey" to="/login"/> {disapprovalCount } {disapprovalCount === 1 ? "Disapproval  " : "Disapprovals  "}</Feed.Like>
    )
    return disapprovalButton
}

const DISAPPROVE_SCENARIO_MUTATION = gql`
    mutation disapproveScenario($storyId: ID!, $scenarioId: ID!){
        disapproveScenario(storyId: $storyId, scenarioId: $scenarioId){
            id
            testScenarios{
                id
                disapprovals {
                    id
                    username
                    createdAt
                }
                disapprovalCount
                approvals {
                    id
                    username
                    createdAt
                }
                approvalCount
            }
          
        }
    }
  
`;

export default DisapprovalButton;