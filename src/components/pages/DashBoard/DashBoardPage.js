import React, { useState, useEffect } from 'react';
import MaintenanceCard from '../../common/MaintenanceCard';
import { useOktaAuth } from '@okta/okta-react';
import { getAuthHeader } from '../../../api/index';
import axios from 'axios';

function DashBoardPage(props) {
  const [workorders, setWorkorders] = useState([]);

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
          <MaintenanceCard
            key={order.id}
            title={order.title}
            status={order.status.name}
            priority={order.priority.name}
            description={order.description}
          />
        );
      })}
    </div>
  );
}

export default DashBoardPage;
