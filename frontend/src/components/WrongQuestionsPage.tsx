import { useEffect, useState } from 'react';
import { Card, List, Tag, Button, Space, Typography, Empty, message, Popconfirm } from 'antd';
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { wrongQuestionsApi } from '../services/api';

const { Title, Text, Paragraph } = Typography;

interface WrongQuestionItem {
  id: number;
  question_id: number;
  content: string;
  answer: string;
  difficulty: string;
  thinking_type: string;
  explanation: string;
  error_type?: string;
  error_count: number;
  last_error_at: string;
  mastered: boolean;
}

const WrongQuestionsPage = () => {
  const [wrongQuestions, setWrongQuestions] = useState<WrongQuestionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWrongQuestions();
  }, []);

  const loadWrongQuestions = async () => {
    try {
      setLoading(true);
      const { data } = await wrongQuestionsApi.getAll();
      setWrongQuestions(data);
    } catch (error) {
      console.error('加载错题本失败', error);
      message.error('加载失败');
    } finally {
      setLoading(false);
    }
  };

  const markAsMastered = async (id: number) => {
    try {
      await wrongQuestionsApi.markAsMastered(id);
      message.success('已标记为掌握');
      loadWrongQuestions();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const deleteWrongQuestion = async (id: number) => {
    try {
      await wrongQuestionsApi.delete(id);
      message.success('已删除');
      loadWrongQuestions();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'green';
      case 'intermediate': return 'orange';
      case 'advanced': return 'red';
      default: return 'blue';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '初级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return difficulty;
    }
  };

  if (wrongQuestions.length === 0 && !loading) {
    return (
      <div>
        <Title level={2}>📕 错题本</Title>
        <Empty
          description="太棒了！目前没有错题"
          style={{ marginTop: 100 }}
        />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>📕 错题本</Title>
        <Text type="secondary">
          共 {wrongQuestions.length} 道错题，需要重点复习
        </Text>
      </div>

      <List
        loading={loading}
        grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
        dataSource={wrongQuestions}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={
                <Space>
                  <Tag color={getDifficultyColor(item.difficulty)}>
                    {getDifficultyText(item.difficulty)}
                  </Tag>
                  <Tag color="blue">{item.thinking_type}</Tag>
                  <Tag color="red">错误 {item.error_count} 次</Tag>
                </Space>
              }
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => markAsMastered(item.id)}
                  >
                    已掌握
                  </Button>
                  <Popconfirm
                    title="确定要删除这道错题吗？"
                    onConfirm={() => deleteWrongQuestion(item.id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button danger icon={<DeleteOutlined />}>
                      删除
                    </Button>
                  </Popconfirm>
                </Space>
              }
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text strong>题目：</Text>
                  <Paragraph style={{ fontSize: 16, marginTop: 8 }}>
                    {item.content}
                  </Paragraph>
                </div>

                <div>
                  <Text strong>答案：</Text>
                  <Text style={{ fontSize: 16, marginLeft: 8, color: '#52c41a' }}>
                    {item.answer}
                  </Text>
                </div>

                {item.explanation && (
                  <div>
                    <Text strong>解析：</Text>
                    <Paragraph style={{ marginTop: 8, background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
                      {item.explanation}
                    </Paragraph>
                  </div>
                )}

                {item.error_type && (
                  <div>
                    <Text type="secondary">
                      错误类型：{item.error_type}
                    </Text>
                  </div>
                )}

                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    最后错误时间：{new Date(item.last_error_at).toLocaleString('zh-CN')}
                  </Text>
                </div>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default WrongQuestionsPage;
