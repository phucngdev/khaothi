import { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Select,
  Tag,
  Space,
  Statistic,
  Row,
  Col,
  DatePicker,
  Progress,
  Typography,
  Avatar,
  Badge,
  Breadcrumb,
} from 'antd';
import {
  FileTextOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  EyeOutlined,
  BookOutlined,
  BarChartOutlined,
  TeamOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  HomeOutlined,
  TrophyOutlined,
  SafetyCertificateOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('today');
  const [rankingPeriod, setRankingPeriod] = useState('week');
  const [customDateRange, setCustomDateRange] = useState(null);

  const timeOptions = [
    { value: 'today', label: 'Hôm nay' },
    { value: 'week', label: 'Tuần này' },
    { value: 'month', label: 'Tháng này' },
    { value: 'custom', label: 'Tùy chỉnh' },
  ];

  const rankingOptions = [
    { value: 'today', label: 'Hôm nay' },
    { value: 'week', label: 'Tuần này' },
    { value: 'month', label: 'Tháng này' },
    { value: 'quarter', label: 'Quý này' },
    { value: 'year', label: 'Năm này' },
  ];

  const rankingData = [
    {
      rank: 1,
      name: 'Nguyễn Văn A',
      department: 'Toán',
      score: 98,
      tests: 25,
      avatar: 'A',
    },
    {
      rank: 2,
      name: 'Trần Thị B',
      department: 'Văn',
      score: 95,
      tests: 22,
      avatar: 'B',
    },
    {
      rank: 3,
      name: 'Lê Văn C',
      department: 'Anh',
      score: 92,
      tests: 20,
      avatar: 'C',
    },
    {
      rank: 4,
      name: 'Phạm Thị D',
      department: 'Lý',
      score: 89,
      tests: 18,
      avatar: 'D',
    },
    {
      rank: 5,
      name: 'Hoàng Văn E',
      department: 'Hóa',
      score: 87,
      tests: 16,
      avatar: 'E',
    },
    {
      rank: 6,
      name: 'Phạm Thị D',
      department: 'Lý',
      score: 89,
      tests: 18,
      avatar: 'D',
    },
    {
      rank: 7,
      name: 'Hoàng Văn E',
      department: 'Hóa',
      score: 87,
      tests: 16,
      avatar: 'E',
    },
    {
      rank: 8,
      name: 'Phạm Thị D',
      department: 'Lý',
      score: 89,
      tests: 18,
      avatar: 'D',
    },
    {
      rank: 9,
      name: 'Hoàng Văn E',
      department: 'Hóa',
      score: 87,
      tests: 16,
      avatar: 'E',
    },
    {
      rank: 10,
      name: 'Phạm Thị D',
      department: 'Lý',
      score: 89,
      tests: 18,
      avatar: 'D',
    },
  ];

  const topThree = rankingData.slice(0, 3);
  const restOfRanking = rankingData.slice(3);

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return 160;
      case 2:
        return 120;
      case 3:
        return 100;
      default:
        return 80;
    }
  };

  const podiumOrder = [topThree[1], topThree[0], topThree[2]]; // 2nd, 1st, 3rd

  const rankingColumns = [
    {
      title: 'Hạng',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
      render: (rank: number) => (
        <Badge
          count={rank}
          style={{
            backgroundColor: '#1890ff',
            fontSize: '14px',
            minWidth: '24px',
            height: '24px',
            lineHeight: '24px',
          }}
        />
      ),
    },
    {
      title: 'Tên người tham gia',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: any) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
            {record.avatar}
          </Avatar>
          {name}
        </Space>
      ),
    },
    {
      title: 'Bộ môn',
      dataIndex: 'department',
      key: 'department',
      render: (department: string) => <Tag color="blue">{department}</Tag>,
    },
    {
      title: 'Điểm TB',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => (
        <Text strong style={{ color: '#1890ff' }}>
          {score}
        </Text>
      ),
    },
    {
      title: 'Số đề thi',
      dataIndex: 'tests',
      key: 'tests',
    },
  ];

  return (
    <Card>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Card
            style={{
              marginBottom: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <Space
              size="middle"
              style={{
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Space>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <HomeOutlined />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                </Breadcrumb>
              </Space>
              <Space>
                <Button
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate(-1)}
                >
                  Quay lại
                </Button>
                <Button
                  icon={<ArrowRightOutlined />}
                  style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                  }}
                  onClick={() => navigate(+1)}
                >
                  Chuyển tiếp
                </Button>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Card
            style={{
              textAlign: 'center',
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }}
          >
            <Title level={1} style={{ margin: 0, color: '#1890ff' }}>
              <BarChartOutlined /> Dashboard Quản lý khảo thí
            </Title>
            <Text type="secondary" style={{ fontSize: '16px' }}>
              Hệ thống quản lý khảo thí
            </Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24, marginTop: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số khung đề"
              value={25}
              prefix={<FileTextOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Câu hỏi đã duyệt"
              value={1245}
              prefix={<QuestionCircleOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Bài thi đã tạo"
              value={89}
              prefix={<BookOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Người dùng hoạt động"
              value={156}
              prefix={<TeamOutlined style={{ color: '#722ed1' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className="flex items-stretch">
        <Col span={12}>
          <Card
            title="Hoạt động gần đây"
            extra={<Link to="">Xem tất cả</Link>}
            style={{ marginBottom: 16 }}
          >
            <div style={{ height: 300 }}>
              <div style={{ marginBottom: 16 }}>
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  style={{ marginRight: 8 }}
                />
                <Text>Nguyễn Văn A đã tạo khung đề "Kiểm tra 15 phút"</Text>
                <Text type="secondary" style={{ float: 'right' }}>
                  2 giờ trước
                </Text>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  style={{ marginRight: 8 }}
                />
                <Text>Trần Thị B đã duyệt 5 câu hỏi mới</Text>
                <Text type="secondary" style={{ float: 'right' }}>
                  4 giờ trước
                </Text>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  style={{ marginRight: 8 }}
                />
                <Text>Lê Văn C đã tạo ma trận đề thi "Đề thi học kì 1"</Text>
                <Text type="secondary" style={{ float: 'right' }}>
                  1 ngày trước
                </Text>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  style={{ marginRight: 8 }}
                />
                <Text>Phạm Thị D đã xuất bản đề thi cuối kì</Text>
                <Text type="secondary" style={{ float: 'right' }}>
                  2 ngày trước
                </Text>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  style={{ marginRight: 8 }}
                />
                <Text>Hoàng Văn E đã cập nhật ngân hàng câu hỏi</Text>
                <Text type="secondary" style={{ float: 'right' }}>
                  3 ngày trước
                </Text>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Thống kê hệ thống"
            style={{ marginBottom: 16 }}
            extra={
              <Space>
                <Select
                  value={timeRange}
                  onChange={setTimeRange}
                  style={{ width: 120 }}
                  options={timeOptions}
                />
                {timeRange === 'custom' && (
                  <DatePicker.RangePicker
                    value={customDateRange}
                    // onChange={setCustomDateRange}
                    style={{ width: 240 }}
                  />
                )}
              </Space>
            }
          >
            <Row gutter={8}>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Đề thi hôm nay"
                    value={12}
                    prefix={<TrophyOutlined style={{ color: '#ff4d4f' }} />}
                    valueStyle={{ fontSize: '20px' }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Cái gì đó"
                    value="99.9%"
                    prefix={
                      <SafetyCertificateOutlined style={{ color: '#52c41a' }} />
                    }
                    valueStyle={{ fontSize: '20px' }}
                  />
                </Card>
              </Col>
            </Row>
            <div style={{ marginTop: 24 }}>
              <div style={{ marginBottom: 16 }}>
                <Text>Tỷ lệ hoàn thành đề thi</Text>
                <Progress percent={85} size="small" status="active" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <Text>Độ chính xác câu hỏi</Text>
                <Progress percent={92} size="small" strokeColor="#52c41a" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <Text>Hiệu suất hệ thống</Text>
                <Progress percent={78} size="small" strokeColor="#faad14" />
              </div>
              <div>
                <Text>Mức độ sử dụng</Text>
                <Progress percent={65} size="small" strokeColor="#722ed1" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card
            title={
              <Space>
                <TrophyOutlined style={{ color: '#52c41a' }} />
                <span>Bảng xếp hạng</span>
              </Space>
            }
            extra={
              <Space>
                <Select
                  value={rankingPeriod}
                  onChange={setRankingPeriod}
                  style={{ width: 120 }}
                  options={rankingOptions}
                />
                <Button type="primary" icon={<EyeOutlined />}>
                  Xem chi tiết
                </Button>
              </Space>
            }
          >
            <Card className="bg-white bg-opacity-40">
              <Title
                level={3}
                style={{
                  textAlign: 'center',
                  color: '#1890ff',
                  marginBottom: '32px',
                }}
              >
                <TrophyOutlined /> TOP 3 XUẤT SẮC NHẤT
              </Title>

              <Row gutter={16} align="bottom" justify="center">
                {podiumOrder.map((person, index) => {
                  if (!person) return null;
                  const actualRank = person.rank;
                  const podiumHeight = getPodiumHeight(actualRank);

                  return (
                    <Col
                      key={person.rank}
                      span={6}
                      style={{ textAlign: 'center' }}
                    >
                      <div style={{ marginBottom: '16px' }}>
                        <div
                          style={{
                            position: 'relative',
                            display: 'inline-block',
                            marginBottom: '16px',
                          }}
                        >
                          <Avatar
                            size={actualRank === 1 ? 80 : 64}
                            style={{
                              backgroundColor:
                                actualRank === 1
                                  ? '#52c41a'
                                  : actualRank === 2
                                    ? '#1890ff'
                                    : '#faae13',
                              fontSize: actualRank === 1 ? '32px' : '24px',
                              fontWeight: 'bold',
                              border: '4px solid white',
                              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                            }}
                          >
                            {person.avatar}
                          </Avatar>
                          {actualRank === 1 && (
                            <div className="absolute -top-2 -right-2 flex items-center justify-center text-3xl text-[#52c41a] font-bold rotate-[40deg]">
                              <CrownOutlined />
                            </div>
                          )}
                        </div>

                        <div style={{ color: '#000', marginBottom: '12px' }}>
                          <div
                            style={{
                              fontSize: actualRank === 1 ? '18px' : '16px',
                              fontWeight: 'bold',
                              marginBottom: '4px',
                            }}
                          >
                            {person.name}
                          </div>
                          <div
                            style={{
                              fontSize: actualRank === 1 ? '24px' : '20px',
                              fontWeight: 'bold',
                              marginTop: '8px',
                              color: actualRank === 1 ? '#52c41a' : '#000',
                            }}
                          >
                            {person.score} điểm
                          </div>
                          <div style={{ fontSize: '12px', opacity: 0.8 }}>
                            {person.tests} bài thi
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex items-center justify-center text-[48px] font-bold text-white relative rounded-t-lg shadow-[0_-4px_12px_rgba(0,0,0,0.2)] border-[2px] border-white/30"
                        style={{
                          height: `${podiumHeight}px`,
                          backgroundColor:
                            actualRank === 1
                              ? '#52c41a'
                              : actualRank === 2
                                ? '#1890ff'
                                : '#faae13',
                        }}
                      >
                        {actualRank}
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Card>

            {restOfRanking.length > 0 && (
              <Card style={{ marginTop: 24 }}>
                {/* <Title
                  level={4}
                  style={{ marginBottom: '16px', color: '#1890ff' }}
                >
                  <BarChartOutlined /> Bảng xếp hạng chi tiết
                </Title> */}
                <Table
                  columns={rankingColumns}
                  dataSource={restOfRanking}
                  pagination={false}
                  size="middle"
                  rowKey="rank"
                />
              </Card>
            )}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default Dashboard;
