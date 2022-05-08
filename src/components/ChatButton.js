import React from 'react';
import { Icon, Feed } from 'semantic-ui-react';

function ScenarioChatButton({user, testScenario: {commentCount}}) {    

    const scenarioChatButton = user ? (
        commentCount > 0 ? (
            <>                                
                <Icon  size="small" circular inverted name='comments' color='teal'/>
                
                <span style={{color:commentCount > 0 ? "teal" : "grey" }}>{commentCount} </span>
            </>
        ) : (
            <><Icon size="small" circular inverted name='comments' color='grey'/> {commentCount } </>
        )
    ) : (
        <><Icon size="small" circular inverted name='comments'color='grey' to="/login"/> {commentCount } </>
    )

    return (        
        <Feed.Like>
            &nbsp;{scenarioChatButton} 
        </Feed.Like>        
    )
}

export default ScenarioChatButton;