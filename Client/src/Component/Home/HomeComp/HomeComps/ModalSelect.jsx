/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Modal, Form, Input, Button,
} from 'semantic-ui-react';

const ModalParam = (props) => {
  const options = [
    { key: 's', text: 'Small', value: 'small' },
    { key: 'm', text: 'Medium', value: 'medium' },
    { key: 'l', text: 'Large', value: 'large' },
  ];
  return (
    <Modal trigger={props.component}>
      {props.loadComp}
      <Modal.Header>Select the Parameters</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={props.onSubmitModal}>
            <Form.Field
              control={Input}
              label="Serving Quantity"
              placeholder="0"
              onChange={props.onChangeServe}
            />
            <Form.Field>
              <label htmlFor="size-select">
                Portion Size
                <select id="size-select" onChange={props.onChangeSize}>
                  <option value="">Select a Size of Portion</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt.value}>
                      {opt.text}
                    </option>
                  ))}
                </select>
              </label>
            </Form.Field>
            <Form.Field control={Button}>Submit</Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default ModalParam;
