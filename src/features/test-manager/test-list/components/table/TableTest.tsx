import React, { useState } from 'react';
import {
  Table,
  Card,
  Button,
  Space,
  Tag,
  Tooltip,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Dropdown,
  Modal,
  message,
  Badge,
  Typography,
  Popconfirm,
  Empty,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  StopOutlined,
  SearchOutlined,
  MoreOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { MenuProps } from 'antd';
import dayjs from 'dayjs';
import './index.scss';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

// Interface cho dữ liệu ca thi
interface ExamSession {
  id: string;
  examName: string;
  packageName: string;
  grade: string;
  subject: string;
  className: string;
  openTime: string;
  closeTime: string;
  withdrawDeadline: string;
  duration: number;
  studentCount: number;
  submittedCount: number;
  status: 'draft' | 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  examType: 1 | 2; // 1: Sử dụng mã thí sinh, 2: Tự do
  autoOpen: boolean;
  createdAt: string;
  createdBy: string;
}

// Dữ liệu mẫu
const mockData: ExamSession[] = [
  {
    id: '1',
    examName: 'Kiểm tra giữa kỳ I - Toán 12',
    packageName: 'Gói đề Toán học - Lớp 12',
    grade: '12',
    subject: 'Toán học',
    className: '12A1, 12A2',
    openTime: '2025-09-15 08:00',
    closeTime: '2025-09-15 11:00',
    withdrawDeadline: '2025-09-15 10:30',
    duration: 90,
    studentCount: 65,
    submittedCount: 0,
    status: 'scheduled',
    examType: 1,
    autoOpen: true,
    createdAt: '2025-09-10 14:30',
    createdBy: 'Nguyễn Văn A',
  },
  {
    id: '2',
    examName: 'Thi thử THPT Quốc gia - Vật lý',
    packageName: 'Gói đề Vật lý - Lớp 11',
    grade: '11',
    subject: 'Vật lý',
    className: '11A1, 11A3',
    openTime: '2025-09-12 07:30',
    closeTime: '2025-09-12 09:30',
    withdrawDeadline: '2025-09-12 09:00',
    duration: 90,
    studentCount: 48,
    submittedCount: 45,
    status: 'completed',
    examType: 1,
    autoOpen: false,
    createdAt: '2025-09-08 10:15',
    createdBy: 'Trần Thị B',
  },
  {
    id: '3',
    examName: 'Kiểm tra 15 phút - Hóa học',
    packageName: 'Gói đề Hóa học - Lớp 10',
    grade: '10',
    subject: 'Hóa học',
    className: '10A2',
    openTime: '2025-09-11 13:30',
    closeTime: '2025-09-11 14:00',
    withdrawDeadline: '2025-09-11 13:50',
    duration: 15,
    studentCount: 32,
    submittedCount: 28,
    status: 'ongoing',
    examType: 2,
    autoOpen: true,
    createdAt: '2025-09-09 16:20',
    createdBy: 'Lê Văn C',
  },
];

const TableTest = () => {
  const [data, setData] = useState<ExamSession[]>(mockData);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<ExamSession[]>([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null,
  );
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

  // Trạng thái ca thi
  const getStatusConfig = (status: ExamSession['status']) => {
    const configs = {
      draft: { color: 'default', text: 'Nháp', icon: '📝' },
      scheduled: { color: 'blue', text: 'Đã lập lịch', icon: '⏰' },
      ongoing: { color: 'green', text: 'Đang diễn ra', icon: '🟢' },
      completed: { color: 'success', text: 'Hoàn thành', icon: '✅' },
      cancelled: { color: 'error', text: 'Đã hủy', icon: '❌' },
    };
    return configs[status];
  };

  const columns: ColumnsType<ExamSession> = [
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
      title: 'Tên ca thi',
      dataIndex: 'examName',
      key: 'examName',
      width: 230,
      fixed: 'left',
      render: (text: string, record: ExamSession) => (
        <div>
          <div className="font-medium text-gray-900">{text}</div>
          <div className="text-sm text-gray-500">{record.packageName}</div>
          <div className="flex items-center gap-1 mt-1">
            <Tag color={record.examType === 1 ? 'blue' : 'green'}>
              {record.examType === 1 ? 'Mã thí sinh' : 'Tự do'}
            </Tag>
            {record.autoOpen && <Tag color="orange">Tự động mở</Tag>}
          </div>

          <div className="cursor-pointer mt-2 w-fit py-1 px-2 rounded-md bg-[#1890ff] hover:bg-opacity-20 bg-opacity-10 text-[#1890ff] flex items-center gap-2">
            <Tooltip title="Copy linh thi">
              <CopyOutlined /> Link thi
            </Tooltip>
          </div>
        </div>
      ),
    },
    {
      title: 'Lớp/Khối/Môn',
      key: 'classInfo',
      width: 180,
      render: (_, record: ExamSession) => (
        <div>
          <div className="text-sm font-medium">Lớp: {record.className}</div>
          <div className="text-sm text-gray-600">Khối: {record.grade}</div>
          <div className="text-sm text-gray-600">Môn: {record.subject}</div>
        </div>
      ),
    },
    {
      title: 'Thời gian',
      key: 'timeInfo',
      width: 200,
      render: (_, record: ExamSession) => (
        <div className="text-sm">
          <div>
            <strong>Mở ca:</strong>{' '}
            {dayjs(record.openTime).format('DD/MM HH:mm')}
          </div>
          <div>
            <strong>Đóng ca:</strong>{' '}
            {dayjs(record.closeTime).format('DD/MM HH:mm')}
          </div>
          <div>
            <strong>Hết hạn rút:</strong>{' '}
            {dayjs(record.withdrawDeadline).format('DD/MM HH:mm')}
          </div>
          <div>
            <strong>Thời lượng:</strong> {record.duration} phút
          </div>
        </div>
      ),
    },
    {
      title: 'Thí sinh',
      key: 'studentInfo',
      width: 120,
      align: 'center',
      render: (_, record: ExamSession) => (
        <div>
          <div className="text-lg font-bold text-blue-600">
            {record.submittedCount}/{record.studentCount}
          </div>
          <div className="text-xs text-gray-500">Đã nộp/Tổng số</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{
                width: `${record.studentCount > 0 ? (record.submittedCount / record.studentCount) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      render: (status: ExamSession['status']) => {
        const config = getStatusConfig(status);
        return (
          <Badge
            status={config.color as any}
            text={<span className="text-sm">{config.text}</span>}
          />
        );
      },
    },
    {
      title: 'Người tạo',
      key: 'creatorInfo',
      width: 150,
      render: (_, record: ExamSession) => (
        <div className="text-sm">
          <div className="font-medium">{record.createdBy}</div>
          <div className="text-gray-500">
            {dayjs(record.createdAt).format('DD/MM/YYYY HH:mm')}
          </div>
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 60,
      fixed: 'right',
      render: (_, record: ExamSession) => {
        const actionMenuItems: MenuProps['items'] = [
          {
            key: 'view',
            icon: <EyeOutlined />,
            label: 'Xem chi tiết',
          },
          {
            key: 'edit',
            icon: <EditOutlined />,
            label: 'Chỉnh sửa',
            disabled:
              record.status === 'ongoing' || record.status === 'completed',
          },
          {
            key: 'copy',
            icon: <CopyOutlined />,
            label: 'Sao chép',
          },
          { type: 'divider' },
          {
            key: 'start',
            icon: <PlayCircleOutlined />,
            label: 'Bắt đầu thi',
            disabled: record.status !== 'scheduled',
          },
          {
            key: 'stop',
            icon: <StopOutlined />,
            label: 'Kết thúc thi',
            disabled: record.status !== 'ongoing',
          },
          { type: 'divider' },
          {
            key: 'export',
            icon: <FileExcelOutlined />,
            label: 'Xuất kết quả',
            disabled: record.status !== 'completed',
          },
          {
            key: 'print',
            icon: <PrinterOutlined />,
            label: 'In danh sách',
          },
          { type: 'divider' },
          {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: 'Xóa',
            danger: true,
            disabled: record.status === 'ongoing',
          },
        ];

        return (
          <Dropdown
            menu={{
              items: actionMenuItems,
              onClick: ({ key }) => handleActionClick(key, record),
            }}
            trigger={['click']}
          >
            <Button type="primary" ghost icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  // Xử lý các hành động
  const handleActionClick = (key: string, record: ExamSession) => {
    switch (key) {
      case 'view':
        message.info(`Xem chi tiết ca thi: ${record.examName}`);
        break;
      case 'edit':
        message.info(`Chỉnh sửa ca thi: ${record.examName}`);
        break;
      case 'copy':
        message.info(`Sao chép ca thi: ${record.examName}`);
        break;
      case 'start':
        handleStartExam(record);
        break;
      case 'stop':
        handleStopExam(record);
        break;
      case 'export':
        message.info(`Xuất kết quả ca thi: ${record.examName}`);
        break;
      case 'print':
        message.info(`In danh sách ca thi: ${record.examName}`);
        break;
      case 'delete':
        handleDeleteExam(record);
        break;
    }
  };

  const handleStartExam = (record: ExamSession) => {
    Modal.confirm({
      title: 'Xác nhận bắt đầu ca thi',
      content: `Bạn có chắc chắn muốn bắt đầu ca thi "${record.examName}"?`,
      onOk: () => {
        setData(prev =>
          prev.map(item =>
            item.id === record.id
              ? { ...item, status: 'ongoing' as const }
              : item,
          ),
        );
        message.success('Đã bắt đầu ca thi thành công!');
      },
    });
  };

  const handleStopExam = (record: ExamSession) => {
    Modal.confirm({
      title: 'Xác nhận kết thúc ca thi',
      content: `Bạn có chắc chắn muốn kết thúc ca thi "${record.examName}"? Tất cả thí sinh chưa nộp bài sẽ tự động nộp bài.`,
      onOk: () => {
        setData(prev =>
          prev.map(item =>
            item.id === record.id
              ? {
                  ...item,
                  status: 'completed' as const,
                  submittedCount: item.studentCount,
                }
              : item,
          ),
        );
        message.success('Đã kết thúc ca thi thành công!');
      },
    });
  };

  const handleDeleteExam = (record: ExamSession) => {
    Modal.confirm({
      title: 'Xác nhận xóa ca thi',
      content: `Bạn có chắc chắn muốn xóa ca thi "${record.examName}"? Hành động này không thể hoàn tác.`,
      okType: 'danger',
      onOk: () => {
        setData(prev => prev.filter(item => item.id !== record.id));
        message.success('Đã xóa ca thi thành công!');
      },
    });
  };

  const filteredData = data.filter(item => {
    const matchSearch =
      !searchText ||
      item.examName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.packageName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.className.toLowerCase().includes(searchText.toLowerCase());

    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchGrade = gradeFilter === 'all' || item.grade === gradeFilter;
    const matchSubject =
      subjectFilter === 'all' || item.subject === subjectFilter;

    const matchDate =
      !dateRange ||
      (dayjs(item.openTime).isAfter(dateRange[0], 'day') &&
        dayjs(item.openTime).isBefore(dateRange[1], 'day'));

    return (
      matchSearch && matchStatus && matchGrade && matchSubject && matchDate
    );
  });

  // Cấu hình phân trang

  return (
    <>
      <div className="mb-6">
        {/* Bộ lọc */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Input
                placeholder="Tìm kiếm ca thi..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder="Trạng thái"
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: '100%' }}
              >
                <Option value="all">Tất cả trạng thái</Option>
                <Option value="draft">Nháp</Option>
                <Option value="scheduled">Đã lập lịch</Option>
                <Option value="ongoing">Đang diễn ra</Option>
                <Option value="completed">Hoàn thành</Option>
                <Option value="cancelled">Đã hủy</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder="Khối"
                value={gradeFilter}
                onChange={setGradeFilter}
                style={{ width: '100%' }}
              >
                <Option value="all">Tất cả khối</Option>
                <Option value="10">Khối 10</Option>
                <Option value="11">Khối 11</Option>
                <Option value="12">Khối 12</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                placeholder="Môn học"
                value={subjectFilter}
                onChange={setSubjectFilter}
                style={{ width: '100%' }}
              >
                <Option value="all">Tất cả môn</Option>
                <Option value="Toán học">Toán học</Option>
                <Option value="Vật lý">Vật lý</Option>
                <Option value="Hóa học">Hóa học</Option>
                <Option value="Sinh học">Sinh học</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <RangePicker
                placeholder={['Từ ngày', 'Đến ngày']}
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                value={dateRange}
              />
            </Col>
          </Row>
        </div>

        {/* Thống kê nhanh */}
        <Row gutter={16} className="mb-4">
          <Col span={6}>
            <Card size="small" className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {data.length}
              </div>
              <div className="text-gray-500">Tổng ca thi</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {data.filter(item => item.status === 'scheduled').length}
              </div>
              <div className="text-gray-500">Đã lập lịch</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {data.filter(item => item.status === 'ongoing').length}
              </div>
              <div className="text-gray-500">Đang diễn ra</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {data.filter(item => item.status === 'completed').length}
              </div>
              <div className="text-gray-500">Hoàn thành</div>
            </Card>
          </Col>
        </Row>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
        className="exam-session-table"
        pagination={{
          pageSize: pagination.limit,
          showSizeChanger: true,
          showTotal: total => `Tổng số ${total} tag`,
          total: 100,
        }}
        onChange={handleTableChange}
        locale={{
          emptyText: <Empty description="Không có dữ liệu" />,
        }}
        rowSelection={{
          selectedRowKeys: selectedRows.map(row => row.id),
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
    </>
  );
};

export default TableTest;
