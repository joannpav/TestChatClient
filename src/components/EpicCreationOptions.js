import React from 'react'
import { Tab, Container, Segment } from 'semantic-ui-react';
import EpicForm from "./EpicForm";
import JiraEpics from "./JiraEpics";

const panes = [
  {
    menuItem: 'Create Epic',
    render: () => 
        <Tab.Pane attached={false}>
            <Segment style={{backgroundColor: 'teal'}} >
                <Container>
                    <EpicForm />
                </Container>
            </Segment>  
            
        </Tab.Pane>,
  },
  {
    menuItem: 'Import Epics',
    render: () => <Tab.Pane attached={false}>
        <Segment style={{backgroundColor: 'teal'}} >
            <Container>
                <JiraEpics />
            </Container>
        </Segment>
    </Tab.Pane>,
  },  
]

const EpicCreationOptions = () => (
    <>
        <Tab menu={{ pointing: true }} panes={panes} />
        <div style={{paddingBottom:"10px"}}></div>
    </>
)

export default EpicCreationOptions
