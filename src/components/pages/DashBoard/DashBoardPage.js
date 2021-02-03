import React, { useState, useEffect, useContext } from 'react';
import MaintenanceCard from '../../common/MaintenanceCard';
import { useOktaAuth } from '@okta/okta-react';
import { getAuthHeader } from '../../../api/index';
import { Modal, Collapse, Avatar, Dropdown, Menu } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import MaintenceWOForm from '../../common/MaintenanceWOForm';
import WorkOrderPage from '../WorkOrderForm/WorkOrderPage';

import { WOContext } from '../../../state/WOContext';
import './DashBoardStyle.css';


import axios from 'axios';

const { Panel } = Collapse;
const priorityLegends = ['Low', 'Medium', 'High', 'Critical'];
const statusHeader = [
  'Unassigned',
  'Open',
  'In Progress',
  'Awaiting Review',
  'Complete',
  'Archived',
];

function DashBoardPage({ close }) {
  const [workorders, setWorkorders] = useContext(WOContext);
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
      .get(`https://xcel-wom-api-b.herokuapp.com/company/1/orders`, { headers })
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

  // Devin's logout button ////////////
  const { authService } = useOktaAuth();
  const logout = (
    <div className="logout-container">
      <Menu className="logout">
        <Menu.Item>
          <a onClick={() => authService.logout()}>Log Out</a>
        </Menu.Item>
      </Menu>
    </div>
  );
  ///////////////////////////////
  return (
    <div className="container">
      <button onClick={showModal}>Create Work Order</button>

      <Modal
        title="Edit Work Order"
        visible={isFormVisible}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <WorkOrderPage close={handleCancel} />
      </Modal>

      {/* *************DEVIN*************** */}
      <Dropdown overlay={logout} trigger={['click']}>
        <div className="avatar-user">
          <Avatar classname="avatar" icon={<UserOutlined />}></Avatar>
        </div>
      </Dropdown>

      <div className="legends-priority">
        Priorities:{' '}
        {priorityLegends.map(priority => {
          return (
            <>
              <button className={`legends-${priority}`}>{priority}</button>
            </>
          );
        })}
      </div>
      <div className="collapse-container">
        {statusHeader.map(statusItem => {
          return (
            <>
              <Collapse
                className="collapse-header"
                defaultActiveKey={['1']}
                bordered={true}
                ghost
              >
                <Panel
                  className="panel-header"
                  header={statusItem}
                  showArrow={false}
                  key="1"
                >
                  <Collapse accordion className="collapse" ghost>
                    {workorders.map(order => {
                      if (order.status.name.includes(statusItem)) {
                        return (
                          <>
                            <Panel
                              className={`panel-${order.priority.name}`}
                              header={order.title}
                              showArrow={false}
                              onClick={() => ShowWo(order)}
                            >
                              <div className="panel-content-wo">
                                Location: {order.property.address}
                              </div>
                              <div className="panel-content-wo">
                                Priority: {order.priority.name}
                              </div>
                              <div className="panel-content-wo">
                                Description: {order.description}
                              </div>
                              <div className="panel-content-wo">
                                Created By: {order.createdby.name}
                              </div>
                              <MenuOutlined onClick={() => ShowWo(order)}>
                                Edit
                              </MenuOutlined>
                            </Panel>
                          </>
                        );
                      } else {
                        return <></>;
                      }
                    })}
                  </Collapse>
                </Panel>
              </Collapse>
            </>
          );
        })}
      </div>
      {/* *********************************** */}
      {workorders.map(order => {
        return (
          <>
            {/* <MaintenanceCard
              key={order.id}
              title={order.title}
              status={order.status.name}
              priority={order.priority.name}
              description={order.description}
              onClick={() => ShowWo(order)}
            /> */}
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
