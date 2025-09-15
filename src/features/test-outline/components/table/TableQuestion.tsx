import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import {
  ArrowRightOutlined,
  EyeOutlined,
  DeleteOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  CheckCircleOutlined,
  OrderedListOutlined,
  LinkOutlined,
  EditOutlined,
  FontSizeOutlined,
  FileOutlined,
  ArrowDownOutlined,
  PlusOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Space,
  Typography,
  List,
  Tag,
  Tooltip,
  Modal,
  message,
  Divider,
  Avatar,
  TablePaginationConfig,
  Form,
  Collapse,
} from 'antd';
import {
  InBlankAnswerDto,
  MatchingAnswerDto,
  QuestionEntity,
} from '#/api/requests';
import TextArea from 'antd/es/input/TextArea';
import DrawerCreateUpdateQuestion from '../drawer/DrawerCreateUpdateQuestion';
import {
  cognitiveLevelColorMap,
  cognitiveLevelLabelMap,
  questionTypeLabelMap,
} from '#/api/requests/label/QuestionLabel';
import { useSelector } from 'react-redux';
import { RootState } from '#/src/redux/store/store';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const difficulties = ['Dễ', 'Trung bình', 'Khó'];
const statuses = [
  { value: 'active', label: 'Đang hoạt động', color: 'success' },
  { value: 'draft', label: 'Bản nháp', color: 'warning' },
  { value: 'inactive', label: 'Không hoạt động', color: 'default' },
];

const renderAnswerInput = (
  type: QuestionEntity.type,
  question: QuestionEntity,
) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  switch (type) {
    case QuestionEntity.type.MULTIPLE_CHOICE_SINGLE:
      return (
        <Space size={16} wrap>
          {question.multipleChoiceSingerAnswers.map((ans, idx) => (
            <Tag
              key={idx}
              color={ans.isCorrect ? 'green' : 'red'}
              style={{ fontSize: 14, padding: '4px 12px' }}
            >
              {letters[idx]}. {ans.content}
            </Tag>
          ))}
        </Space>
      );
    case QuestionEntity.type.MULTIPLE_CHOICE_MULTIPLE:
      return (
        <Space size={16} wrap>
          {question.multipleChoiceMultipleAnswers.map((ans, idx) => (
            <Tag
              key={idx}
              color={ans.isCorrect ? 'green' : 'red'}
              style={{ fontSize: 14, padding: '4px 12px' }}
            >
              {letters[idx]}. {ans.content}
            </Tag>
          ))}
        </Space>
      );

    case QuestionEntity.type.SORTING_WORD:
      return (
        <Space size={16} wrap>
          {question.sortingWordAnswers.map((ans, idx) => (
            <React.Fragment key={idx}>
              <Tag style={{ fontSize: 14, padding: '4px 12px' }}>
                {ans.content}
              </Tag>
              {idx < question.sortingWordAnswers.length - 1 && (
                <ArrowRightOutlined />
              )}
            </React.Fragment>
          ))}
        </Space>
      );

    case QuestionEntity.type.SORTING_SENTENCE:
      return (
        <Space size={16} direction="vertical">
          {question.sortingSentenceAnswers.map((ans, idx) => (
            <React.Fragment key={idx}>
              <Text style={{ fontSize: 14 }}>
                <strong style={{ color: '#1890ff' }}>{idx + 1}.</strong>{' '}
                {ans.content}
              </Text>
              {idx < question.sortingSentenceAnswers.length - 1 && (
                <ArrowDownOutlined />
              )}
            </React.Fragment>
          ))}
        </Space>
      );

    case QuestionEntity.type.MATCHING:
      return (
        <List
          bordered
          dataSource={question.matchingAnswers}
          renderItem={(item: MatchingAnswerDto, idx) => (
            <List.Item key={idx}>
              <span style={{ marginRight: 16 }}>{item.left}</span> ➝{' '}
              <span style={{ marginLeft: 16 }}>{item.right}</span>
            </List.Item>
          )}
        />
      );

    case QuestionEntity.type.CODING:
      return (
        <Card style={{ width: '100%', borderRadius: 12 }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={5}>Yêu cầu chi tiết</Title>
              <Paragraph>{question.content}</Paragraph>
            </div>
            <div>
              <Title level={5}>Ngôn ngữ lập trình</Title>
              <Text strong>{question.language}</Text>
            </div>

            <Collapse
              bordered={false}
              style={{ background: 'transparent' }}
              items={[
                {
                  key: 'sampleCode',
                  label: (
                    <span>
                      <CodeOutlined /> Code mẫu
                    </span>
                  ),
                  children: (
                    <Editor
                      height="300px"
                      defaultLanguage={question.language || 'javascript'}
                      value={question.sampleCode || '// Không có sample code'}
                      options={{ readOnly: true, minimap: { enabled: false } }}
                      theme="vs-dark"
                    />
                  ),
                },
                {
                  key: 'testCode',
                  label: (
                    <span>
                      <FileTextOutlined /> Code kiểm thử
                    </span>
                  ),
                  children: (
                    <Editor
                      height="300px"
                      defaultLanguage={question.language || 'javascript'}
                      value={question.testCode || '// Không có test code'}
                      options={{ readOnly: true, minimap: { enabled: false } }}
                      theme="vs-dark"
                    />
                  ),
                },
                {
                  key: 'testCases',
                  label: (
                    <span>
                      <DatabaseOutlined /> Test Cases
                    </span>
                  ),
                  children: (
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: '100%' }}
                    >
                      {(question.testCases || []).map((tc, idx) => (
                        <Card
                          key={idx}
                          size="small"
                          title={`Test case ${idx + 1}`}
                          style={{
                            borderRadius: 8,
                            background: '#fafafa',
                            border: '1px solid #f0f0f0',
                          }}
                        >
                          <Row gutter={16}>
                            <Col span={12}>
                              <Text code>Input:</Text>
                              <div
                                style={{
                                  background: '#f5f5f5',
                                  padding: '6px 10px',
                                  borderRadius: 6,
                                  marginTop: 4,
                                  fontFamily: 'monospace',
                                }}
                              >
                                {tc.input}
                              </div>
                            </Col>
                            <Col span={12}>
                              <Text code>Output:</Text>
                              <div
                                style={{
                                  background: '#f5f5f5',
                                  padding: '6px 10px',
                                  borderRadius: 6,
                                  marginTop: 4,
                                  fontFamily: 'monospace',
                                }}
                              >
                                {tc.output}
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      ))}
                      {(question.testCases || []).length === 0 && (
                        <Text type="secondary">Không có test case nào</Text>
                      )}
                    </Space>
                  ),
                },
              ]}
            />
          </Space>
        </Card>
      );

    case QuestionEntity.type.FILL_IN_BLANK:
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {question.fillInBlank.map((ans: InBlankAnswerDto, idx: number) => (
            <Input
              key={idx}
              value={ans.correctAnswer}
              readOnly
              placeholder={`Blank #${ans.index + 1}`}
              className="w-1/2"
            />
          ))}
        </div>
      );

    case QuestionEntity.type.ESSAY:
      return (
        <Card
          title={
            <>
              <Space>
                <FileOutlined /> File đề bài:
                <Text style={{ color: '#000' }}>
                  {question.essayAnswers[0].examUrl}
                </Text>
              </Space>
            </>
          }
        >
          <TextArea
            rows={5}
            value={question.content}
            readOnly
            placeholder="Enter your essay answer..."
          />
          <List
            header={<b>Tài liệu đính kèm</b>}
            dataSource={question.essayAnswers[0].documents}
            renderItem={(doc: any) => (
              <List.Item key={doc.id}>
                <Space>
                  <FileOutlined className="text-[#1677ff]" />
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    {doc.name}
                  </a>
                </Space>
              </List.Item>
            )}
          />
        </Card>
      );

    default:
      return null;
  }
};

