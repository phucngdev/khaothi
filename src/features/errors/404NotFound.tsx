import { Button, Card, Result } from 'antd';
import React from 'react';

const NotFound_404 = () => {
  return (
    <>
      <Card>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary">Quay lại</Button>}
        />
      </Card>
    </>
  );
};

export default NotFound_404;
