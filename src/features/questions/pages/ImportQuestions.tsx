import { useRef, useState } from 'react';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DatabaseOutlined,
  DownloadOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  SaveOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Form,
  Input,
  MenuProps,
  message,
  Row,
  Select,
  Space,
  Typography,
  Upload,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import TableQuestion from '../components/table/TableQuestion';
import DrawerCreateUpdateQuestion from '../components/drawer/DrawerCreateUpdateQuestion';
import { beforeUploadExcel } from '#/shared/props/beforeUpload';
import ms_excel from '#/assets/images/icon_button/ms_excel.png';

const { Title, Text } = Typography;

const ImportQuestions = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [open, setOpen] = useState<'modal' | 'drawer' | ''>('');

  const excelMenu: MenuProps['items'] = [
    {
      key: 'upload',
      label: (
        <Upload
          showUploadList={false}
          beforeUpload={beforeUploadExcel}
          customRequest={async ({ file }) => {
            message.success('Đang tải file...');
          }}
        >
          <Button type="text">Chọn file câu hỏi</Button>
        </Upload>
      ),
      icon: <UploadOutlined />,
    },
    {
      key: 'template',
      label: (
        <Button className="w-full" type="text">
          Tải file mẫu
        </Button>
      ),
      icon: <DownloadOutlined />,
    },
  ];

  const handleExcelClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'upload':
        break;
      case 'template':
        message.success('Đang tải file mẫu...');
        break;
      default:
        break;
    }
  };

  return (
    <>
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
                    <Breadcrumb.Item>Import câu hỏi</Breadcrumb.Item>
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
                        Import câu hỏi
                      </Title>
                      <Text type="secondary" style={{ fontSize: '16px' }}>
                        Hệ thống hóa – Quản lý dễ dàng - Kiểm soát toàn diện
                      </Text>
                    </div>
                  </Space>
                </Col>
                <Col></Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Card>
          <Form layout="vertical" form={form}>
            <Title level={5}>Bước 1: Chọn tệp tin câu hỏi</Title>
            <Space style={{ marginBottom: 24 }}>
              <Button type="primary" icon={<FileWordOutlined />} ghost>
                Word file
              </Button>
              <Button type="primary" icon={<DatabaseOutlined />} ghost>
                Backup file
              </Button>
              <Dropdown
                arrow
                menu={{ items: excelMenu, onClick: handleExcelClick }}
                placement="bottom"
              >
                <Button type="primary" icon={<FileExcelOutlined />}>
                  Excel file
                </Button>
              </Dropdown>
            </Space>

            <Divider />

            <Title level={5}>Bước 2: Lưu câu hỏi vào</Title>
            <Row gutter={16} align="middle">
              <Col span={8}>
                <Form.Item
                  label="Khung đề"
                  name="frame"
                  rules={[
                    { required: true, message: 'Vui lòng chọn khung đề' },
                  ]}
                >
                  <Select defaultValue="personal">
                    <Select.Option value="personal">
                      Ngân hàng câu hỏi
                    </Select.Option>
                    <Select.Option value="shared">Kho 1</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Đơn vị kiến thức" name="unit">
                  <Select placeholder="Chọn đơn vị kiến thức" disabled>
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="2">2</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Title level={5}>Bước 3: Lưu</Title>
            <Button icon={<SaveOutlined />} type="primary">
              Lưu file
            </Button>
          </Form>
        </Card>
        <Upload
          beforeUpload={beforeUploadExcel}
          showUploadList={false}
          customRequest={async ({ file }) => {
            try {
              message.success('Đang tải file...');
            } catch (error) {
              message.error('Tải lên thất bại');
            } finally {
            }
          }}
          className="w-full"
        >
          <p></p>
        </Upload>
      </Card>
    </>
  );
};

export default ImportQuestions;
