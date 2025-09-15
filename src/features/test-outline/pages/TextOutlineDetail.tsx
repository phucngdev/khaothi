import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined,
  PlusOutlined,
  InfoCircleOutlined,
  TableOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  EditOutlined,
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
  Tabs,
  Form,
  DatePicker,
  InputNumber,
  Table,
  Tag,
  Divider,
  Modal,
} from 'antd';
import Search from 'antd/es/transfer/search';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableTestOutline from '../components/table/TableTestOutline';
import ModalCreateUpdateTestOutline from '../components/modal/ModalCreateUpdateTestOutline';
import Overview from '../components/tabs/Overview';
import TestMatrix from '../components/tabs/TestMatrix';
import Questions from '../components/tabs/Questions';
import Tests from '../components/tabs/Tests';
import { useSelector } from 'react-redux';
import { RootState } from '#/src/redux/store/store';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

const TestOutlineDetail = () => {
  const navigate = useNavigate();
  const { dataEdit } = useSelector((state: RootState) => state.test_outline);
  const [open, setOpen] = useState<'modal' | ''>('');
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: (
        <Space>
          <InfoCircleOutlined />
          Thông tin chung
        </Space>
      ),
      children: <Overview />,
    },
    {
      key: '2',
      label: (
        <Space>
          <TableOutlined />
          Ma trận đề thi
        </Space>
      ),
      children: <TestMatrix />,
    },
    {
      key: '3',
      label: (
        <Space>
          <QuestionCircleOutlined />
          Ngân hàng câu hỏi
        </Space>
      ),
      children: <Questions />,
    },
    {
      key: '4',
      label: (
        <Space>
          <EditOutlined />
          Ngân hàng đề thi
        </Space>
      ),
      children: <Tests />,
    },
  ];

  return (
    <>
      <ModalCreateUpdateTestOutline
        open={open === 'modal'}
        onClose={() => {
          setOpen('');
        }}
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
                    <Breadcrumb.Item>Quản lý khung đề thi</Breadcrumb.Item>
                    <Breadcrumb.Item>Chi tiết khung đề thi</Breadcrumb.Item>
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
                        Chi tiết khung đề thi
                      </Title>
                      <Text type="secondary" style={{ fontSize: '16px' }}>
                        Hệ thống hóa – Quản lý dễ dàng - Kiểm soát toàn diện
                      </Text>
                    </div>
                  </Space>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => navigate('/test-generate')}
                    icon={<PlayCircleOutlined />}
                  >
                    Sinh đề
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            size="large"
            tabBarStyle={{ marginBottom: 0 }}
          />
        </Card>
      </Card>
    </>
  );
};

export default TestOutlineDetail;
