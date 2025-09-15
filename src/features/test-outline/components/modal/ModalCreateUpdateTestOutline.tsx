import { addOutline } from '#/src/redux/slice/test-outline.slice';
import { useAppDispatch } from '#/src/redux/store/store';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Option } from 'antd/es/mentions';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

interface ModalCreateUpdateTestOutlineProps {
  open: boolean;
  onClose: () => void;
  itemUpdate?: any | null;
}

const ModalCreateUpdateTestOutline = ({
  open,
  onClose,
  itemUpdate,
}: ModalCreateUpdateTestOutlineProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (itemUpdate) {
    } else {
      form.resetFields();
    }
  }, [open, itemUpdate]);

  function generateRandomCode() {
    const prefix = 'KD';
    const randomNumber = Math.floor(Math.random() * 999) + 1; // số từ 1 đến 999
    const formattedNumber = String(randomNumber).padStart(3, '0'); // chuyển thành 3 chữ số, ví dụ '001'
    return prefix + formattedNumber;
  }

  const handleSubmit = async () => {
    const values = await form.validateFields();
    try {
      await dispatch(
        addOutline({
          id: Math.random().toString(),
          code: generateRandomCode(),
          name: values.name,
          examTime: values.examTime,
          description: values.description,
          subjects: values.subjects,
          totalQuestions: 0,
          status: 'active',
          createdAt: dayjs().format('DD/MM/YYYY'),
          updatedAt: dayjs().format('DD/MM/YYYY'),
        }),
      );
      onClose();
      form.resetFields();
      message.success('Thêm thành công');
    } catch (error) {
      message.error('Thêm thất bại');
    }
  };

  return (
    <>
      <Modal
        title={itemUpdate ? 'Chỉnh sửa khung đề' : 'Thêm khung đề mới'}
        open={open}
        onCancel={onClose}
        width={600}
        okText="Lưu"
        cancelText="Huỷ"
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên khung đề"
            rules={[{ required: true, message: 'Vui lòng nhập tên khung đề!' }]}
          >
            <Input className="h-10" placeholder="Nhập tên khung đề" />
          </Form.Item>

          <Form.Item
            name="examTime"
            label="Thời gian thi (phút)"
            rules={[
              { required: true, message: 'Vui lòng nhập thời gian thi!' },
            ]}
          >
            <InputNumber
              min={1}
              max={300}
              className="h-10"
              placeholder="Nhập thời gian thi"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <TextArea rows={3} placeholder="Nhập mô tả về khung đề" />
          </Form.Item>

          <Form.Item
            name="grade"
            label="Khối"
            rules={[{ required: true, message: 'Vui lòng chọn khối!' }]}
          >
            <Select className="h-10" placeholder="Chọn khối" mode="multiple">
              <Option value="10">Lớp 10</Option>
              <Option value="11">Lớp 11</Option>
              <Option value="12">Lớp 12</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="subjects"
            label="Ngành"
            rules={[
              { required: true, message: 'Vui lòng chọn ít nhất một ngành!' },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn ngành"
              className="h-10"
              style={{ width: '100%' }}
            >
              <Option value="Tri tuệ nhân tạo">Tri tuệ nhân tạo</Option>
              <Option value="Frontend Reactjs">Frontend Reactjs</Option>
              <Option value="Frontend Vuejs">Frontend Vuejs</Option>
              <Option value="Backend Nodejs">Backend Nodejs</Option>
              <Option value="Backend Mestjs">Backend Mestjs</Option>
              <Option value="Lập trình nhúng">Lập trình nhúng</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateTestOutline;
