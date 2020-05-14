import React, { useState } from "react";
import { Modal, Form,  Input, Button } from "semantic-ui-react";

const ModalParam = (props) => {
  const options = [
    { key: "s", text: "Small", value: "small" },
    { key: "m", text: "Medium", value: "medium" },
    { key: "l", text: "Large", value: "large" },
  ];
  return (
    <Modal open={props.openMethod} onClose={props.onClose} trigger={props.component}>
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
              <label>Portion Size</label>
              <select onChange={props.onChangeSize}>
                <option value="">Select a Size of Portion</option>
                {options.map((opt,index) => {
                  return <option key={index} value={opt.value}>{opt.text}</option>;
                })}
              </select>
            </Form.Field>
            <Form.Field control={Button}>Submit</Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};
export default ModalParam;
