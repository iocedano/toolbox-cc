import React from 'react';
import { Form } from 'react-bootstrap';

function Select({ label = 'Select a file', options = [], includeAll = false, onChange = () => { } }) {
    return (
        <Form.Group controlId="formFile">
            {label && <Form.Label>{label}</Form.Label>} 
            <Form.Select as="select" onChange={onChange}>
                {includeAll && <option value="all">All</option>}
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </Form.Select>
        </Form.Group>
    );
}

export default Select;