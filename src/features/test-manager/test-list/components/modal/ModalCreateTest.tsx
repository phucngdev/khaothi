import React, { useState } from 'react';
import {
  Form,
  Input,
  Switch,
  Radio,
  DatePicker,
  InputNumber,
  Select,
  Checkbox,
  Button,
  Card,
  Row,
  Col,
  Space,
  Divider,
  Typography,
  Breadcrumb,
  Modal,
} from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

interface ModalCreateTestProps {
  open: boolean;
  onClose: () => void;
}

const ModalCreateTest = ({ open, onClose }: ModalCreateTestProps) => {
  const [form] = Form.useForm();

  const [examType, setExamType] = useState(1);
  const [studentAddMethod, setStudentAddMethod] = useState('class');
  const [packageType, setPackageType] = useState('mine');

  const handleSubmit = async () => {
    const values = await form.validateFields();
    console.log('Form values:', values);
  };

  return (
    <>
      <Modal
        title={'Thêm Quiz mới'}
        open={open}
        onCancel={onClose}
        width={900}
        okText="Lưu"
        cancelText="Hủy"
      >
        {' '}
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            autoOpen: false,
            examType: 1,
            studentMethod: 'class',
            packageType: 'mine',
            showAnswerLabels: true,
            showScore: true,
            showCorrectCount: true,
            showTopicScore: false,
            screenWarning: true,
            requireConfirmCode: false,
            allowDeviceChange: false,
            server: 'default',
            requireSpecialSoftware: false,
            requireCamera: false,
            requireAllAnswers: false,
            preventReview: false,
            useLogo: false,
            useIdReader: false,
            predictiveQuestions: false,
            hideStudentInfo: false,
          }}
        >
          <Card
            title="Thông tin cơ bản"
            style={{
              marginBottom: 16,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Tên ca thi"
                  name="examName"
                  rules={[
                    { required: true, message: 'Vui lòng nhập tên ca thi!' },
                  ]}
                >
                  <Input placeholder="Nhập tên ca thi" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mở ca tự động"
                  name="autoOpen"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Vào thi" name="examType">
              <Radio.Group onChange={e => setExamType(e.target.value)}>
                <Radio value={1}>1. Sử dụng mã thí sinh</Radio>
                <Radio value={2}>2. Tự do</Radio>
              </Radio.Group>
            </Form.Item>
          </Card>

          {/* Thời gian */}
          <Card title="Thời gian thi" style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Giờ mở ca"
                  name="openTime"
                  rules={[
                    { required: true, message: 'Vui lòng chọn giờ mở ca!' },
                  ]}
                >
                  <DatePicker
                    showTime
                    format="DD/MM/YYYY HH:mm"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Giờ hết hạn rút đề"
                  name="withdrawDeadline"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn giờ hết hạn rút đề!',
                    },
                  ]}
                >
                  <DatePicker
                    showTime
                    format="DD/MM/YYYY HH:mm"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Giờ đóng ca"
                  name="closeTime"
                  rules={[
                    { required: true, message: 'Vui lòng chọn giờ đóng ca!' },
                  ]}
                >
                  <DatePicker
                    showTime
                    format="DD/MM/YYYY HH:mm"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Thời gian làm bài (Phút)"
                  name="duration"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập thời gian làm bài!',
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    placeholder="Nhập số phút"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* Thông tin gói đề */}
          <Card title="Thông tin gói đề" style={{ marginBottom: 16 }}>
            <Form.Item label="" name="packageType">
              <Radio.Group onChange={e => setPackageType(e.target.value)}>
                <Radio value="mine">Gói đề của tôi</Radio>
                <Radio value="shared">Gói đề được chia sẻ</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Chọn gói đề"
              name="packageId"
              rules={[{ required: true, message: 'Vui lòng chọn gói đề!' }]}
            >
              <Select placeholder="Chọn gói đề">
                <Option value="package1">Gói đề Toán học - Lớp 12</Option>
                <Option value="package2">Gói đề Vật lý - Lớp 11</Option>
                <Option value="package3">Gói đề Hóa học - Lớp 10</Option>
              </Select>
            </Form.Item>
          </Card>

          {/* Thêm thí sinh */}
          <Card title="Thêm thí sinh" style={{ marginBottom: 16 }}>
            <Form.Item label="" name="studentMethod">
              <Radio.Group onChange={e => setStudentAddMethod(e.target.value)}>
                <Radio value="class">Theo lớp</Radio>
                <Radio value="individual">Thêm từng học sinh</Radio>
              </Radio.Group>
            </Form.Item>

            {studentAddMethod === 'class' && (
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Chọn lớp" name="classId">
                    <Select placeholder="Chọn lớp">
                      <Option value="class1">Lớp 12A1</Option>
                      <Option value="class2">Lớp 12A2</Option>
                      <Option value="class3">Lớp 11A1</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Khối" name="grade">
                    <Select placeholder="Chọn khối">
                      <Option value="10">Khối 10</Option>
                      <Option value="11">Khối 11</Option>
                      <Option value="12">Khối 12</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Môn học" name="subject">
                    <Select placeholder="Chọn môn">
                      <Option value="math">Toán học</Option>
                      <Option value="physics">Vật lý</Option>
                      <Option value="chemistry">Hóa học</Option>
                      <Option value="biology">Sinh học</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            )}
          </Card>

          {/* Tùy chọn nâng cao */}
          <Card title="Tùy chọn nâng cao" style={{ marginBottom: 16 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item name="showAnswerLabels" valuePropName="checked">
                  <Checkbox>Hiển thị nhãn câu trả lời (A - B - C - D)</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="showScore" valuePropName="checked">
                  <Checkbox>Hiển thị điểm số sau thi</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="showCorrectCount" valuePropName="checked">
                  <Checkbox>Hiển thị số lượng câu đúng sau thi</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="showTopicScore" valuePropName="checked">
                  <Checkbox>Hiển thị điểm theo mạch/chủ đề cấp 1</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="screenWarning" valuePropName="checked">
                  <Checkbox>Cảnh báo rời màn hình</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="requireConfirmCode" valuePropName="checked">
                  <Checkbox>Mã xác nhận vào thi</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="allowDeviceChange" valuePropName="checked">
                  <Checkbox>Mã đổi thiết bị</Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Server thi" name="server">
                  <Select>
                    <Option value="default">Mặc định</Option>
                    <Option value="e1">E1</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Thang điểm" name="scoreScale">
                  <InputNumber
                    min={1}
                    max={100}
                    placeholder="10"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="requireSpecialSoftware"
                  valuePropName="checked"
                >
                  <Checkbox>Bắt buộc sử dụng phần mềm thi chuyên dụng</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="requireCamera" valuePropName="checked">
                  <Checkbox>Yêu cầu thiết bị có camera</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="requireAllAnswers" valuePropName="checked">
                  <Checkbox>Yêu cầu hoàn thành tất cả các câu hỏi</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="preventReview" valuePropName="checked">
                  <Checkbox>Không cho phép xem lại bài làm</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="useLogo" valuePropName="checked">
                  <Checkbox>Sử dụng logo đơn vị</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="useIdReader" valuePropName="checked">
                  <Checkbox>Sử dụng với thiết bị FPT.IDReader</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="predictiveQuestions" valuePropName="checked">
                  <Checkbox>Câu hỏi dự đoán</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="hideStudentInfo" valuePropName="checked">
                  <Checkbox>Ẩn thông tin thí sinh khi chấm tự luận</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateTest;
