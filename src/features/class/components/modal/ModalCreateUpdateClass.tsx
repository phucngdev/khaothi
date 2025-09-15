import { Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

interface ModalCreateUpdateClassProps {
  open: boolean;
  onClose: () => void;
  itemUpdate?: any | null;
}

const ModalCreateUpdateClass = ({
  open,
  onClose,
  itemUpdate,
}: ModalCreateUpdateClassProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (itemUpdate) {
      form.setFieldsValue({
        className: itemUpdate.className,
        gradeIds: itemUpdate.grade?.map((s: any) => s.id),
        subjectIds: itemUpdate.subject?.map((s: any) => s.id),
      });
    } else {
      form.resetFields();
    }
  }, [open, itemUpdate]);

  return (
    <>
      <Modal
        title={itemUpdate ? 'Chỉnh sửa lớp' : 'Thêm lớp mới'}
        open={open}
        onCancel={onClose}
        width={600}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Tên lóp"
            name="className"
            rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}
          >
            <Input className="h-10" placeholder="Nhập tên lớp..." />
          </Form.Item>

          <Form.Item label="Chọn khối" name="gradeIds">
            <Select className="h-10" placeholder="Chọn khối" mode="multiple">
              <Option value="g12">Lớp 12</Option>
              <Option value="g11">Lớp 11</Option>
              <Option value="g10">Lớp 10</Option>
              <Option value="g9">Lớp 9</Option>
              <Option value="g8">Lớp82</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Chọn môn" name="subjectIds">
            <Select className="h-10" placeholder="Chọn môn" mode="multiple">
              <Option value="s1">DCTCT6605C</Option>
              <Option value="s2">DCTCT6604C</Option>
              <Option value="s3">DCTCT6603C</Option>
              <Option value="s4">DCTCT6602C</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateClass;
