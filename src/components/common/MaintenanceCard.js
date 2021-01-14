import React, { useState } from 'react';
import { Card } from 'antd';
import MaintenceWOForm from './MaintenanceWOForm';
import { Modal } from 'antd';

function MaintenanceCard({ status, priority, description, title }) {
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
        onClick={showModal}
      >
        <p>{status || 'Status'}</p>
        <p>{priority || 'Priority'}</p>
        <p>{description || 'Description...'}</p>
      </Card>

      <Modal
        title="Edit Work Order"
        visible={isModalVisible}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <MaintenceWOForm />
      </Modal>
    </div>
  );
}

export default MaintenanceCard;
