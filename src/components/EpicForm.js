import React from 'react';
import {Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';
import { useParams } from "react-router-dom";
import { FETCH_EPICS_QUERY, CREATE_EPIC_MUTATION } from '../util/graphql';

function EpicForm() {
    const { orgName } = useParams();
    const { values, onChange, onSubmit } = useForm(createEpicCallback, {        
        epicName: '',
        description: '',                
    });    

    const [createEpic, { loading, error }] = useMutation(CREATE_EPIC_MUTATION, {
        variables: values,
        refetchQueries:[
            {query: FETCH_EPICS_QUERY,
             variables: { orgName }}
        ],
        awaitRefetchQueries: true,
        onError: (err) => {
            console.log(`Error ${err}`);
        },        
    });
        

    function createEpicCallback() {        
        createEpic();   
        values.epicName = '';
        values.description = '';             
    }

    if (loading) return <p>Loading ...</p>;
    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2 style={{color: 'white'}}>Create an Epic:</h2>
            <Form.Group widths="equal">
                <Form.Input
                    data-cy = "epicName"
                    placeholder="Epic name..."
                    name="epicName"
                    onChange={onChange}
                    value={values.epicName}
                    error={error ? true : false}
                />
                <Form.Input
                data-cy = "description"
                    placeholder="Description..."
                    name="description"
                    onChange={onChange}
                    value={values.description}
                    error={error ? true : false}
                />
                {/* <Form.Input
                    data-cy = "orgName"
                    placeholder={orgName}
                    name="orgName"
                    onChange={onChange}
                    value={values.orgName}
                    error={error ? true : false}
                    type="hidden"
                    className="hidden-input"
                />  */}
                <Button type="submit" color="teal" data-cy = "submit">
                    Submit
                </Button>
            </Form.Group>
        </Form>
        {error && (
            <div className="ui error message">
            <ul className="list">
                <li>{error.graphQLErrors[0].message}</li>
            </ul> </div>
        )}
        </>
    )
};

export default EpicForm;