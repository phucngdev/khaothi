import React, { useEffect, useState } from 'react';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  TableOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  List,
  message,
  Modal,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import ModalCreateUpdateMatrix from '../modal/ModalCreateUpdateMatrix';
import ModalCreateUpdateSubject from '../modal/ModalCreateUpdateSubject';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '#/src/redux/store/store';
import { deleteMatrixSub, setDefault } from '#/src/redux/slice/matrix.slice';

const { Text } = Typography;

interface Matrix {
  id: string;
  name: string;
  code: string;
  isDefault?: boolean;
  matrixs: [];
}

const TestMatrix = () => {
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.matrixs);
  const [itemUpdate, setItemUpdate] = useState<Matrix | null>(null);
  const [open, setOpen] = useState<'modal-matrix' | 'modal-subject' | ''>('');
  const [selectedMatrix, setSelectedMatrix] = useState<Matrix | null>(data[0]);

  useEffect(() => {
    if (selectedMatrix) {
      const find = data.items.find(
        (item: any) => item.id === selectedMatrix.id,
      );
      find && setSelectedMatrix(find);
    }
  }, [data]);

  const matrixColumns = [
    {
      title: 'Mạch/Chủ đề',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Dễ',
      key: 'recognition',
      render: (_: any, record: any) => {
        const { count, score } = record.recognition;
        return (
          <>
            <div>Số câu: {count}</div>
            <div>Điểm/câu: {score}</div>
            <div>
              <b>Tổng: {count * score}</b>
            </div>
          </>
        );
      },
    },
    {
      title: 'Trung bình',
      key: 'understanding',
      render: (_: any, record: any) => {
        const { count, score } = record.understanding;
        return (
          <>
            <div>Số câu: {count}</div>
            <div>Điểm/câu: {score}</div>
            <div>
              <b>Tổng: {count * score}</b>
            </div>
          </>
        );
      },
    },
    {
      title: 'Khó',
      key: 'application',
      render: (_: any, record: any) => {
        const { count, score } = record.application;
        return (
          <>
            <div>Số câu: {count}</div>
            <div>Điểm/câu: {score}</div>
            <div>
              <b>Tổng: {count * score}</b>
            </div>
          </>
        );
      },
    },

    {
      title: 'Tổng cộng',
      key: 'total',
      render: (_: any, record: any) => {
        const totalCount =
          record.recognition.count +
          record.understanding.count +
          record.application.count;
        const totalScore =
          record.recognition.count * record.recognition.score +
          record.understanding.count * record.understanding.score +
          record.application.count * record.application.score;
        return (
          <>
            <div>
              <b>Số câu: {totalCount}</b>
            </div>
            <div>
              <b>Điểm: {totalScore}</b>
            </div>
          </>
        );
      },
    },
    {
      title: 'Tỉ lệ',
      key: 'application',
      render: (_: any, record: any) => {
        return (
          <>
            <div>30%</div>
          </>
        );
      },
    },
    {
      title: 'Tỉ trọng điểm',
      key: 'application',
      render: (_: any, record: any) => {
        return (
          <>
            <div>30%</div>
          </>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => {
        return (
          <>
            <Space>
              <Tooltip title="Thêm ma trận con">
                <Button icon={<PlusOutlined />}></Button>
              </Tooltip>
              <Tooltip title="Chỉnh sửa">
                <Button
                  icon={<EditOutlined />}
                  type="primary"
                  ghost
                  onClick={() => {
                    setOpen('modal-subject');
                    setItemUpdate(record);
                  }}
                ></Button>
              </Tooltip>
              <Tooltip title="Xoá">
                <Button
                  onClick={() => handleDeleteMatrixSub(record)}
                  icon={<DeleteOutlined />}
                  danger
                ></Button>
              </Tooltip>
            </Space>
          </>
        );
      },
    },
  ];

  const handleDelete = (record: any) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn có chắc chắn muốn xóa "${record.name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      onOk: async () => {},
      title: 'Xác nhận xóa',
    });
  };

  const handleSetupDefault = (record: any) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn muốn đặt "${record.name}" làm mặc định?`,
      okText: 'Xác nhận',
      onOk: async () => {
        await dispatch(setDefault(record));
      },
      title: 'Xác nhận',
    });
  };

  const handleDeleteMatrixSub = (record: any) => {
    Modal.confirm({
      cancelText: 'Hủy',
      content: `Bạn muốn xoá "${record.name}"?`,
      okText: 'Xác nhận',
      onOk: async () => {
        if (!selectedMatrix) return;
        await dispatch(
          deleteMatrixSub({
            matrixId: record.id,
            id: selectedMatrix.id,
          }),
        );
        message.success('Xoá thành công');
      },
      title: 'Xác nhận',
    });
  };

  return (
    <>
      <ModalCreateUpdateMatrix
        open={open === 'modal-matrix'}
        onClose={() => {
          setOpen('');
          setItemUpdate(null);
        }}
        itemUpdate={itemUpdate}
      />
      <ModalCreateUpdateSubject
        open={open === 'modal-subject'}
        onClose={() => {
          setOpen('');
          setItemUpdate(null);
        }}
        itemUpdate={itemUpdate}
        matrixId={selectedMatrix?.id}
      />
      <Card
        title="Ma trận đề thi"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen('modal-matrix')}
          >
            Thêm ma trận
          </Button>
        }
        style={{ marginTop: 16 }}
      >
        <div className="flex items-start gap-6">
          <div className="w-[30%]">
            <List
              dataSource={data.items}
              renderItem={(matrix: any) => {
                const isSelected = selectedMatrix?.id === matrix.id;
                return (
                  <Card
                    size="small"
                    hoverable
                    onClick={() => setSelectedMatrix(matrix)}
                    style={{
                      marginBottom: 12,
                      border: isSelected
                        ? '2px solid #1890ff'
                        : matrix.isDefault
                          ? '1px solid #1890ff'
                          : '1px solid #f0f0f0',
                      borderRadius: 10,
                      background: isSelected
                        ? '#e6f7ff'
                        : matrix.isDefault
                          ? '#f0f9ff'
                          : '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <Space align="start">
                        <div>
                          <Text strong>{matrix.name}</Text>
                          <br />
                          <Text type="secondary">{matrix.code}</Text>
                          {matrix.isDefault && (
                            <Tag color="blue" style={{ marginTop: 4 }}>
                              Mặc định
                            </Tag>
                          )}
                        </div>
                      </Space>
                      <Space>
                        {!matrix.isDefault && (
                          <Tooltip title="Đặt làm mặc định">
                            <Button
                              type="text"
                              onClick={() => handleSetupDefault(matrix)}
                              icon={<CheckCircleOutlined />}
                            />
                          </Tooltip>
                        )}
                        <Tooltip title="Chỉnh sửa">
                          <Button
                            onClick={() => {
                              setOpen('modal-matrix');
                              setItemUpdate(matrix);
                            }}
                            type="text"
                            icon={<EditOutlined />}
                          />
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <Button
                            type="text"
                            onClick={() => handleDelete(matrix)}
                            danger
                            icon={<DeleteOutlined />}
                          />
                        </Tooltip>
                      </Space>
                    </div>
                  </Card>
                );
              }}
            />
          </div>

          <div className="flex-1">
            {selectedMatrix ? (
              <>
                <Table
                  columns={matrixColumns}
                  dataSource={selectedMatrix.matrixs}
                  pagination={false}
                  summary={pageData => {
                    let totalCount = 0;
                    let totalScore = 0;

                    pageData.forEach(row => {
                      totalCount +=
                        row.recognition.count +
                        row.understanding.count +
                        row.application.count;
                      totalScore +=
                        row.recognition.count * row.recognition.score +
                        row.understanding.count * row.understanding.score +
                        row.application.count * row.application.score;
                    });

                    return (
                      <Table.Summary.Row style={{ background: '#fafafa' }}>
                        <Table.Summary.Cell index={0} colSpan={7}>
                          <b>Tổng cộng toàn bảng</b>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={5}>
                          <div>
                            <b>Số câu: {totalCount}</b>
                          </div>
                          <div>
                            <b>Điểm: {totalScore}</b>
                          </div>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    );
                  }}
                />
                <Button
                  icon={<PlusOutlined />}
                  className="mt-5"
                  type="primary"
                  ghost
                  onClick={() => setOpen('modal-subject')}
                >
                  Thêm mạch/Chủ đề
                </Button>
              </>
            ) : (
              <Card style={{ textAlign: 'center', padding: 40 }}>
                <Text type="secondary">Chọn một ma trận để xem chi tiết</Text>
              </Card>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default TestMatrix;
