import React, { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Tag,
  Select,
  Input,
  Modal,
  Form,
  InputNumber,
  Tooltip,
  Badge,
  Typography,
  Empty,
  message,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  deleteOutline,
  editOutline,
} from '#/src/redux/slice/test-outline.slice';

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

interface ExamFramework {
  id: string;
  code: string; // mã khung
  name: string;
  examTime: number; // thời gian thi (phút)
  description: string;
  subjects: string[]; // môn học
  totalQuestions: number; // số đề
  status: 'active' | 'inactive' | 'draft'; // trạng thái
  createdAt: string; // ngày tạo
  updatedAt: string; // ngày cập nhật
}

const renderStatus = (status: string) => {
  const statusConfig = {
    active: { color: '#52c41a', text: 'Hoạt động', status: 'success' },
    inactive: { color: '#ff4d4f', text: 'Ngừng hoạt động', status: 'error' },
    draft: { color: '#faad14', text: 'Nháp', status: 'warning' },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  return (
    <Badge
      status={config.status as any}
      text={
        <span style={{ color: config.color, fontWeight: 500 }}>
          {config.text}
        </span>
      }
    />
  );
};

const TableTestOutline = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.test_outline);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [itemUpdate, setItemUpdate] = useState<ExamFramework | null>(null);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    query: '',
  });

  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;

    setPagination(prev => ({
      ...prev,
      current,
      limit: pageSize,
      offset: (current - 1) * pageSize,
    }));
  };

  const handleDelete = (record: ExamFramework) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa "${record.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {
        await dispatch(deleteOutline(record.id));
        message.success('Xoá thành công');
      },
      title: 'Xác nhận xóa',
    });
  };

  const columns: ColumnsType<ExamFramework> = [
    {
      title: 'No.',
      dataIndex: 'id',
      width: 60,
      render: (_: any, __: any, index: number) => (
        <Text strong style={{ color: '#1890ff' }}>
          {(pagination.current - 1) * pagination.limit + index + 1}
        </Text>
      ),
    },
    {
      title: 'Tên khung đề',
      dataIndex: 'name',
      key: 'name',
      width: 280,
      render: (__: any, record: ExamFramework) => (
        <>
          <Space direction="vertical">
            <Tooltip title={record.name} placement="topLeft">
              <div
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '260px',
                  fontWeight: 500,
                  color: '#262626',
                }}
              >
                {record.name}
              </div>
            </Tooltip>
            <Text>
              Mã khung:{' '}
              <Tag
                color="blue"
                style={{ fontWeight: 'bold', fontSize: '12px' }}
              >
                {record.code}
              </Tag>
            </Text>
          </Space>
        </>
      ),
    },
    {
      title: 'Thời gian',
      dataIndex: 'examTime',
      key: 'examTime',
      width: 120,
      align: 'center',
      render: (time: number) => (
        <Tag color="cyan" style={{ fontWeight: 500 }}>
          {time} phút
        </Tag>
      ),
    },
    {
      title: 'Số đề',
      dataIndex: 'totalQuestions',
      key: 'totalQuestions',
      width: 100,
      align: 'center',
      render: (total: number) => (
        <div
          style={{
            fontWeight: 600,
            color: '#1890ff',
            backgroundColor: '#f0f8ff',
            padding: '4px 8px',
            borderRadius: '4px',
            display: 'inline-block',
          }}
        >
          {total}
        </div>
      ),
    },
    {
      title: 'Ngành',
      dataIndex: 'subjects',
      key: 'subjects',
      width: 200,
      render: (subjects: string[]) => (
        <Space size={4} wrap>
          {subjects.map((subject, index) => (
            <Tag
              key={index}
              color="purple"
              style={{
                margin: '1px',
                borderRadius: '8px',
                fontSize: '11px',
              }}
            >
              {subject}
            </Tag>
          ))}
        </Space>
      ),
    },
    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'status',
    //   key: 'status',
    //   width: 160,
    //   align: 'center',
    //   render: (status: string) => renderStatus(status),
    // },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <Tooltip title={text} placement="topLeft">
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '280px',
              color: '#595959',
            }}
          >
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          {/* <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{ color: '#52c41a' }}
            />
          </Tooltip> */}
          <Tooltip title="Xóa">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={e => {
                e.stopPropagation();
                handleDelete(record);
              }}
              style={{ color: '#ff4d4f' }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data.items}
        pagination={{
          pageSize: pagination.limit,
          showSizeChanger: true,
          showTotal: total => `Tổng số ${total} kỳ thi`,
          total: data.meta.total,
        }}
        onChange={handleTableChange}
        loading={loading}
        rowKey="id"
        locale={{
          emptyText: <Empty description="Không có dữ liệu" />,
        }}
        onRow={(record: any) => ({
          onClick: () => {
            dispatch(editOutline(record));
            navigate(`/test-outline/${record.id}`);
          },
          style: { cursor: 'pointer' },
        })}
      />
    </>
  );
};

export default TableTestOutline;
