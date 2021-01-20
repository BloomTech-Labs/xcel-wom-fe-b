import React, { useState } from 'react';

function MaintenanceWOForm({ title, date, priority, status, description }) {
  const [workOrder, setWorkOrder] = useState({
    comment: '',
    status: 1,
  });

  const handleChange = e => {
    setWorkOrder({ ...workOrder, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    console.warn('added', { workOrder });
  };
  const handleComplete = e => {
    setWorkOrder({ status: 2 });
    console.warn('completed', { workOrder });
  };
  return (
    <div>
      <form>
        <h1>{title}</h1>
        <p>Date created: {date}</p>
        <p>Pirority: {priority}</p>
        <p>Status: {status}</p>
        <p>{description}</p>
        <div>
          <p>Comments:</p>
          <input onChange={handleChange} />
        </div>
        <button onClick={handleSubmit}>Update Work Order</button>
        <button onClick={handleComplete}>Mark Complete</button>
      </form>
    </div>
  );
}

export default MaintenanceWOForm;
