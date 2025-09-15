import React, { useEffect, useRef, useState } from 'react';
import {
  Drawer,
  Button,
  Space,
  Tabs,
  Form,
  Upload,
  Col,
  Row,
  UploadFile,
  message,
  Select,
  Input,
  Popconfirm,
  Checkbox,
  Spin,
} from 'antd';
import {
  DeleteOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LoadingOutlined,
  PlusOutlined,
  SaveOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import BaseCKEditor from '#/shared/components/ckeditor/BaseCKEditor';
import { QuestionEntity } from '#/api/requests';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import {
  beforeUploadImage,
  beforeUploadPdf,
} from '#/shared/props/beforeUpload';
import { uploadFileToS3 } from '#/api/services/uploadS3';
import { Editor } from '@monaco-editor/react';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;
const { Option } = Select;

interface DrawerCreateUpdateQuestionProps {
  open: boolean;
  onClose: () => void;
  itemUpdate?: QuestionEntity | null;
}

const DrawerCreateUpdateQuestion = ({
  open,
  onClose,
  itemUpdate,
}: DrawerCreateUpdateQuestionProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const onReadyRef = useRef<any>(null);
  const { dataEdit } = useSelector((state: RootState) => state.test_outline);
  console.log('🚀 ~ DrawerCreateUpdateQuestion ~ dataEdit:', dataEdit);

  const [loading, setLoading] = useState<'image' | 'audio' | ''>('');
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [saveLocation, setSaveLocation] = useState<
    'test-outline' | 'question-bank'
  >('test-outline');
  const [fullScreen, setFullScreen] = useState(false);
  const [selectedType, setSelectedType] = useState<QuestionEntity.type>(
    QuestionEntity.type.MULTIPLE_CHOICE_SINGLE,
  );
  const [blankCount, setBlankCount] = useState(0); // insert blank (chỗ trống)

  useEffect(() => {
    if (selectedType === QuestionEntity.type.DRAGANĐROP) {
      const current = form.getFieldValue('draganđropAnswers') || [];
      const newAnswers = Array.from({ length: blankCount }).map((_, i) => {
        const exist = current.find((a: any) => a.index === i);
        return exist || { index: i, content: '' };
      });
      form.setFieldsValue({ draganđropAnswers: newAnswers });
    } else if (selectedType === QuestionEntity.type.FILL_IN_BLANK) {
      const current = form.getFieldValue('fillInBlank') || [];
      const newAnswers = Array.from({ length: blankCount }).map((_, i) => {
        const exist = current.find((a: any) => a.index === i);
        return exist || { index: i, correctAnswer: '' };
      });
      form.setFieldsValue({ fillInBlank: newAnswers });
    }
  }, [blankCount]);

  useEffect(() => {
    if (itemUpdate) {
      setSelectedType(itemUpdate.type);
      form.setFieldsValue({
        content: itemUpdate.content,
        tag: itemUpdate.tag,
        imageUrl: itemUpdate.imageUrl,
        cognitiveLevel: itemUpdate.cognitiveLevel,
      });
      if (itemUpdate.type === QuestionEntity.type.MULTIPLE_CHOICE_SINGLE) {
        form.setFieldValue(
          'multipleChoiceSingerAnswers',
          itemUpdate.multipleChoiceSingerAnswers,
        );
      } else if (
        itemUpdate.type === QuestionEntity.type.MULTIPLE_CHOICE_MULTIPLE
      ) {
        form.setFieldValue(
          'multipleChoiceMultipleAnswers',
          itemUpdate.multipleChoiceMultipleAnswers,
        );
      } else if (itemUpdate.type === QuestionEntity.type.SORTING_WORD) {
        form.setFieldValue('sortingWordAnswers', itemUpdate.sortingWordAnswers);
      } else if (itemUpdate.type === QuestionEntity.type.SORTING_SENTENCE) {
        form.setFieldValue(
          'sortingSentenceAnswers',
          itemUpdate.sortingSentenceAnswers,
        );
      } else if (itemUpdate.type === QuestionEntity.type.MATCHING) {
        form.setFieldValue('matchingAnswers', itemUpdate.matchingAnswers);
      } else if (itemUpdate.type === QuestionEntity.type.CODING) {
        form.setFieldsValue({
          language: itemUpdate.language,
          testCases: itemUpdate.testCases,
          sampleCode: itemUpdate.sampleCode,
          testCode: itemUpdate.testCode,
        });
      }
      setImageFileList([
        {
          uid: '-1',
          name: itemUpdate.imageUrl,
          status: 'done',
          url: itemUpdate.imageUrl,
        },
      ]);
    }
  }, [open, itemUpdate]);

  const handleToggleScreen = () => {
    setFullScreen(prev => !prev);
  };

  return (
    <>
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span className="text-xl">
              {itemUpdate ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi'}
            </span>
            <Space>
              <Button
                type="primary"
                ghost
                icon={
                  fullScreen ? (
                    <FullscreenExitOutlined />
                  ) : (
                    <FullscreenOutlined />
                  )
                }
                onClick={handleToggleScreen}
              />
              <Button type="primary" icon={<SaveOutlined />}>
                Lưu
              </Button>
            </Space>
          </div>
        }
        placement="right"
        className="drawer-question-resource"
        width={fullScreen ? '100%' : 1000}
        onClose={onClose}
        open={open}
      >
        <Form
          form={form}
          layout="vertical"
          validateTrigger={['onBlur', 'onSubmit']}
        >
          <Row gutter={16}>
            <Col span={3}>
              <Form.Item
                name="imageUrl"
                label="Ảnh câu hỏi:"
                style={{ width: '100%' }}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={beforeUploadImage}
                  fileList={imageFileList}
                  customRequest={async ({ file }) => {
                    if (!file) return;
                    setLoading('image');
                    try {
                      const { publicUrl } = await uploadFileToS3(file as File);
                      setImageFileList([
                        {
                          uid: Date.now().toString(),
                          name: (file as File).name,
                          status: 'done',
                          url: publicUrl,
                        },
                      ]);
                      form.setFieldValue('imageUrl', publicUrl);
                    } catch (error) {
                      message.error('Tải ảnh lên thất bại');
                    } finally {
                      setLoading('');
                    }
                  }}
                  onRemove={() => {
                    setImageFileList([]);
                  }}
                >
                  {imageFileList.length < 1 && (
                    <button
                      style={{ border: 0, background: 'none' }}
                      type="button"
                    >
                      {loading === 'image' ? (
                        <LoadingOutlined />
                      ) : (
                        <PlusOutlined />
                      )}
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="location" label="Lưu tại">
                <Select
                  style={{ width: '100%' }}
                  placeholder="Nơi lưu câu hỏi"
                  defaultValue="test-outline"
                  disabled
                >
                  <Option value="test-outline">Khung đề</Option>
                  <Option value="question-bank">Ngân hàng câu hỏi</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="test-outline-active" label="Chọn khung đề">
                <Select
                  disabled
                  style={{ width: '100%' }}
                  placeholder="Chọn khung đề"
                  defaultValue={dataEdit?.id}
                >
                  <Option value={dataEdit.id}>{dataEdit.name}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mạch/Chủ đề">
                <Select
                  disabled={itemUpdate ? true : false}
                  style={{ width: '100%' }}
                  placeholder="Mạch/chủ đề"
                >
                  {dataEdit?.matrixs?.map((m: any) => (
                    <Option key={m.id} value={m.id}>
                      {m.name}
                    </Option>
                  ))}{' '}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="cognitiveLevel"
                label="Mức độ câu hỏi:"
                style={{ width: '100%' }}
                rules={[
                  { required: true, message: 'Vui lòng chọn mức độ câu hỏi' },
                ]}
              >
                <Select
                  // onChange={value => {
                  //   form.setFieldValue('cognitiveLevel', value);
                  // }}
                  className="custom-select"
                  placeholder="Mức độ"
                  options={[
                    {
                      value: QuestionEntity.CognitiveLevel.APPLICATION,
                      label: 'Khó',
                    },
                    {
                      value: QuestionEntity.CognitiveLevel.COMPREHENSION,
                      label: 'Trung bình',
                    },
                    {
                      value: QuestionEntity.CognitiveLevel.RECOGNITION,
                      label: 'Dễ',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tag"
                label="Tag:"
                style={{ width: '100%' }}
                // rules={[{ required: true, message: 'Không được để trống' }]}
              >
                <Input placeholder="Nhập tag" />
              </Form.Item>
            </Col>
          </Row>

          <Tabs
            activeKey={selectedType}
            onChange={key => {
              if (itemUpdate) {
                message.warning('Khổng thể chỉnh sửa loại câu hỏi');
                return;
              }
              setSelectedType(key as QuestionEntity.type);
            }}
          >
            <TabPane
              tab="Trắc nghiệm 1 đáp án"
              key={QuestionEntity.type.MULTIPLE_CHOICE_SINGLE}
            >
              <Form.Item label="Câu hỏi">
                <BaseCKEditor
                  changeData={(value: string) => {
                    form.setFieldsValue({ content: value });
                  }}
                  value={form.getFieldValue('content')}
                />
              </Form.Item>
              <Form.Item label="Đáp án:">
                <Form.List
                  name="multipleChoiceSingerAnswers"
                  rules={[
                    {
                      validator: async (_, answers) => {
                        if (!answers || answers.length === 0) {
                          return Promise.reject(
                            new Error('Phải có ít nhất một đáp án.'),
                          );
                        }
                        for (const answer of answers) {
                          if (!answer?.content) {
                            return Promise.reject(
                              new Error('Tất cả các đáp án phải có nội dung.'),
                            );
                          }
                        }
                        const correctCount = answers.filter(
                          (a: any) => a.isCorrect,
                        ).length;
                        if (correctCount !== 1) {
                          return Promise.reject(
                            new Error('Phải có đúng một đáp án đúng.'),
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => {
                    const answers =
                      form.getFieldValue('multipleChoiceSingerAnswers') || [];
                    return (
                      <>
                        <Row gutter={[16, 16]}>
                          {fields.map(({ key, name, ...restField }) => {
                            const isCorrect = answers[name]?.isCorrect;

                            return (
                              <Col span={12} key={`${key}-${name}`}>
                                <div
                                  className={`p-2 rounded-md border ${
                                    isCorrect
                                      ? 'bg-green-50 border-green-400'
                                      : 'bg-red-50 border-red-300'
                                  }`}
                                >
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'isCorrect']}
                                    valuePropName="checked"
                                  >
                                    <Checkbox
                                      onChange={() => {
                                        const allAnswers =
                                          form.getFieldValue(
                                            'multipleChoiceSingerAnswers',
                                          ) || [];
                                        const newAnswers = allAnswers.map(
                                          (a: any, idx: number) => ({
                                            ...a,
                                            isCorrect: idx === name,
                                          }),
                                        );
                                        form.setFieldsValue({
                                          multipleChoiceSingerAnswers:
                                            newAnswers,
                                        });
                                      }}
                                    >
                                      Đáp án đúng
                                    </Checkbox>
                                  </Form.Item>

                                  <Form.Item
                                    {...restField}
                                    name={[name, 'content']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Nhập đáp án',
                                      },
                                    ]}
                                    style={{ marginBottom: 8 }}
                                  >
                                    <BaseCKEditor
                                      changeData={(value: string) => {
                                        const newAnswers = [...answers];
                                        newAnswers[name] = {
                                          ...newAnswers[name],
                                          content: value,
                                        };
                                        form.setFieldsValue({
                                          answers: newAnswers,
                                        });
                                      }}
                                      value={answers[name]?.content || ''}
                                    />
                                  </Form.Item>

                                  <div className="text-right mt-2">
                                    <Popconfirm
                                      title="Xoá câu trả lời này?"
                                      onConfirm={() => remove(name)}
                                    >
                                      <Button danger size="small">
                                        Xoá đáp án
                                      </Button>
                                    </Popconfirm>
                                  </div>

                                  <Form.Item name={[name, 'isCorrect']} hidden>
                                    <Input />
                                  </Form.Item>
                                </div>
                              </Col>
                            );
                          })}
                        </Row>

                        <div className="mt-3">
                          <Button
                            type="dashed"
                            onClick={() =>
                              add({ isCorrect: false, content: '' })
                            }
                            block
                          >
                            + Thêm đáp án
                          </Button>
                        </div>

                        {errors.length > 0 && fields.length === 0 && (
                          <div className="ant-form-item-explain-error">
                            {errors.join(', ')}
                          </div>
                        )}
                      </>
                    );
                  }}
                </Form.List>
              </Form.Item>
            </TabPane>

            <TabPane
              tab="Trắc nghiệm nhiều đáp án"
              key={QuestionEntity.type.MULTIPLE_CHOICE_MULTIPLE}
            >
              <Form.Item label="Câu hỏi">
                <BaseCKEditor
                  changeData={(value: string) => {
                    form.setFieldsValue({ content: value });
                  }}
                  value={form.getFieldValue('content')}
                />
              </Form.Item>
              <Form.Item label="Đáp án:">
                <Form.List
                  name="multipleChoiceMultipleAnswers"
                  rules={[
                    {
                      validator: async (_, answers) => {
                        if (!answers || answers.length === 0) {
                          return Promise.reject(
                            new Error('Phải có ít nhất một đáp án.'),
                          );
                        }
                        for (const answer of answers) {
                          if (!answer?.content) {
                            return Promise.reject(
                              new Error('Tất cả các đáp án phải có nội dung.'),
                            );
                          }
                        }
                        const correctCount = answers.filter(
                          (a: any) => a.isCorrect,
                        ).length;
                        if (correctCount < 1) {
                          return Promise.reject(
                            new Error('Phải có ít nhất một đáp án đúng.'),
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => {
                    const answers =
                      form.getFieldValue('multipleChoiceMultipleAnswers') || [];
                    return (
                      <>
                        <Row gutter={[16, 16]}>
                          {fields.map(({ key, name, ...restField }) => {
                            const isCorrect = answers[name]?.isCorrect;

                            return (
                              <Col span={12} key={`${key}-${name}`}>
                                <div
                                  className={`p-2 rounded-md border ${
                                    isCorrect
                                      ? 'bg-green-50 border-green-400'
                                      : 'bg-red-50 border-red-300'
                                  }`}
                                >
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'isCorrect']}
                                    valuePropName="checked"
                                  >
                                    <Checkbox
                                      onChange={() => {
                                        const allAnswers =
                                          form.getFieldValue(
                                            'multipleChoiceMultipleAnswers',
                                          ) || [];
                                        const newAnswers = allAnswers.map(
                                          (a: any, idx: number) => ({
                                            ...a,
                                            isCorrect: idx === name,
                                          }),
                                        );
                                        form.setFieldsValue({
                                          multipleChoiceMultipleAnswers:
                                            newAnswers,
                                        });
                                      }}
                                    >
                                      Đáp án đúng
                                    </Checkbox>
                                  </Form.Item>

                                  <Form.Item
                                    {...restField}
                                    name={[name, 'content']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Nhập đáp án',
                                      },
                                    ]}
                                    style={{ marginBottom: 8 }}
                                  >
                                    <BaseCKEditor
                                      changeData={(value: string) => {
                                        const newAnswers = [...answers];
                                        newAnswers[name] = {
                                          ...newAnswers[name],
                                          content: value,
                                        };
                                        form.setFieldsValue({
                                          answers: newAnswers,
                                        });
                                      }}
                                      value={answers[name]?.content || ''}
                                    />
                                  </Form.Item>

                                  <div className="text-right mt-2">
                                    <Popconfirm
                                      title="Xoá câu trả lời này?"
                                      onConfirm={() => remove(name)}
                                    >
                                      <Button danger size="small">
                                        Xoá đáp án
                                      </Button>
                                    </Popconfirm>
                                  </div>

                                  <Form.Item name={[name, 'isCorrect']} hidden>
                                    <Input />
                                  </Form.Item>
                                </div>
                              </Col>
                            );
                          })}
                        </Row>

                        <div className="mt-3">
                          <Button
                            type="dashed"
                            onClick={() =>
                              add({ isCorrect: false, content: '' })
                            }
                            block
                          >
                            + Thêm đáp án
                          </Button>
                        </div>

                        {errors.length > 0 && fields.length === 0 && (
                          <div className="ant-form-item-explain-error">
                            {errors.join(', ')}
                          </div>
                        )}
                      </>
                    );
                  }}
                </Form.List>
              </Form.Item>
            </TabPane>

            <TabPane tab="Sắp xếp từ" key={QuestionEntity.type.SORTING_WORD}>
              <Form.List
                name="sortingWordAnswers"
                rules={[
                  {
                    validator: async (_, items) => {
                      if (!items || items.length < 2) {
                        return Promise.reject(
                          new Error('Phải có ít nhất 2 mục để sắp xếp.'),
                        );
                      }
                      for (const item of items) {
                        if (!item?.content) {
                          return Promise.reject(
                            new Error('Tất cả các mục phải có nội dung.'),
                          );
                        }
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    <Row gutter={[8, 8]}>
                      {fields.map((field, index) => (
                        <Col span={24} key={field.key}>
                          <div className="flex items-center gap-2 border rounded p-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">
                              {index + 1}
                            </div>

                            <Form.Item
                              {...field}
                              name={[field.name, 'content']}
                              rules={[
                                { required: true, message: 'Nhập nội dung' },
                              ]}
                              style={{ flex: 1, marginBottom: 0 }}
                            >
                              <Input placeholder="Nhập nội dung cần sắp xếp" />
                            </Form.Item>

                            <Popconfirm
                              title="Xoá mục này?"
                              onConfirm={() => remove(field.name)}
                            >
                              <Button danger icon={<DeleteOutlined />} />
                            </Popconfirm>
                          </div>
                        </Col>
                      ))}
                    </Row>

                    <Button
                      type="dashed"
                      onClick={() => add({ content: '' })}
                      block
                      className="mt-5"
                      icon={<PlusOutlined />}
                    >
                      Thêm mục
                    </Button>
                  </>
                )}
              </Form.List>
            </TabPane>
            <TabPane
              tab="Sắp xếp câu/ đoạn văn"
              key={QuestionEntity.type.SORTING_SENTENCE}
            >
              <Form.List
                name="sortingSentenceAnswers"
                rules={[
                  {
                    validator: async (_, items) => {
                      if (!items || items.length < 2) {
                        return Promise.reject(
                          new Error('Phải có ít nhất 2 mục để sắp xếp.'),
                        );
                      }
                      for (const item of items) {
                        if (!item?.content) {
                          return Promise.reject(
                            new Error('Tất cả các mục phải có nội dung.'),
                          );
                        }
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    <Row gutter={[8, 8]}>
                      {fields.map((field, index) => (
                        <Col span={24} key={field.key}>
                          <div className="flex items-start gap-2 border rounded p-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">
                              {index + 1}
                            </div>

                            <Form.Item
                              {...field}
                              name={[field.name, 'content']}
                              rules={[
                                { required: true, message: 'Nhập nội dung' },
                              ]}
                              style={{ flex: 1, marginBottom: 0 }}
                            >
                              <Input.TextArea
                                autoSize={{ minRows: 3, maxRows: 10 }}
                                placeholder="Nhập nội dung cần sắp xếp"
                              />
                            </Form.Item>

                            <Popconfirm
                              title="Xoá mục này?"
                              onConfirm={() => remove(field.name)}
                            >
                              <Button danger icon={<DeleteOutlined />} />
                            </Popconfirm>
                          </div>
                        </Col>
                      ))}
                    </Row>

                    <Button
                      type="dashed"
                      onClick={() => add({ content: '' })}
                      block
                      className="mt-5"
                      icon={<PlusOutlined />}
                    >
                      Thêm mục
                    </Button>
                  </>
                )}
              </Form.List>
            </TabPane>
            <TabPane tab="Kéo thả" key={QuestionEntity.type.DRAGANĐROP}>
              <Form.Item
                name="content"
                label={
                  <>
                    <Space>
                      <span>Nội dung</span>
                    </Space>
                  </>
                }
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập nội dung',
                  },
                ]}
              >
                <BaseCKEditor
                  changeData={(value: string) => {
                    form.setFieldsValue({ content: value });
                  }}
                  value={form.getFieldValue('content')}
                  onReadyRef={onReadyRef}
                  onBlankChange={count => setBlankCount(count)}
                />
              </Form.Item>
              <Form.List name="draganđropAnswers">
                {fields => (
                  <>
                    {fields.map((field, idx) => (
                      <Form.Item
                        {...field}
                        key={field.key}
                        label={`Đáp án cho chỗ trống ${idx + 1}`}
                        name={[field.name, 'content']}
                        rules={[{ required: true, message: 'Nhập đáp án' }]}
                      >
                        <Input placeholder={`Đáp án #${idx + 1}`} />
                      </Form.Item>
                    ))}
                  </>
                )}
              </Form.List>
            </TabPane>

            <TabPane tab="Ghép đôi" key={QuestionEntity.type.MATCHING}>
              <Form.List
                name="matchingAnswers"
                rules={[
                  {
                    validator: async (_, items) => {
                      if (!items || items.length < 2) {
                        return Promise.reject(
                          new Error('Phải có ít nhất 2 cặp ghép đôi.'),
                        );
                      }
                      for (const item of items) {
                        if (!item?.left || !item?.right) {
                          return Promise.reject(
                            new Error('Mỗi cặp phải có đầy đủ nội dung.'),
                          );
                        }
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(field => (
                      <Row
                        key={field.key}
                        gutter={12}
                        align="top"
                        style={{
                          marginBottom: 8,
                          padding: 8,
                          border: '1px solid #d9d9d9',
                          borderRadius: 4,
                          background: '#fafafa',
                        }}
                      >
                        <Col span={10}>
                          <Form.Item
                            {...field}
                            name={[field.name, 'left']}
                            rules={[
                              {
                                required: true,
                                message: 'Nhập nội dung bên trái',
                              },
                            ]}
                            style={{ marginBottom: 0 }}
                          >
                            <Input.TextArea
                              autoSize={{ minRows: 3, maxRows: 10 }}
                              placeholder="Nội dung bên trái"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={2} style={{ textAlign: 'center' }}>
                          ⇔
                        </Col>
                        <Col span={10}>
                          <Form.Item
                            {...field}
                            name={[field.name, 'right']}
                            rules={[
                              {
                                required: true,
                                message: 'Nhập nội dung bên phải',
                              },
                            ]}
                            style={{ marginBottom: 0 }}
                          >
                            <Input.TextArea
                              autoSize={{ minRows: 3, maxRows: 10 }}
                              placeholder="Nội dung bên phải"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={2} style={{ textAlign: 'center' }}>
                          <Popconfirm
                            title="Xoá cặp này?"
                            onConfirm={() => remove(field.name)}
                          >
                            <Button danger icon={<DeleteOutlined />} />
                          </Popconfirm>
                        </Col>
                      </Row>
                    ))}

                    <Button
                      type="dashed"
                      onClick={() => add({ left: '', right: '' })}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm cặp
                    </Button>
                  </>
                )}
              </Form.List>
            </TabPane>
            <TabPane
              tab="Lựa chọn dạng bảng"
              key={QuestionEntity.type.TABLE_CHOICE}
            >
              {/* Component cho Matching */}
            </TabPane>

            <TabPane tab="Điền từ" key={QuestionEntity.type.FILL_IN_BLANK}>
              <Form.Item
                name="content"
                label={
                  <>
                    <Space>
                      <span>Nội dung</span>
                    </Space>
                  </>
                }
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập nội dung',
                  },
                ]}
              >
                <BaseCKEditor
                  changeData={(value: string) => {
                    form.setFieldsValue({ content: value });
                  }}
                  value={form.getFieldValue('content')}
                  onReadyRef={onReadyRef}
                  onBlankChange={count => setBlankCount(count)}
                />
              </Form.Item>
              <Form.List name="fillInBlank">
                {fields => (
                  <>
                    {fields.map((field, idx) => (
                      <Form.Item
                        {...field}
                        key={field.key}
                        label={`Đáp án cho chỗ trống ${idx + 1}`}
                        name={[field.name, 'correctAnswer']}
                        rules={[{ required: true, message: 'Nhập đáp án' }]}
                      >
                        <Input placeholder={`Đáp án #${idx + 1}`} />
                      </Form.Item>
                    ))}
                  </>
                )}
              </Form.List>
            </TabPane>

            <TabPane tab="Coding" key={QuestionEntity.type.CODING}>
              <Form.Item style={{ width: '100%' }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="language"
                      label="Ngôn ngữ hệ thống"
                      rules={[
                        { required: true, message: 'Vui lòng chọn ngôn ngữ' },
                      ]}
                    >
                      <Select placeholder="Chọn ngôn ngữ">
                        <Select.Option value="javascript">
                          JavaScript
                        </Select.Option>
                        <Select.Option value="python">Python</Select.Option>
                        <Select.Option value="java">Java</Select.Option>
                        <Select.Option value="csharp">C#</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="content"
                  label="Yêu cầu chi tiết"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập yêu cầu chi tiết',
                    },
                  ]}
                >
                  <BaseCKEditor
                    changeData={(value: string) => {
                      form.setFieldsValue({ content: value });
                    }}
                    value={form.getFieldValue('content')}
                  />
                </Form.Item>

                <Form.Item
                  name="sampleCode"
                  label="Code mẫu"
                  rules={[
                    { required: true, message: 'Vui lòng nhập code mẫu' },
                  ]}
                >
                  <Editor
                    theme="vs-light"
                    language="javascript"
                    onMount={editor => {
                      const updateHeight = () => {
                        const contentHeight = editor.getContentHeight();
                        const layoutInfo = editor.getLayoutInfo();
                        editor.layout({
                          width: layoutInfo.width,
                          height: contentHeight,
                        });
                        const domNode = editor.getDomNode();
                        if (domNode) {
                          domNode.style.height = `${contentHeight}px`;
                        }
                      };
                      updateHeight();
                      editor.onDidContentSizeChange(updateHeight);
                    }}
                    defaultLanguage="javascript"
                    loading={<Spin size="default" />}
                    options={{
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 14,
                      lineNumbers: 'on',
                      automaticLayout: true,
                      tabSize: 2,
                      wordWrap: 'on',
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="testCode"
                  label="Code kiểm thử"
                  rules={[
                    { required: true, message: 'Vui lòng nhập code kiểm thử' },
                  ]}
                >
                  <Editor
                    theme="vs-light"
                    language="javascript"
                    onMount={editor => {
                      const updateHeight = () => {
                        const contentHeight = editor.getContentHeight();
                        const layoutInfo = editor.getLayoutInfo();
                        editor.layout({
                          width: layoutInfo.width,
                          height: contentHeight,
                        });
                        const domNode = editor.getDomNode();
                        if (domNode) {
                          domNode.style.height = `${contentHeight}px`;
                        }
                      };
                      updateHeight();
                      editor.onDidContentSizeChange(updateHeight);
                    }}
                    defaultLanguage="javascript"
                    loading={<Spin size="default" />}
                    options={{
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 14,
                      lineNumbers: 'on',
                      automaticLayout: true,
                      tabSize: 2,
                      wordWrap: 'on',
                    }}
                  />
                </Form.Item>

                <span>Danh sách test case</span>
                <Form.List
                  name="testCases"
                  rules={[
                    {
                      validator: async (_, testCases) => {
                        if (!testCases || testCases.length < 1) {
                          return Promise.reject(
                            new Error('Vui lòng thêm ít nhất một test case'),
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => {
                    return (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <div
                            key={key}
                            style={{
                              marginBottom: '16px',
                              border: '1px solid #f0f0f0',
                              borderRadius: '8px',
                              padding: '16px',
                              background: '#fafafa',
                            }}
                          >
                            <div style={{ display: 'flex', gap: '16px' }}>
                              <Form.Item
                                {...restField}
                                name={[name, 'input']}
                                label="Dữ liệu đầu vào"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Nhập dữ liệu đầu vào',
                                  },
                                ]}
                                style={{ flex: 1 }}
                              >
                                <Input.TextArea rows={2} />
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, 'output']}
                                label="Dữ liệu đầu ra"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Nhập dữ liệu đầu ra',
                                  },
                                ]}
                                style={{ flex: 1 }}
                              >
                                <Input.TextArea rows={2} />
                              </Form.Item>
                            </div>

                            <div className="text-right mt-2">
                              <Popconfirm
                                title="Xoá test case này?"
                                onConfirm={() => remove(name)}
                              >
                                <Button danger icon={<DeleteOutlined />}>
                                  Xoá test case
                                </Button>
                              </Popconfirm>
                            </div>
                          </div>
                        ))}

                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Thêm test case
                          </Button>
                        </Form.Item>

                        {errors.length > 0 && fields.length === 0 && (
                          <div className="ant-form-item-explain-error">
                            {errors.join(', ')}
                          </div>
                        )}
                      </>
                    );
                  }}
                </Form.List>
              </Form.Item>
            </TabPane>

            <TabPane tab="Tự luận" key={QuestionEntity.type.ESSAY}>
              <Form.Item
                name="content"
                label="Nội dung"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập nội dung',
                  },
                ]}
              >
                <BaseCKEditor
                  changeData={(value: string) => {
                    form.setFieldsValue({ content: value });
                  }}
                  value={form.getFieldValue('content')}
                  onReadyRef={onReadyRef}
                />
              </Form.Item>
              <Form.Item
                label="Hướng dẫn giải"
                name={['essayAnswers', 0, 'description']}
                rules={[
                  { required: true, message: 'Vui lòng nhập hướng dẫn giải' },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Nhập hướng dẫn giải..." />
              </Form.Item>

              <Form.Item label="Exam URL">
                <Row gutter={8} align="middle">
                  <Col span={18}>
                    <Form.Item name={['essayAnswers', 0, 'examUrl']} noStyle>
                      <Input placeholder="https://..." />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item
                      name={['essayAnswers', 0, 'examFile']}
                      valuePropName="fileList"
                      getValueFromEvent={e =>
                        Array.isArray(e) ? e : e?.fileList
                      }
                      noStyle
                    >
                      <Upload beforeUpload={beforeUploadPdf} maxCount={1}>
                        <Button icon={<UploadOutlined />} block>
                          Tải file
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item
                label="Tài liệu tham khảo"
                name={['essayAnswers', 0, 'documents']}
                valuePropName="fileList"
                getValueFromEvent={e => (Array.isArray(e) ? e : e?.fileList)}
              >
                <Upload multiple beforeUpload={() => false}>
                  <Button>Upload</Button>
                </Upload>
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Drawer>
    </>
  );
};

export default DrawerCreateUpdateQuestion;
