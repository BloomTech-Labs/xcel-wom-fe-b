import React, {useState} from 'react';
import 'antd/dist/antd.css';

import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
  } from 'antd';



function WorkOrderPage({ LoadingComponent }) {





    
  return (
    <>

    <h1>Work Order Form</h1>
    <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
        }}
      >
       
        <Form.Item label="Work Order Title">
          <Input type="text"  />
        </Form.Item>
        <Form.Item label="Date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Priority">
          <Select >
            <Select.Option value="Critcal">Critical</Select.Option>
            <Select.Option value="High">High</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="Low">Low</Select.Option>

          </Select>
        </Form.Item>
        <Form.Item label="Status">
          <Select>
            <Select.Option value="Unassigned">Unassigned</Select.Option>
            <Select.Option value="InProgress">In Progress</Select.Option>
            <Select.Option value="PendingReview">Pending Review</Select.Option>
            <Select.Option value="Completed">Completed</Select.Option>
            <Select.Option value="Closed">Closed</Select.Option>


          </Select>
        </Form.Item>
        <Form.Item label="Work Order Description">
          <Input />
        </Form.Item>

        <Form.Item label="Attachments">
          <Input type='file'/>
        </Form.Item>
        
        <Form.Item >
          <Button>Save</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default WorkOrderPage;



