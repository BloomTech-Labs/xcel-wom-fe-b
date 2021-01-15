import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { getAuthHeader } from '../../api/index';
import axios from 'axios';
import { useOktaAuth } from '@okta/okta-react';

import { Form, Input, Button, Select } from 'antd';

function WorkOrderPage({ LoadingComponent }) {
  //State
  const [workOrder, setWorkOrder] = useState({
    title: '',
    description: '',
    company: 1,
    property: 1,
    createdBy: '00ulthapbErVUwVJy4x6',
    assignedTo: '00ulthapbErVUwVJy4x6',
    priority: 2,
    status: 1,
  });

  //API Calls

  const WOurl = 'https://xcel-wom-api-b.herokuapp.com/workOrder';
  const { authState } = useOktaAuth();

  const postWO = (url, authState) => {
    const headers = getAuthHeader(authState);
    if (!url) {
      throw new Error('No URL provided');
    }
    return axios
      .post(url, workOrder, { headers })
      .then(res => JSON.parse(res.data))
      .catch(err => err);
  };

  //Handle changes

  const handleChange = e => {
    setWorkOrder({ ...workOrder, [e.target.name]: e.target.value });
  };

  function handleDropdownPriority(value, e) {
    setWorkOrder({ ...workOrder, priority: value });
  }

  function handleDropdownStatus(value, e) {
    setWorkOrder({ ...workOrder, status: value });
  }

  const handleSubmit = e => {
    postWO(WOurl, authState);
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
            <Select.Option value={0}>Critical</Select.Option>
            <Select.Option value={1}>High</Select.Option>
            <Select.Option value={2}>Medium</Select.Option>
            <Select.Option value={3}>Low</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Status">
          <Select name="status" onChange={handleDropdownStatus}>
            <Select.Option value={0}>Unassigned</Select.Option>
            <Select.Option value={1}>In Progress</Select.Option>
            <Select.Option value={2}>Pending Review</Select.Option>
            <Select.Option value={3}>Completed</Select.Option>
            <Select.Option value={4}>Closed</Select.Option>
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
