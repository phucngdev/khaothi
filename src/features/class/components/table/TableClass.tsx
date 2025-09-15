import React, { useState } from 'react';
import { Table, Tag, Space, Button, Modal, Typography, Empty } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ModalCreateUpdateClass from '../modal/ModalCreateUpdateClass';

const { Text } = Typography;

interface ClassData {
  id: string;
  className: string;
  studentCount: number;
  grade: {
    id: string;
    gradeName: string;
  }[];
  subject: {
    id: string;
    subjectName: string;
  }[];
  classCode: string;
  status: string;
}

const TableClass = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<'modal-edit' | ''>('');
  const [itemUpdate, setItemUpdate] = useState<ClassData | null>(null);
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

  const data = {
    items: [
      {
        id: '1',
        className: 'Toán Cao Cấp A1',
        studentCount: 45,
        grade: [{ id: 'g12', gradeName: 'Khối 12' }],
        subject: [{ id: 's1', subjectName: 'Toán' }],
        classCode: 'TC001',
        status: 'active',
      },
      {
        id: '2',
        className: 'Văn Học Việt Nam',
        studentCount: 38,
        grade: [{ id: 'g11', gradeName: 'Khối 11' }],
        subject: [{ id: 's2', subjectName: 'Ngữ Văn' }],
        classCode: 'VH002',
        status: 'active',
      },
      {
        id: '3',
        className: 'Tiếng Anh Giao Tiếp',
        studentCount: 42,
        grade: [{ id: 'g10', gradeName: 'Khối 10' }],
        subject: [{ id: 's3', subjectName: 'Tiếng Anh' }],
        classCode: 'TA003',
        status: 'pending',
      },
      {
        id: '4',
        className: 'Hóa Học Đại Cương',
        studentCount: 35,
        grade: [{ id: 'g12', gradeName: 'Khối 12' }],
        subject: [{ id: 's4', subjectName: 'Hóa học' }],
        classCode: 'HH004',
        status: 'inactive',
      },
      {
        id: '5',
        className: 'Lịch Sử Việt Nam',
        studentCount: 40,
        grade: [{ id: 'g11', gradeName: 'Khối 11' }],
        subject: [{ id: 's5', subjectName: 'Lịch sử' }],
        classCode: 'LS005',
        status: 'active',
      },
      {
        id: '6',
        className: 'Địa Lý Cơ Bản',
        studentCount: 32,
        grade: [{ id: 'g10', gradeName: 'Khối 10' }],
        subject: [{ id: 's6', subjectName: 'Địa lý' }],
        classCode: 'DL006',
        status: 'active',
      },
      {
        id: '7',
        className: 'Sinh Học Nâng Cao',
        studentCount: 37,
        grade: [{ id: 'g12', gradeName: 'Khối 12' }],
        subject: [{ id: 's7', subjectName: 'Sinh học' }],
        classCode: 'SH007',
        status: 'pending',
      },
      {
        id: '8',
        className: 'Giáo Dục Công Dân',
        studentCount: 29,
        grade: [{ id: 'g11', gradeName: 'Khối 11' }],
        subject: [{ id: 's8', subjectName: 'GDCD' }],
        classCode: 'CD008',
        status: 'inactive',
      },
      {
        id: '9',
        className: 'Tin Học Ứng Dụng',
        studentCount: 33,
        grade: [{ id: 'g10', gradeName: 'Khối 10' }],
        subject: [{ id: 's9', subjectName: 'Tin học' }],
        classCode: 'TH009',
        status: 'active',
      },
      {
        id: '10',
        className: 'Vật Lý Hiện Đại',
        studentCount: 41,
        grade: [{ id: 'g12', gradeName: 'Khối 12' }],
        subject: [{ id: 's10', subjectName: 'Vật lý' }],
        classCode: 'VL010',
        status: 'active',
      },
    ],
    meta: {
      limit: 10,
      offset: 0,
      total: 10,
      totalPages: 1,
    },
  };

  const columns: ColumnsType<ClassData> = [
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
      title: 'Tên Lớp',
      dataIndex: 'className',
      key: 'className',
      width: 200,
      render: (className: number, record: any) => (
        <>
          <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
            {className}
          </span>
          <br />
          <Tag>{record.classCode}</Tag>
        </>
      ),
    },
    {
      title: 'Số Học Viên',
      dataIndex: 'studentCount',
      key: 'studentCount',
      width: 120,
      render: (count: number) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>{count}</span>
      ),
    },
    {
      title: 'Khối',
      dataIndex: 'grade',
      key: 'grade',
      width: 150,
      render: (__: any, record: any) => (
        <>
          {record.grade.map((g: any) => (
            <Tag color="blue" key={g.id}>
              {g.gradeName}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Lớp',
      dataIndex: 'class',
      key: 'class',
      width: 150,
      render: (__: any, record: any) => (
        <>
          {record.subject.map((c: any) => (
            <Tag color="purple" key={c.id}>
              {c.subjectName}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: ClassData['status']) => {
        const map: Record<
          ClassData['status'],
          { color: string; text: string }
        > = {
          active: { color: 'green', text: 'Hoạt động' },
          inactive: { color: 'red', text: 'Tạm dừng' },
          pending: { color: 'orange', text: 'Chờ duyệt' },
        };
        return <Tag color={map[status].color}>{map[status].text}</Tag>;
      },
    },
    {
      title: 'Thao Tác',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={e => {
              e.stopPropagation();
              setItemUpdate(record);
              setOpen('modal-edit');
            }}
          >
            Chính sửa
          </Button>
          <Button
            danger
            type="text"
            onClick={e => {
              e.stopPropagation();
              handleDelete(record);
            }}
            icon={<DeleteOutlined />}
          >
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (record: ClassData) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có muốn xoá lớp "${record.className}"?`,
      okText: 'Xác nhận',
      okType: 'danger',
      onOk: async () => {},
      title: 'Xác nhận xoá',
    });
  };

  return (
    <>
      <ModalCreateUpdateClass
        open={open === 'modal-edit'}
        onClose={() => {
          setItemUpdate(null);
          setOpen('');
        }}
        itemUpdate={itemUpdate}
      />
      <Table
        columns={columns}
        rowKey="id"
        dataSource={data.items}
        loading={loading}
        pagination={{
          pageSize: pagination.limit,
          showSizeChanger: true,
          showTotal: total => `Tổng số ${total} tag`,
          total: data.meta.total,
        }}
        onChange={handleTableChange}
        locale={{
          emptyText: <Empty description="Không có dữ liệu" />,
        }}
      />
    </>
  );
};

export default TableClass;
