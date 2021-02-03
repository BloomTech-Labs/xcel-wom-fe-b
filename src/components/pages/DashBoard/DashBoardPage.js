import React, { useState, useEffect } from 'react';
import MaintenanceCard from '../../common/MaintenanceCard';
import { useOktaAuth } from '@okta/okta-react';
import { getAuthHeader } from '../../../api/index';
import { Modal } from 'antd';
import MaintenceWOForm from '../../common/MaintenanceWOForm';
import WorkOrderPage from '../WorkOrderForm/WorkOrderPage';

import { getWorkOrders } from '../../../state/actions/workorders.actions';
import {
  // useDispatch, 
  useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

function DashBoardPage({ close }) {
  const workordersLoading = useSelector((state) => state.workorders.isLoading);
  
  // const workordersInitialState = mapStateToProps((state) => state.workOrders);
  // const [workorders, setWorkorders] = useState(workordersInitialState)
  // const [workorders, setWorkorders] = useState([]);
  // const allWorkOrders = useSelector((state) => state.workorders);
  // console.log("allWorkOrders", allWorkOrders);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentWO, setCurrentWo] = useState(false);
  // console.log("WORKORDERS INITIAL STATE", workorders)

  const mapStateToProps = state => {
    const { allWorkOrders } = state;
  }

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
  // const { authState } = useOktaAuth();

  // API GET CALL
  // useEffect(() => {
  //   axios
  //     .get(`https://xcel-wom-api-b.herokuapp.com/company/1/order`, { headers })
  //     .then(response => {
  //       const orders = response.data;
  //       console.log('These are the WO: ', orders);
  //       setWorkorders(orders);
  //       setCurrentWo(orders[0]);
  //     })
  //     .catch(error => {
        // console.log(error);
  //     });
  // }, []); 
  // eslint-disable-line react-hooks/exhaustive-deps

// const dispatch = useDispatch();

// useEffect(() => {
//   dispatch(getWorkOrders(1, authState));
//   setWorkorders(workordersInitialState)
//     console.log("WORKORDERS UPDATED STATE", workorders)
// }, []); // eslint-disable-line react-hooks/exhaustive-deps 

  if (workordersLoading) {
    return (
      <Loader
        type="TailSpin"
        height="100%"
        width="100%"
        timeout={ 3000 }
      />
    );
  }

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
      {allWorkOrders.map(order => { 
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
      }), ""}
    </div>
  );
}

export default DashBoardPage;
