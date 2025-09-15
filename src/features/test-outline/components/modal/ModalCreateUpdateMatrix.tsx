import { addMatrix, updateMatrix } from '#/src/redux/slice/matrix.slice';
import { useAppDispatch } from '#/src/redux/store/store';
import { Button, Form, Input, InputNumber, message, Modal, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Option } from 'antd/es/mentions';
import React, { useEffect } from 'react';

interface ModalCreateUpdateMatrixProps {
  open: boolean;
  onClose: () => void;
  itemUpdate?: any | null;
}

const ModalCreateUpdateMatrix = ({
  open,
  onClose,
  itemUpdate,
}: ModalCreateUpdateMatrixProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (itemUpdate) {
      form.setFieldsValue(itemUpdate);
    } else {
      form.resetFields();
    }
  }, [open, itemUpdate]);

  function generateRandomCode() {
    const prefix = 'MT';
    const randomNumber = Math.floor(Math.random() * 999) + 1; // số từ 1 đến 999
    const formattedNumber = String(randomNumber).padStart(3, '0'); // chuyển thành 3 chữ số, ví dụ '001'
    return prefix + formattedNumber;
  }

  const handleCreate = async () => {
    const values = await form.validateFields();
    try {
      await dispatch(
        addMatrix({
          id: Math.random().toString(),
          code: generateRandomCode(),
          name: values.name,
          isDefault: false,
          matrixs: [],
        }),
      );
      onClose();
      form.resetFields();
      message.success('Thêm thành công');
    } catch (error) {
      message.error('Thêm thất bại');
    }
  };

  const handleUpdate = async () => {
    const values = await form.validateFields();
    try {
      await dispatch(
        updateMatrix({
          id: itemUpdate.id,
          code: itemUpdate.code,
          name: values.name,
          isDefault: itemUpdate.isDefault,
          matrixs: itemUpdate.matrixs,
        }),
      );
      onClose();
      form.resetFields();
      message.success('Cập nhật thành công');
    } catch (error) {
      message.error('Cập nhật thất bại');
    }
  };

  const handleSubmit = () => {
    if (itemUpdate) handleUpdate();
    else handleCreate();
  };

  return (
    <>
      <Modal
        title={itemUpdate ? 'Chỉnh sửa ma trận đề' : 'Thêm ma trận đề mới'}
        open={open}
        onCancel={onClose}
        width={600}
        okText="Lưu"
        cancelText="Huỷ"
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          {/* <Form.Item name="code" label="Mã ma trận đề">
            <Input className="h-10" placeholder="Nhập mã ma trận đề" />
          </Form.Item> */}

          <Form.Item
            name="name"
            label="Tên ma trận đề"
            rules={[
              { required: true, message: 'Vui lòng nhập tên ma trận đề!' },
            ]}
          >
            <Input className="h-10" placeholder="Nhập tên ma trận đề" />
          </Form.Item>

          {/* <Form.Item
            name="description"
            label="Mô tả"
            // rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <TextArea rows={3} placeholder="Nhập mô tả về ma trận đề" />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateMatrix;
