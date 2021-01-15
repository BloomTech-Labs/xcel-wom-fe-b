import React, { useEffect } from 'react';
import 'antd/dist/antd.css';

import { Card } from 'antd';
function WorkOrderDisplayPage({ LoadingComponent }) {
  return (
    <>
      <Card title="Card title">
        {console.log(LoadingComponent)}Card Content
      </Card>
    </>
  );
}

export default WorkOrderDisplayPage;
