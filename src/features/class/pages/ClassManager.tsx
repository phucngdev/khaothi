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
  Select,
  Space,
  Typography,
} from 'antd';
import Search from 'antd/es/transfer/search';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalCreateUpdateClass from '../components/modal/ModalCreateUpdateClass';
import TableClass from '../components/table/TableClass';

const { Title, Text } = Typography;

const ClassManager = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState<'modal' | ''>('');

  return (
    <>
      <ModalCreateUpdateClass
        open={open === 'modal'}
        onClose={() => setOpen('')}
      />
      <Card>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Card
              style={{
                marginBottom: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <Space
                size="middle"
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Space>
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Quản lý lớp</Breadcrumb.Item>
                  </Breadcrumb>
                </Space>
                <Space>
                  <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                  >
                    Quay lại
                  </Button>
                  <Button
                    icon={<ArrowRightOutlined />}
                    style={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      alignItems: 'center',
                    }}
                    onClick={() => navigate(+1)}
                  >
                    Chuyển tiếp
                  </Button>
                </Space>
              </Space>
            </Card>
          </Col>
        </Row>
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <Card
              style={{
                borderRadius: 0,
              }}
            >
              <Row align="middle" justify="space-between">
                <Col>
                  <Space align="center">
                    <div>
                      <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                        Quản lý lớp
                      </Title>
                      <Text type="secondary" style={{ fontSize: '16px' }}>
                        Hệ thống hóa – Quản lý dễ dàng - Kiểm soát toàn diện
                      </Text>
                    </div>
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <Button
                      onClick={() => setOpen('modal')}
                      type="primary"
                      icon={<PlusOutlined />}
                    >
                      Tạo lớp mới
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
          <TableClass />
        </Card>
      </Card>
    </>
  );
};

export default ClassManager;
