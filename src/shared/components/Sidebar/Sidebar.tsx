import {
  AppstoreOutlined,
  AuditOutlined,
  BarChartOutlined,
  BlockOutlined,
  BookOutlined,
  CarryOutOutlined,
  ClockCircleOutlined,
  CrownOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FormOutlined,
  FundProjectionScreenOutlined,
  GlobalOutlined,
  GroupOutlined,
  HomeOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  PlusOutlined,
  ProfileOutlined,
  ProjectOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
  ReconciliationOutlined,
  RobotOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { SignOut } from '@phosphor-icons/react';
import { Button, Layout, Menu, MenuProps, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.scss';
import logo from '/src/assets/images/RE_logo.png';
import Cookies from 'js-cookie';

const { Sider } = Layout;

const menuItems: MenuProps['items'] = [
  {
    icon: <HomeOutlined />,
    key: '',
    label: 'Trang chủ',
  },
  {
    icon: <AppstoreOutlined />,
    key: 'test-outline',
    label: 'Quản lý khung đề thi',
  },
  {
    icon: <QuestionCircleOutlined />,
    key: 'questions',
    label: 'Ngân hàng câu hỏi',
  },
  {
    icon: <QuestionCircleOutlined />,
    key: 'questions',
    label: 'Quản lý bộ môn',
  },
  {
    icon: <QuestionCircleOutlined />,
    key: 'class-manager',
    label: 'Quản lý lớp',
  },
  {
    icon: <ClockCircleOutlined />,
    key: 'test-manage',
    label: 'Quản lý thi',
    children: [
      {
        key: 'test-list',
        label: 'Danh sách ca thi',
        icon: <OrderedListOutlined />,
      },
      {
        key: 'create-test',
        label: 'Tạo ca thi',
        icon: <PlusOutlined />,
      },
    ],
  },
];

export function Sidebar() {
  const navigate = useNavigate();

  const handleMenuClick = ({ keyPath }: { keyPath: string[] }) => {
    const path = keyPath.reverse().join('/');
    navigate(`/${path}`);
  };

  const handleLogout = () => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có muốn đăng xuất?`,
      okText: 'Đăng xuất',
      okType: 'danger',
      onOk: async () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        navigate('/auth/login');
      },
      title: 'Xác nhận đăng xuất',
    });
  };

  return (
    <Sider className="sidebar h-[100vh]" width={250}>
      <div className="logo-container h-24 flex items-center justify-center">
        <img alt="Logo" style={{ width: '164px', height: '60px' }} src={logo} />
      </div>
      <div className="menu-container">
        <Menu
          defaultOpenKeys={['content']}
          defaultSelectedKeys={['courses']}
          items={menuItems}
          mode="inline"
          onClick={handleMenuClick}
        />
      </div>
      <div className="border gap-4 items-center p-4 rounded-lg shadow-md">
        <Button
          block
          type="primary"
          danger
          ghost
          onClick={handleLogout}
          icon={<LogoutOutlined />}
        >
          Đăng xuất
        </Button>
      </div>
    </Sider>
  );
}
