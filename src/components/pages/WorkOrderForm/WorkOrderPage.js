import React, { useState, useContext } from 'react';
import 'antd/dist/antd.css';
import { useOktaAuth } from '@okta/okta-react';
import { getAuthHeader } from '../../../api/index';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import { WOContext } from '../../../state/WOContext';

function WorkOrderPage({ close }) {
  //State
  const [workorders, setWorkorders] = useContext(WOContext);

  const [form, setForm] = useState({
    title: '',
    description: '',
    company: 1,
    property: 1,
    createdBy: '00ulthapbErVUwVJy4x6',
    assignedTo: '00ulthapbErVUwVJy4x6',
    priority: 2,
    status: 1,
  });

  console.log(form);
  const WOurl = `${process.env.REACT_APP_API_URI}/company/1/order/`;

  //Auth for api call
  const { authState } = useOktaAuth();

  //Handle changes

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function handleDropdownPriority(value, e) {
    setForm({ ...form, priority: value });
  }

  function handleDropdownStatus(value, e) {
    setForm({ ...form, status: value });
  }

  const postWO = (authState, workOrder) => {
    const headers = getAuthHeader(authState);
    if (!WOurl) {
      throw new Error('No URL provided');
    }
    return axios
      .post(WOurl, workOrder, { headers })
      .then(res => {
        setWorkorders([...workorders, res.data.workOrder]);
      })
      .catch(err => err);
  };

  const handleSubmit = e => {
    e.preventDefault();
    postWO(authState, form);
    close();
  };

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{}}
      >
        <Form.Item
          label="Work Order Title"
          help="Maximum of 150 characters allowed."
          className="WorkOrderTitle"
        >
          <Input
            type="text"
            name="title"
            maxLength="150"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Date">
          <Input
            type="text"
            name="date"
            value={new Date().toISOString().slice(0, 10)}
            placeholder="yyyy-mm-dd"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Priority">
          <Select name="priority" onChange={handleDropdownPriority}>
            <Select.Option value={1}>Critical</Select.Option>
            <Select.Option value={2}>High</Select.Option>
            <Select.Option value={3}>Medium</Select.Option>
            <Select.Option value={4}>Low</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Status">
          <Select name="status" onChange={handleDropdownStatus}>
            <Select.Option value={1}>Unassigned</Select.Option>
            <Select.Option value={2}>In Progress</Select.Option>
            <Select.Option value={3}>Pending Review</Select.Option>
            <Select.Option value={4}>Completed</Select.Option>
            <Select.Option value={5}>Closed</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Work Order Description">
          <Input type="text" name="description" onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Attachments">
          <Input type="file" name="attachment" />
        </Form.Item>

        <Form.Item>
          <Button onClick={handleSubmit}>Save</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default WorkOrderPage;
