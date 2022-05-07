import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';


function TestScenarioButton({count, user}) {        
    const testScenarioButton = user ? (     
        count > 0 ? (           
            <Icon color='teal' name='write square' />                    
        ) : (
            <Icon name='write square' />                    
        )
    ) : (        
            <Icon to="/login/" name='write square' />        
    )
    return (
        <Feed.Like style={{cursor:"default"}}>
            {testScenarioButton} {count} {count === 1 ? "Scenario " : "Scenarios "}        
        </Feed.Like>        
    )
};


export default TestScenarioButton;