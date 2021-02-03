import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { useOktaAuth } from '@okta/okta-react';
import { postWO } from '../../../api/index';



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

  //Auth for api call
  const { authState } = useOktaAuth();

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
    postWO(authState, workOrder);
  };

// const dispatch = useDispatch();
// const workOrders1 = useSelector((state) => state.workOrders.workorders);

// console.log("workOrders1", workOrders1)

// useEffect(() => {
//   dispatch(getWorkOrders(1, authState));
// }, []); // eslint-disable-line react-hooks/exhaustive-deps 

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