const TableQuestion = () => {
  const { dataEdit } = useSelector((state: RootState) => state.test_outline);

  const [itemUpdate, setItemUpdate] = useState<QuestionEntity | null>(null);
  const [open, setOpen] = useState<'drawer' | ''>('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    current: 1,
  });

  const handleEdit = (questionId: string) => {
    message.info(`Chỉnh sửa câu hỏi ${questionId}`);
  };

  const handleDelete = (questionId: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa câu hỏi này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okType: 'danger',
      onOk: () => {},
    });
  };

  return (
    <>
      <DrawerCreateUpdateQuestion
        open={open === 'drawer'}
        onClose={() => {
          setOpen('');
          setItemUpdate(null);
        }}
        itemUpdate={itemUpdate}
      />
      <Row gutter={[16, 16]} align="middle">
        <Col flex="auto">
          <Space wrap>
            <Select
              placeholder="Mạch chủ đề"
              style={{ minWidth: 200 }}
              allowClear
            >
              {['Mạch 1', 'Mạch 2'].map(diff => (
                <Option key={diff} value={diff}>
                  {diff}
                </Option>
              ))}
            </Select>

            <Select
              value={selectedType}
              onChange={setSelectedType}
              placeholder="Loại câu hỏi"
              style={{ minWidth: 200 }}
              allowClear
            >
              <Option value="all">Tất cả loại</Option>
              {Object.entries(questionTypeLabelMap).map(([key, type]) => (
                <Option key={key} value={key}>
                  <Space>{type.name}</Space>
                </Option>
              ))}
            </Select>

            <Select
              value={selectedDifficulty}
              onChange={setSelectedDifficulty}
              placeholder="Độ khó"
              style={{ minWidth: 120 }}
              allowClear
            >
              <Option value="all">Tất cả độ khó</Option>
              {difficulties.map(diff => (
                <Option key={diff} value={diff}>
                  {diff}
                </Option>
              ))}
            </Select>

            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder="Trạng thái"
              style={{ minWidth: 150 }}
              allowClear
            >
              <Option value="all">Tất cả trạng thái</Option>
              {statuses.map(status => (
                <Option key={status.value} value={status.value}>
                  {status.label}
                </Option>
              ))}
            </Select>
          </Space>
        </Col>
        <Col>
          <Space>
            <Button icon={<FilterOutlined />}>Lọc nâng cao</Button>
            <Button icon={<SortAscendingOutlined />}>Sắp xếp</Button>
          </Space>
        </Col>
      </Row>

      <Divider style={{ margin: '16px 0' }} />

      <Row justify="space-between" align="middle">
        <Col>
          <Space>
            <Text type="secondary">
              Hiển thị <strong>{dataEdit.matrixs.length}</strong> /{' '}
              {/* <strong>{questions.length}</strong> câu hỏi */}
            </Text>
            -<Tag color="blue">Dễ: 8</Tag>
            <Tag color="orange">Trung bình: 8</Tag>
            <Tag color="green">Khó: 8</Tag>
          </Space>
        </Col>
        <Col>
          <Space>
            <Text type="secondary">Hiển thị:</Text>
            <Select
              value={pagination.limit}
              size="small"
              style={{ width: 80 }}
              onChange={(value: number) => {
                setPagination(prev => ({
                  ...prev,
                  limit: value,
                }));
              }}
            >
              <Option value="10">10</Option>
              <Option value="20">20</Option>
              <Option value="50">50</Option>
            </Select>
            <Text type="secondary">câu hỏi/trang</Text>
          </Space>
        </Col>
      </Row>

      {/* <List
        style={{ marginTop: 16 }}
        dataSource={[]}
        pagination={{
          pageSize: pagination.limit,
          showSizeChanger: false,
          showQuickJumper: true,
          onChange: (page, pageSize) => {
            setPagination({
              current: page,
              limit: pageSize,
              offset: (page - 1) * pageSize,
            });
          },
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} câu hỏi`,
          style: { textAlign: 'center', marginTop: '24px' },
        }}
        renderItem={(question: QuestionEntity, index: number) => {
          const questionType =
            questionTypeLabelMap[question.type as QuestionEntity['type']];
          return (
            <Card
              style={{
                marginBottom: 16,
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid #f0f0f0',
              }}
              hoverable
            >
              <Row
                justify="space-between"
                align="middle"
                style={{ marginBottom: 12 }}
              >
                <Col>
                  <Space className="items-start">
                    <Avatar
                      style={{
                        backgroundColor: '#fff',
                        border: '1px solid #1890ff',
                        fontWeight: 'bold',
                      }}
                    >
                      <Text strong style={{ color: '#1890ff' }}>
                        {(pagination.current - 1) * pagination.limit +
                          index +
                          1}
                      </Text>
                    </Avatar>
                    <div>
                      <Title level={5} style={{ margin: 0 }}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: question.content,
                          }}
                        ></div>
                      </Title>
                      <div style={{ marginBottom: 12 }}>
                        <Space wrap size={[0, 4]}>
                          <Tag color={questionType.color}>
                            <Space size={4}>
                              {questionType.name}
                            </Space>
                          </Tag>
                          <Tag style={{ fontSize: 11 }}>#{question.tag}</Tag>
                          <Tag
                            style={{ fontSize: 11 }}
                            color={
                              cognitiveLevelColorMap[question.cognitiveLevel]
                            }
                          >
                            Lv:{' '}
                            {cognitiveLevelLabelMap[question.cognitiveLevel]}
                          </Tag>
                        </Space>
                      </div>
                    </div>
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <Tooltip title="Chỉnh sửa">
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => {
                          setItemUpdate(question);
                          setOpen('drawer');
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Xoá">
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(question.id)}
                      />
                    </Tooltip>
                  </Space>
                </Col>
              </Row>

              <Card
                size="small"
                style={{ background: '#fafafa', marginBottom: 10 }}
              >
                <Collapse
                  bordered={false}
                  style={{ background: 'transparent' }}
                  items={[
                    {
                      key: 'Preview',
                      label: 'Preview đáp án',
                      children: (
                        <>
                          <div style={{ marginTop: 8 }}>
                            {renderAnswerInput(
                              question.type as QuestionEntity.type,
                              question as QuestionEntity,
                            )}
                          </div>
                        </>
                      ),
                    },
                  ]}
                />
              </Card>

              <Row justify="space-between" align="middle">
                <Col>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Tác giả: <strong>question.author</strong>
                  </Text>
                </Col>
                <Col>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Tạo: {} • Cập nhật: {}
                  </Text>
                </Col>
              </Row>
            </Card>
          );
        }}
      /> */}
    </>
  );
};

export default TableQuestion;
