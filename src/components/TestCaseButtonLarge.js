import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';


function TestScenarioButtonLarge({count, user}) {        
    const testScenarioButton = user ? (        
        <Button color='teal' basic>
            <Icon name='write square' />
            Scenarios
        </Button>        
    ) : (
        <Button as={Link} to="/login" color='teal' basic>
            <Icon name='write square' />
            Scenarios
        </Button>
    )
    return (
        <Button as="div" labelPosition="right">
            {testScenarioButton}
            <Label basic color="teal" pointing="left">
                {count}
            </Label>
        </Button>
    )
};


export default TestScenarioButtonLarge;