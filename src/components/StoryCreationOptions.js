import React from 'react'
import { Tab, Container, Segment } from 'semantic-ui-react';
import StoryForm from "./StoryForm";
import JiraStories from "./JiraStories";

const panes = [
  {
    menuItem: 'Create Story',
    render: () => 
        <Tab.Pane attached={false}>
            <Segment style={{backgroundColor: 'teal'}} >
                <Container>
                    <StoryForm />
                </Container>
            </Segment>  
            
        </Tab.Pane>,
  },
  {
    menuItem: 'Import Stories',
    render: () => <Tab.Pane attached={false}>
        <Segment style={{backgroundColor: 'teal'}} >
            <Container>
                <JiraStories />
            </Container>
        </Segment>
    </Tab.Pane>,
  },  
]

const StoryCreationOptions = () => (
    <>
        <Tab menu={{ pointing: true }} panes={panes} />
        <div style={{paddingBottom:"10px"}}></div>
    </>
)

export default StoryCreationOptions
