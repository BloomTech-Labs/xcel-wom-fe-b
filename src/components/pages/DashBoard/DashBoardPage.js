import React, { useState, useEffect } from 'react';
import MaintenanceCard from '../../common/MaintenanceCard';
import { useOktaAuth } from '@okta/okta-react';
import { getAuthHeader } from '../../../api/index';
import { Modal } from 'antd';
import MaintenceWOForm from '../../common/MaintenanceWOForm';

import axios from 'axios';

function DashBoardPage(props) {
  const [workorders, setWorkorders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //Okta auth
  const { authState } = useOktaAuth();
  const headers = getAuthHeader(authState);

  // API GET CALL
  useEffect(() => {
    axios
      .get(`https://xcel-wom-api-b.herokuapp.com/workOrders`, { headers })
      .then(response => {
        const orders = response.data;
        console.log('These are the WO: ', orders);
        setWorkorders(orders);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  console.log(workorders);

  return (
    <div>
      {workorders.map(order => {
        return (
          <>
            <MaintenanceCard
              key={order.id}
              title={order.title}
              status={order.status.name}
              priority={order.priority.name}
              description={order.description}
              onClick={showModal}
            />
            <Modal
              title="Edit Work Order"
              visible={isModalVisible}
              onCancel={handleCancel}
              cancelButtonProps={{ style: { display: 'none' } }}
              okButtonProps={{ style: { display: 'none' } }}
            >
              <MaintenceWOForm
                key={order.id}
                title={order.title}
                date={order.createdby.created_at}
                priority={order.priority.name}
                status={order.status.name}
                description={order.description}
              />
            </Modal>
          </>
        );
      })}
    </div>
  );
}

export default DashBoardPage;
