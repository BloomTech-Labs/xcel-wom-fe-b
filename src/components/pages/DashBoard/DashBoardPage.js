import React, { useState, useEffect } from 'react';
import MaintenanceCard from '../../common/MaintenanceCard';
import { useOktaAuth } from '@okta/okta-react';
import { getAuthHeader } from '../../../api/index';
import axios from 'axios';

function DashBoardPage(props) {
  const [workorders, setWorkorders] = useState([]);

  const { authState } = useOktaAuth();
  const headers = getAuthHeader(authState);
  const WOurl = 'https://xcel-wom-api-b.herokuapp.com/workOrders';

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

  console.log(workorders[0]);

  return (
    <div>
      <p>Hello</p>
    </div>
  );
}

export default DashBoardPage;
