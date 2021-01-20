import React from 'react';
import { Card } from 'antd';

function MaintenanceCard({ status, priority, description, title, onClick }) {
  return (
    <div>
      <Card title={title || 'Work Order Title'} style={{ width: 300 }}>
        <p>{`Status: ${status}` || 'Status'}</p>
        <p>{`Priority: ${priority}` || 'Priority'}</p>
        <p>{description || 'Description...'}</p>
        <button onClick={onClick}>Edit</button>
      </Card>
    </div>
  );
}

export default MaintenanceCard;
