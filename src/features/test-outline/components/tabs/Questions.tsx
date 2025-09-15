import { useState } from 'react';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Input,
  Row,
  Space,
  Typography,
  Collapse,
  Tag,
  Tooltip,
  Divider,
  Badge,
} from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '#/src/redux/store/store';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const Questions = () => {
  const { dataEdit } = useSelector((state: RootState) => state.test_outline);

  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState('');

  const handleAddQuestion = (matrixId: string, subMatrixId: string) => {
    setOpen('drawer');
  };

  const handleEditQuestion = (questionId: string) => {
    setOpen('drawer');
  };

  const handleDeleteQuestion = (questionId: string) => {};

  const getTotalQuestions = (subMatrix: any) => {
    return (
      (subMatrix.recognition?.count || 0) +
      (subMatrix.understanding?.count || 0) +
      (subMatrix.application?.count || 0)
    );
  };

  const getCognitiveLevelColor = (level: string) => {
    switch (level) {
      case 'recognition':
        return 'blue';
      case 'understanding':
        return 'orange';
      case 'application':
        return 'green';
      default:
        return 'default';
    }
  };

  const filteredMatrixs = dataEdit.matrixs.filter(
    (matrix: any) =>
      matrix.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matrix.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Card title="Ngân hàng câu hỏi" className="mt-4">
        {dataEdit.matrixs.map((matrix: any) => (
          <Card
            key={matrix.id}
            className="shadow-sm mb-4"
            title={
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Title level={4} className="mb-0">
                    {matrix.name}
                  </Title>
                  <Tag color={matrix.isDefault ? 'gold' : 'blue'}>
                    {matrix.code}
                  </Tag>
                  {matrix.isDefault && (
                    <Badge status="success" text="Mặc định" />
                  )}
                </div>
                <Text type="secondary">
                  {matrix.matrixs?.length || 0} Mạch/chủ đề
                </Text>
              </div>
            }
          >
            {matrix.matrixs && matrix.matrixs.length > 0 ? (
              <Row gutter={[16, 16]}>
                {matrix.matrixs.map((subMatrix: any) => (
                  <Col xs={24} sm={12} lg={8} xl={6} key={subMatrix.id}>
                    <Card
                      size="small"
                      className="h-full border border-gray-200 hover:shadow-md transition-shadow"
                      title={
                        <div className="flex items-center justify-between">
                          <Text strong className="text-sm">
                            {subMatrix.name}
                          </Text>
                          <Badge count={getTotalQuestions(subMatrix)} />
                        </div>
                      }
                      extra={
                        <Space>
                          <Tooltip title="Thêm câu hỏi">
                            <Button
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={() =>
                                handleAddQuestion(matrix.id, subMatrix.id)
                              }
                            />
                          </Tooltip>
                        </Space>
                      }
                    >
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Tag color={getCognitiveLevelColor('recognition')}>
                              Nhận biết
                            </Tag>
                            <Text className="text-xs">
                              {subMatrix.recognition?.count || 0} câu
                            </Text>
                          </div>

                          <div className="flex justify-between items-center">
                            <Tag
                              color={getCognitiveLevelColor('understanding')}
                            >
                              Thông hiểu
                            </Tag>
                            <Text className="text-xs">
                              {subMatrix.understanding?.count || 0} câu
                            </Text>
                          </div>

                          <div className="flex justify-between items-center">
                            <Tag color={getCognitiveLevelColor('application')}>
                              Vận dụng
                            </Tag>
                            <Text className="text-xs">
                              {subMatrix.application?.count || 0} câu
                            </Text>
                          </div>
                        </div>

                        <Divider className="my-2" />

                        {/* Actions */}
                        <div className="flex justify-between">
                          <Button
                            type="link"
                            size="small"
                            icon={<QuestionCircleOutlined />}
                            onClick={() => console.log('View questions')}
                          >
                            Xem câu hỏi
                          </Button>

                          <Space>
                            <Tooltip title="Sửa">
                              <Button
                                type="text"
                                size="small"
                                icon={<EditOutlined />}
                                onClick={() => handleEditQuestion(subMatrix.id)}
                              />
                            </Tooltip>
                            <Tooltip title="Xóa">
                              <Button
                                type="text"
                                size="small"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() =>
                                  handleDeleteQuestion(subMatrix.id)
                                }
                              />
                            </Tooltip>
                          </Space>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center py-8 flex flex-col items-center">
                <QuestionCircleOutlined className="text-4xl text-gray-400 mb-4" />
                <Text type="secondary">Chưa có mạch/chủ đề nào</Text>
                <br />
                <Button
                  type="dashed"
                  className="mt-2"
                  onClick={() => console.log('Add chapter')}
                >
                  Thêm mạch/chủ đề
                </Button>
              </div>
            )}
          </Card>
        ))}
      </Card>

      {dataEdit.matrixs.length === 0 && (
        <div className="text-center py-12">
          <QuestionCircleOutlined className="text-6xl text-gray-400 mb-4" />
          <Title level={4} type="secondary">
            Không tìm thấy ma trận nào
          </Title>
          <Text type="secondary">Thử thay đổi từ khóa tìm kiếm của bạn</Text>
        </div>
      )}
    </>
  );
};

export default Questions;
