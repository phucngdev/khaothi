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
import TableQuestion from '../components/table/TableQuestion';
import DrawerCreateUpdateQuestion from '../components/drawer/DrawerCreateUpdateQuestion';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';

const { Title, Text } = Typography;

const Questions = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<'modal' | 'drawer' | ''>('');

  return (
    <>
      <DrawerCreateUpdateQuestion
        open={open === 'drawer'}
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
                    <Breadcrumb.Item>Ngân hàng câu hỏi</Breadcrumb.Item>
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
                        Ngân hàng câu hỏi
                      </Title>
                      <Text type="secondary" style={{ fontSize: '16px' }}>
                        Hệ thống hóa – Quản lý dễ dàng - Kiểm soát toàn diện
                      </Text>
                    </div>
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <Input.Search
                      placeholder="Tìm kiếm theo tiêu đề, danh mục, tag..."
                      allowClear
                      style={{ width: 300 }}
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                    />
                    <Button onClick={() => navigate('/import-questions')}>
                      <img src={ms_excel} alt="icon-excel" />
                      Tải danh sách
                    </Button>
                    <Button
                      onClick={() => setOpen('drawer')}
                      type="primary"
                      icon={<PlusOutlined />}
                    >
                      Thêm câu hỏi
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <TableQuestion />
      </Card>
    </>
  );
};

export default Questions;
