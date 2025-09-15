import {
  addMatrixSubject,
  updateMatrix,
  updateMatrixSubject,
} from '#/src/redux/slice/matrix.slice';
import { useAppDispatch } from '#/src/redux/store/store';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Tooltip,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react';

const { Option } = Select;
const levels = ['recognition', 'understanding', 'application'];
const labelLevel: any = {
  recognition: 'Dễ',
  understanding: 'Trung bình',
  application: 'Khó',
};
interface ModalCreateUpdateSubjectProps {
  open: boolean;
  onClose: () => void;
  itemUpdate?: any | null;
  matrixId?: string | null;
}

const ModalCreateUpdateSubject = ({
  open,
  onClose,
  itemUpdate,
  matrixId,
}: ModalCreateUpdateSubjectProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const counts = Form.useWatch('count', form);

  useEffect(() => {
    if (itemUpdate) {
      form.setFieldsValue({
        name: itemUpdate.name,
        description: itemUpdate.description,
        count: {
          recognition: itemUpdate.recognition?.count,
          understanding: itemUpdate.understanding?.count,
          application: itemUpdate.application?.count,
        },
        score: {
          recognition: itemUpdate.recognition?.score,
          understanding: itemUpdate.understanding?.score,
          application: itemUpdate.application?.score,
        },
      });
    } else {
      form.resetFields();
    }
  }, [open, itemUpdate]);

  const handleCreate = async () => {
    const values = await form.validateFields();
    try {
      dispatch(
        addMatrixSubject({
          id: matrixId,
          data: {
            id: Math.random().toString(),
            name: values.name,
            recognition: {
              count: values.count.recognition || 0,
              score: values.score.recognition || 0,
            },
            understanding: {
              count: values.count.understanding || 0,
              score: values.score.understanding || 0,
            },
            application: {
              count: values.count.application || 0,
              score: values.score.application || 0,
            },
          },
        }),
      );
      message.success('Thêm thành công');
      form.resetFields();
      onClose();
    } catch (error) {
      console.log('🚀 ~ handleCreate ~ error:', error);
      message.error('Thêm thất bại');
    }
  };

  const handleUpdate = async () => {
    const values = await form.validateFields();
    try {
      dispatch(
        updateMatrixSubject({
          id: matrixId,
          matrixId: itemUpdate.id,
          data: {
            id: itemUpdate.id,
            name: values.name,
            recognition: {
              count: values.count.recognition || 0,
              score: values.score.recognition || 0,
            },
            understanding: {
              count: values.count.understanding || 0,
              score: values.score.understanding || 0,
            },
            application: {
              count: values.count.application || 0,
              score: values.score.application || 0,
            },
          },
        }),
      );
      message.success('Cập nhật thành công');
      form.resetFields();
      onClose();
    } catch (error) {
      console.log('🚀 ~ handleCreate ~ error:', error);
      message.error('Cập nhật thất bại');
    }
  };

  const handleSubmit = async () => {
    if (itemUpdate) handleUpdate();
    else handleCreate();
  };

  return (
    <>
      <Modal
        title={itemUpdate ? 'Chỉnh sửa mạch/chủ đề' : 'Thêm mạch/chủ đề mới'}
        open={open}
        onCancel={onClose}
        width={900}
        okText="Lưu"
        onOk={handleSubmit}
        cancelText="Huỷ"
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên mạch/chủ đề"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên mạch/chủ đề!' },
                ]}
              >
                <Input className="h-10" placeholder="Nhập tên mạch/chủ đề" />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Số lượng câu hỏi" />
            </Col>
            {levels.map(level => (
              <Col span={6} key={level}>
                <Form.Item name={['count', level]} label={labelLevel[level]}>
                  <InputNumber
                    min={0}
                    className="h-10"
                    style={{ width: '100%' }}
                    placeholder="Số câu hỏi"
                  />
                </Form.Item>
              </Col>
            ))}
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Loại câu hỏi" />
            </Col>
            {levels.map(level => {
              const disabled = !(counts?.[level] > 0);
              return (
                <Col span={6} key={level}>
                  <Form.Item name={['type', level]}>
                    <Select
                      className="h-10"
                      placeholder="Tất cả"
                      disabled={disabled}
                    >
                      <Option value="all">Tất cả</Option>
                      <Option value="tracnghiem">Trắc nghiệm</Option>
                      <Option value="tuluan">Tự luận</Option>
                    </Select>
                  </Form.Item>
                </Col>
              );
            })}
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Điểm cộng trên mỗi câu đúng" />
            </Col>
            {levels.map(level => {
              const disabled = !(counts?.[level] > 0);
              return (
                <Col span={6} key={level}>
                  <Form.Item name={['score', level]}>
                    <InputNumber
                      min={0}
                      className="h-10"
                      disabled={disabled}
                      placeholder="Nhập điểm"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              );
            })}
          </Row>

          <Form.Item name="description" label="Mô tả">
            <TextArea rows={3} placeholder="Nhập mô tả về mạch/chủ đề" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateSubject;
