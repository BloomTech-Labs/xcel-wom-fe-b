import React, { useState } from 'react';
import { Card } from 'antd';
import MaintenceWOForm from './MaintenanceWOForm';
import { Modal } from 'antd';

function MaintenanceCard({ status, priority, description, title, onClick }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Card
        title={title || 'Work Order Title'}
        style={{ width: 300 }}
        onClick={onClick}
      >
        <p>{`Status: ${status}` || 'Status'}</p>
        <p>{`Priority: ${priority}` || 'Priority'}</p>
        <p>{description || 'Description...'}</p>
      </Card>
    </div>
  );
}

export default MaintenanceCard;
