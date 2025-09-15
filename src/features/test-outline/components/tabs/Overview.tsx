import { updateOutline } from '#/src/redux/slice/test-outline.slice';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const { Text } = Typography;

const Overview = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { dataEdit } = useSelector((state: RootState) => state.test_outline);

  useEffect(() => {
    if (dataEdit) {
      form.setFieldsValue({
        ...dataEdit,
        createdAt: dayjs(dataEdit.createdAt),
      });
    } else {
      form.resetFields();
    }
  }, [dataEdit]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    try {
      await dispatch(
        updateOutline({
          id: dataEdit.id,
          ...values,
        }),
      );
      message.success('Cập nhật thành công');
    } catch (error) {
      message.error('Cập nhật thất bại');
    }
  };

  return (
    <>
      <Card
        title="Thông tin chung"
        extra={
          <Space>
            <Button type="default">Hủy</Button>
            <Button type="primary" onClick={handleSubmit}>
              Lưu thay đổi
            </Button>
          </Space>
        }
        style={{ marginTop: 16 }}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="name" label="Tên khung đề thi">
                <Input placeholder="Nhập tên khung đề thi" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="code" label="Mã khung đề thi">
                <Input disabled placeholder="Nhập mã khung đề thi" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="subjects" label="Ngành">
                <Select placeholder="Chọn ngành">
                  <Select.Option value="toan">Toán học</Select.Option>
                  <Select.Option value="ly">Vật lý</Select.Option>
                  <Select.Option value="hoa">Hóa học</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="grade" label="Khối lớp">
                <Select placeholder="Chọn khối lớp">
                  <Select.Option value="10">Lớp 10</Select.Option>
                  <Select.Option value="11">Lớp 11</Select.Option>
                  <Select.Option value="12">Lớp 12</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="examTime" label="Thời gian làm bài (phút)">
                <InputNumber
                  min={1}
                  style={{ width: '100%' }}
                  placeholder="90"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="totalQuestions" label="Tổng số câu hỏi">
                <InputNumber
                  min={1}
                  style={{ width: '100%' }}
                  placeholder="50"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="description" label="Mô tả">
                <TextArea
                  rows={4}
                  placeholder="Nhập mô tả chi tiết về khung đề thi"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="createdAt" label="Ngày tạo">
                <DatePicker style={{ width: '100%' }} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Người tạo">
                <Input placeholder="Tên người tạo" disabled />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default Overview;
