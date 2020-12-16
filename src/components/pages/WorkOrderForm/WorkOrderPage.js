import React, {useState}  from 'react';
import 'antd/dist/antd.css';

import {
    Form,
    Input,
    Button,
    Select,
  } from 'antd';



function WorkOrderPage({ LoadingComponent }) {
  

  const [workOrder, setWorkOrder] = useState([
    {
      title: "",
      date: new Date().toISOString().slice(0,10),
      priority:"",
      status:"",
      description: "",
    },
  ]);



  const handleChange = (e) => {
    setWorkOrder({ ...workOrder, [e.target.name]: e.target.value });
  };

  function handleDropdownPriority(value,e) {
    setWorkOrder({ ...workOrder, priority: value});
    
}

function handleDropdownStatus(value,e) {
  setWorkOrder({ ...workOrder, status: value});
  
}

  const handleSubmit = (e) =>{
    console.warn("added", {workOrder})
}


    
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
       
        <Form.Item label="Work Order Title" >
          <Input type="text" name='title'  onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Date">
          <Input type="text" name='date'  value={new Date().toISOString().slice(0,10)} placeholder="yyyy-mm-dd" onChange={handleChange}/>
        </Form.Item>
        <Form.Item label="Priority">
          
          <Select name='priority'  onChange={handleDropdownPriority}>
            <Select.Option value="critcal">Critical</Select.Option>
            <Select.Option value="high">High</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="low">Low</Select.Option>

          </Select>
        </Form.Item>
        <Form.Item label="Status">
          <Select name='status'  onChange={handleDropdownStatus}>
            <Select.Option value="unassigned">Unassigned</Select.Option>
            <Select.Option value="inProgress">In Progress</Select.Option>
            <Select.Option value="pendingReview">Pending Review</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
            <Select.Option value="closed">Closed</Select.Option>


          </Select>
        </Form.Item>
        <Form.Item label="Work Order Description">
          <Input type="text" name='description' onChange={handleChange}  />
        </Form.Item>

        <Form.Item label="Attachments">
          <Input type='file'/>
        </Form.Item>
        
        <Form.Item >
          <Button onClick={handleSubmit} >Save</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default WorkOrderPage;



