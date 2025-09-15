import { useState } from 'react';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Input,
  Row,
  Space,
  Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';
import DrawerCreateUpdateQuestion from '../drawer/DrawerCreateUpdateQuestion';
import TableQuestion from '../table/TableQuestion';

const Questions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const [open, setOpen] = useState<'modal' | 'drawer' | ''>('');

  return (
    <>
      <DrawerCreateUpdateQuestion
        open={open === 'drawer'}
        onClose={() => setOpen('')}
      />
      <Card
        title="Ngân hàng câu hỏi"
        extra={
          <Space>
            <Button type="primary" onClick={() => setOpen('drawer')}>
              Thêm câu hỏi
            </Button>
          </Space>
        }
        style={{ marginTop: 16 }}
      >
        
      </Card>
    </>
  );
};

export default Questions;
