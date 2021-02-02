import React, { useState, useEffect } from 'react';
import MaintenanceCard from '../../common/MaintenanceCard';
import { useOktaAuth } from '@okta/okta-react';
import { getAuthHeader } from '../../../api/index';
import { Modal } from 'antd';
import MaintenceWOForm from '../../common/MaintenanceWOForm';
import WorkOrderPage from '../WorkOrderForm/WorkOrderPage';

import axios from 'axios';

function DashBoardPage({ close }) {
  const [workorders, setWorkorders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [currentWO, setCurrentWo] = useState(false);

  const showModal = () => {
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsFormVisible(false);
  };

  const ShowWo = Wo => {
    setCurrentWo(Wo);
    setIsModalVisible(true);
  };

  //Okta auth
  const { authState } = useOktaAuth();
  const headers = getAuthHeader(authState);

  // API GET CALL
  useEffect(() => {
    axios
      .get(`https://xcel-wom-api-b.herokuapp.com/company/1/order`, { headers })
      .then(response => {
        const orders = response.data;
        console.log('These are the WO: ', orders);
        setWorkorders(orders);
        setCurrentWo(orders[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <button onClick={showModal}>Create Work Order</button>
      <Modal
        title="Edit Work Order"
        visible={isFormVisible}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <WorkOrderPage />
      </Modal>
      {workorders.map(order => {
        return (
          <>
            <MaintenanceCard
              key={order.id}
              title={order.title}
              status={order.status.name}
              priority={order.priority.name}
              description={order.description}
              onClick={() => ShowWo(order)}
            />
            <Modal
              title="Edit Work Order"
              visible={isModalVisible}
              onCancel={handleCancel}
              cancelButtonProps={{ style: { display: 'none' } }}
              okButtonProps={{ style: { display: 'none' } }}
            >
              {currentWO ? (
                <MaintenceWOForm
                  key={currentWO.id}
                  id={currentWO.id}
                  title={currentWO.title}
                  date={currentWO.createdby.created_at}
                  priority={currentWO.priority.name}
                  status={currentWO.status.name}
                  description={currentWO.description}
                  comments={currentWO.comments.map(item => {
                    return item.comment;
                  })}
                  currentWO={currentWO}
                  close={handleCancel}
                />
              ) : (
                ''
              )}
            </Modal>
          </>
        );
      })}
    </div>
  );
}

export default DashBoardPage;
