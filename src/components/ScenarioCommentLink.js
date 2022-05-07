import React from 'react'
import { Modal, Comment } from 'semantic-ui-react'
import ScenarioCommentPopup from './ScenarioCommentPopup';


function ScenarioCommentLink({ user, storyId, scenarioId, handleCallback }) {
    const [open, setOpen] = React.useState(false);
        
    return (
        <Modal
          closeIcon
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <Comment.Group className="comment-compact">
                <Comment >      
                <Comment.Content>        
                    <Comment.Actions>
                    <Comment.Action>Comment</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
                </Comment>
            </Comment.Group>
            }
        >
          <Modal.Header>Add a comment</Modal.Header>
          <Modal.Content>    

            <Modal.Description>                    
                    <ScenarioCommentPopup handleCallback={handleCallback} user={user} storyId={storyId} scenarioId={scenarioId.id}></ScenarioCommentPopup>
            </Modal.Description>
          </Modal.Content>          
        </Modal>
      )
    }

export default ScenarioCommentLink