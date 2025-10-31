import { Modal, Typography, Space, Tag, List, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Question, Answer, answersApi } from '../services/api';
import { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;

interface ReflectionModalProps {
  visible: boolean;
  question: Question;
  answers: any[];
  onComplete: () => void;
}

const ReflectionModal = ({ visible, question, answers, onComplete }: ReflectionModalProps) => {
  const [analysis, setAnalysis] = useState<string>('');

  useEffect(() => {
    if (visible && answers.length > 0) {
      performReflection();
    }
  }, [visible, answers]);

  const performReflection = async () => {
    const correctAnswers = answers.filter(a => a.is_correct);
    const wrongAnswers = answers.filter(a => !a.is_correct);

    // 简化的反思分析
    let analysisText = '';

    if (correctAnswers.length === answers.length) {
      analysisText = `太棒了！你完全掌握了这道题目。\n\n`;
      analysisText += `【关联知识点】\n`;
      analysisText += `• ${question.thinking_type}\n`;
      analysisText += `• ${question.explanation}\n\n`;
      analysisText += `【学习建议】\n`;
      analysisText += `继续保持，可以尝试更高难度的题目。`;

      // 保存反思到数据库
      try {
        await answersApi.createReflection(answers[0].id, {
          knowledge_points: [question.thinking_type],
          analysis: analysisText,
        });
      } catch (error) {
        console.error('保存反思失败', error);
      }
    } else {
      // 分析错误类型
      const errorTypes = analyzeErrors(wrongAnswers, question);

      analysisText = `本题有 ${wrongAnswers.length} 道答错了，让我们分析一下：\n\n`;
      analysisText += `【错误类型】\n`;
      errorTypes.forEach(type => {
        analysisText += `• ${type}\n`;
      });
      analysisText += `\n【关联知识点】\n`;
      analysisText += `• ${question.thinking_type}\n`;
      analysisText += `• ${question.explanation}\n\n`;
      analysisText += `【改进建议】\n`;
      analysisText += getSuggestions(errorTypes);

      // 保存反思到数据库
      try {
        for (const answer of wrongAnswers) {
          await answersApi.createReflection(answer.id, {
            knowledge_points: [question.thinking_type],
            error_type: errorTypes[0] || '解题错误',
            analysis: analysisText,
          });
        }
      } catch (error) {
        console.error('保存反思失败', error);
      }
    }

    setAnalysis(analysisText);
  };

  const analyzeErrors = (wrongAnswers: any[], question: Question): string[] => {
    const types: string[] = [];

    // 简化的错误类型判断
    if (question.thinking_type.includes('运算')) {
      types.push('计算错误');
    } else if (question.thinking_type.includes('方程')) {
      types.push('解方程步骤错误');
    } else if (question.thinking_type.includes('应用题')) {
      types.push('建模错误或审题不清');
    } else {
      types.push('概念理解错误');
    }

    return types;
  };

  const getSuggestions = (errorTypes: string[]): string => {
    const suggestions: string[] = [];

    errorTypes.forEach(type => {
      if (type.includes('计算')) {
        suggestions.push('• 注意计算步骤，避免粗心大意');
        suggestions.push('• 可以多练习基础运算');
      } else if (type.includes('方程')) {
        suggestions.push('• 熟练掌握移项、合并同类项的步骤');
        suggestions.push('• 注意符号变化');
      } else if (type.includes('应用题') || type.includes('审题')) {
        suggestions.push('• 仔细读题，提取关键信息');
        suggestions.push('• 画图或列表帮助理解题意');
      } else {
        suggestions.push('• 复习相关概念和公式');
        suggestions.push('• 多做类似题目加强理解');
      }
    });

    return suggestions.join('\n');
  };

  return (
    <Modal
      title="📝 反思总结"
      open={visible}
      onCancel={onComplete}
      footer={[
        <Button key="complete" type="primary" onClick={onComplete}>
          完成反思，继续下一题
        </Button>
      ]}
      width={700}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={4}>{question.content}</Title>
          <Text type="secondary">难度：{question.difficulty} | 思维类型：{question.thinking_type}</Text>
        </div>

        <div>
          <Text strong>答题情况：</Text>
          <List
            size="small"
            dataSource={answers}
            renderItem={(answer: any, index) => (
              <List.Item>
                {answer.is_correct ? (
                  <Tag color="success" icon={<CheckCircleOutlined />}>
                    {index === 0 ? '原题' : `变式${index}`} - 正确
                  </Tag>
                ) : (
                  <Tag color="error" icon={<CloseCircleOutlined />}>
                    {index === 0 ? '原题' : `变式${index}`} - 错误
                  </Tag>
                )}
                <Text type="secondary" style={{ marginLeft: 8 }}>
                  用时：{answer.time_spent}秒
                </Text>
              </List.Item>
            )}
          />
        </div>

        <div>
          <Title level={5}>📊 反思分析</Title>
          <Paragraph style={{ whiteSpace: 'pre-line', background: '#f5f5f5', padding: 16, borderRadius: 4 }}>
            {analysis || '正在生成分析...'}
          </Paragraph>
        </div>
      </Space>
    </Modal>
  );
};

export default ReflectionModal;
