import { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Spin, Empty } from 'antd';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { dashboardApi, DashboardStats } from '../services/api';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, progressRes] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getProgress(),
      ]);

      setStats(statsRes.data);
      setProgress(progressRes.data);
    } catch (error) {
      console.error('加载Dashboard数据失败', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!stats || !progress || progress.total_sessions === 0) {
    return (
      <Empty
        description="还没有练习记录，去开始练习吧！"
        style={{ marginTop: 100 }}
      />
    );
  }

  // 准备雷达图数据
  const radarData = stats.thinkingRadar.map(item => ({
    type: item.type,
    score: item.score,
    fullMark: Math.max(...stats.thinkingRadar.map(i => i.score)) + 5,
  }));

  // 准备错题原因柱状图数据
  const errorReasonsData = stats.errorReasons;

  // 准备难度统计数据
  const difficultyData = stats.difficultyStats.map(item => ({
    difficulty: item.difficulty === 'beginner' ? '初级' :
                item.difficulty === 'intermediate' ? '中级' : '高级',
    正确: item.correct,
    错误: item.total - item.correct,
    正确率: item.total > 0 ? ((item.correct / item.total) * 100).toFixed(1) + '%' : '0%',
  }));

  return (
    <div>
      <Title level={2}>📊 学习看板</Title>

      {/* 学习进度概览 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <div>
              <Text type="secondary">练习次数</Text>
            </div>
            <div style={{ fontSize: 30, fontWeight: 'bold', color: '#1890ff' }}>
              {progress.total_sessions}
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div>
              <Text type="secondary">累计答题</Text>
            </div>
            <div style={{ fontSize: 30, fontWeight: 'bold', color: '#1890ff' }}>
              {progress.total_questions_answered}
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div>
              <Text type="secondary">平均正确率</Text>
            </div>
            <div style={{ fontSize: 30, fontWeight: 'bold', color: '#52c41a' }}>
              {progress.avg_accuracy ? progress.avg_accuracy.toFixed(1) : 0}%
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div>
              <Text type="secondary">待复习错题</Text>
            </div>
            <div style={{ fontSize: 30, fontWeight: 'bold', color: '#ff4d4f' }}>
              {progress.active_wrong_questions}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 思维雷达图 */}
      <Card title="🎯 思维能力雷达图" style={{ marginBottom: 24 }}>
        {radarData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="type" />
              <PolarRadiusAxis />
              <Radar
                name="得分"
                dataKey="score"
                stroke="#1890ff"
                fill="#1890ff"
                fillOpacity={0.6}
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <Empty description="暂无数据" />
        )}
      </Card>

      <Row gutter={16}>
        {/* 错题原因热点 */}
        <Col span={12}>
          <Card title="🔥 错题原因分析">
            {errorReasonsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={errorReasonsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="reason" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#ff4d4f" name="错误次数" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Empty description="太棒了，还没有错题！" />
            )}
          </Card>
        </Col>

        {/* 难度统计 */}
        <Col span={12}>
          <Card title="📈 按难度统计">
            {difficultyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={difficultyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="difficulty" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="正确" fill="#52c41a" stackId="a" />
                  <Bar dataKey="错误" fill="#ff4d4f" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Empty description="暂无数据" />
            )}

            <div style={{ marginTop: 16 }}>
              {difficultyData.map(item => (
                <div key={item.difficulty} style={{ marginBottom: 8 }}>
                  <Text strong>{item.difficulty}：</Text>
                  <Text style={{ marginLeft: 8 }}>
                    {item.正确}/{item.正确 + item.错误} ({item.正确率})
                  </Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
