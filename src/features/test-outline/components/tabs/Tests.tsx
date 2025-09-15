import {
  Button,
  Card,
  message,
  Modal,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
const { Text } = Typography;

interface TestData {
  key: string;
  stt: number;
  deSo: string;
  thongTinChiTiet: string;
  thongTinGoiDe: string;
  trangThai: 'active' | 'inactive' | 'pending';
  thamDinh: 'approved' | 'rejected' | 'waiting';
}

const Tests = () => {
  const data: TestData[] = [
    {
      key: '1',
      stt: 1,
      deSo: 'IT001',
      thongTinChiTiet: 'Đề thi Cơ sở dữ liệu - SQL nâng cao',
      thongTinGoiDe: 'Gói đề thi Công nghệ thông tin 2025',
      trangThai: 'active',
      thamDinh: 'approved',
    },
    {
      key: '2',
      stt: 2,
      deSo: 'IT002',
      thongTinChiTiet: 'Đề thi Lập trình Java - Hướng đối tượng',
      thongTinGoiDe: 'Gói đề thi Công nghệ thông tin 2025',
      trangThai: 'pending',
      thamDinh: 'waiting',
    },
    {
      key: '3',
      stt: 3,
      deSo: 'IT003',
      thongTinChiTiet: 'Đề thi Mạng máy tính - Kiến trúc TCP/IP',
      thongTinGoiDe: 'Gói đề thi Công nghệ thông tin 2025',
      trangThai: 'inactive',
      thamDinh: 'rejected',
    },
    {
      key: '4',
      stt: 4,
      deSo: 'IT004',
      thongTinChiTiet:
        'Đề thi Cấu trúc dữ liệu & Giải thuật - Phân tích độ phức tạp',
      thongTinGoiDe: 'Gói đề thi Công nghệ thông tin 2025',
      trangThai: 'active',
      thamDinh: 'approved',
    },
    {
      key: '5',
      stt: 5,
      deSo: 'IT005',
      thongTinChiTiet: 'Đề thi An toàn thông tin - Mã hóa & Bảo mật mạng',
      thongTinGoiDe: 'Gói đề thi Công nghệ thông tin 2025',
      trangThai: 'pending',
      thamDinh: 'waiting',
    },
  ];

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
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

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa đề này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okType: 'danger',
      onOk: () => {
        message.success('Đã xóa đề thành công');
      },
    });
  };

  const getTrangThaiColor = (trangThai: string) => {
    switch (trangThai) {
      case 'active':
        return 'green';
      case 'pending':
        return 'orange';
      case 'inactive':
        return 'red';
      default:
        return 'default';
    }
  };

  const getTrangThaiText = (trangThai: string) => {
    switch (trangThai) {
      case 'active':
        return 'Hoạt động';
      case 'pending':
        return 'Chờ duyệt';
      case 'inactive':
        return 'Không hoạt động';
      default:
        return trangThai;
    }
  };

  const getThamDinhColor = (thamDinh: string) => {
    switch (thamDinh) {
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      case 'waiting':
        return 'gold';
      default:
        return 'default';
    }
  };

  const getThamDinhText = (thamDinh: string) => {
    switch (thamDinh) {
      case 'approved':
        return 'Đã duyệt';
      case 'rejected':
        return 'Từ chối';
      case 'waiting':
        return 'Chờ thẩm định';
      default:
        return thamDinh;
    }
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 60,
      align: 'center' as const,
      render: (__: any, record: any, index: number) => {
        return (
          <Text strong style={{ color: '#1890ff' }}>
            {(pagination.current - 1) * pagination.limit + index + 1}
          </Text>
        );
      },
    },
    {
      title: 'Đề số',
      dataIndex: 'deSo',
      key: 'deSo',
      width: 100,
    },
    {
      title: 'Thông tin chi tiết',
      dataIndex: 'thongTinChiTiet',
      key: 'thongTinChiTiet',
      width: 300,
    },
    {
      title: 'Thông tin gói đề',
      dataIndex: 'thongTinGoiDe',
      key: 'thongTinGoiDe',
      width: 200,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      width: 120,
      render: (trangThai: string) => (
        <Tag color={getTrangThaiColor(trangThai)}>
          {getTrangThaiText(trangThai)}
        </Tag>
      ),
    },
    {
      title: 'Thẩm định',
      dataIndex: 'thamDinh',
      key: 'thamDinh',
      width: 120,
      render: (thamDinh: string) => (
        <Tag color={getThamDinhColor(thamDinh)}>
          {getThamDinhText(thamDinh)}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'hanhDong',
      width: 150,
      align: 'center' as const,
      render: (_: any, record: TestData) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              onClick={e => {
                e.stopPropagation();
                handleDelete(record);
              }}
              icon={<DeleteOutlined />}
              danger
            />
          </Tooltip>
          <Tooltip title="Phê duyệt">
            <Button type="text" icon={<CheckOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title="Ngân hàng đề thi"
        extra={<Space>{/* <Button type="primary">Sinh đề</Button> */}</Space>}
        style={{ marginTop: 16 }}
      >
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            pageSize: pagination.limit,
            showSizeChanger: true,
            showTotal: total => `Tổng số ${total} đề`,
            total: data.length,
          }}
          onChange={handleTableChange}
          scroll={{ x: 'max-content' }}
          onRow={record => ({
            onClick: () => {},
            style: { cursor: 'pointer' },
          })}
        />
      </Card>
    </>
  );
};

export default Tests;
