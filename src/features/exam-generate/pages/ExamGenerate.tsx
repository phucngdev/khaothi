import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined,
  PlayCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Search from 'antd/es/transfer/search';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const ExamGenerate = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

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
                    <Breadcrumb.Item>Quản lý khung đề thi</Breadcrumb.Item>
                    <Breadcrumb.Item>Chi tiết khung đề thi</Breadcrumb.Item>
                    <Breadcrumb.Item>Sinh đề</Breadcrumb.Item>
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
                        Sinh đề
                      </Title>
                      <Text type="secondary" style={{ fontSize: '16px' }}>
                        Hệ thống hóa – Quản lý dễ dàng - Kiểm soát toàn diện
                      </Text>
                    </div>
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <Button type="primary" icon={<PlayCircleOutlined />}>
                      Bắt đầu
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
          {' '}
          <Form
            layout="vertical"
            form={form}
            initialValues={{
              questionOrder: 'knowledge',
              shuffleAnswers: true,
              autoGenerateNumber: true,
            }}
          >
            <Row gutter={24}>
              <Col span={14}>
                <Title level={4}>Thông tin đề thi</Title>
                <Form.Item
                  label="Khung đề"
                  name="frame"
                  rules={[
                    { required: true, message: 'Vui lòng chọn khung đề' },
                  ]}
                >
                  <Select placeholder="Chọn khung đề">
                    <Select.Option value="frame1">ZYGZEO - test</Select.Option>
                    <Select.Option value="frame2">Khung đề khác</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Tạo gói đề mới"
                  name="newPackage"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label="Gói đề"
                  name="package"
                  rules={[{ required: true, message: 'Vui lòng nhập gói đề' }]}
                >
                  <Input placeholder="Nhập tên gói đề" />
                </Form.Item>

                <Form.Item label="Mẫu header footer của đề" name="headerFooter">
                  <Select defaultValue="default">
                    <Select.Option value="default">Mặc định</Select.Option>
                    <Select.Option value="custom">Tùy chỉnh</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Mẫu đề"
                  name="template"
                  rules={[{ required: true, message: 'Vui lòng chọn mẫu đề' }]}
                >
                  <Select defaultValue="default">
                    <Select.Option value="default">Mặc định</Select.Option>
                    <Select.Option value="custom">Tùy chỉnh</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Số lượng"
                  name="quantity"
                  rules={[
                    { required: true, message: 'Vui lòng nhập số lượng' },
                  ]}
                >
                  <Input
                    type="number"
                    min={1}
                    placeholder="Nhập số lượng câu hỏi"
                  />
                </Form.Item>

                <Form.Item label="Mô tả" name="description">
                  <TextArea rows={3} placeholder="Nhập mô tả đề thi" />
                </Form.Item>
              </Col>

              <Col span={10}>
                <Title level={4}>Cấu hình nâng cao</Title>

                <Form.Item label="Thứ tự câu hỏi" name="questionOrder">
                  <Radio.Group
                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                  >
                    <Radio value="knowledge">Theo đơn vị kiến thức</Radio>
                    <Radio value="level">Theo mức độ nhận biết</Radio>
                    <Radio value="random">Đảo ngẫu nhiên</Radio>
                  </Radio.Group>
                </Form.Item>

                <Divider />

                <Title level={5}>Tùy chọn</Title>
                <Form.Item
                  label="Đảo thứ tự lựa chọn đáp án"
                  name="shuffleAnswers"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label="Tự động sinh số đề"
                  name="autoGenerateNumber"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Card>
    </>
  );
};

export default ExamGenerate;
