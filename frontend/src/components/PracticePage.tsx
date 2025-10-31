import { useState, useEffect } from 'react';
import { Card, Button, Input, Space, Typography, Tag, Statistic, Row, Col, message, Modal } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { questionsApi, sessionsApi, answersApi, Question, PracticeSession, Variation } from '../services/api';
import Timer from './Timer';
import ReflectionModal from './ReflectionModal';

const { Title, Text, Paragraph } = Typography;

type PracticeStage = 'start' | 'original' | 'variations' | 'reflection' | 'completed';

const PracticePage = () => {
  const [stage, setStage] = useState<PracticeStage>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [currentVariationIndex, setCurrentVariationIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [session, setSession] = useState<PracticeSession | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [reflectionModalVisible, setReflectionModalVisible] = useState(false);

  // 开始练习
  const startPractice = async () => {
    try {
      const { data: allQuestions } = await questionsApi.getAll();
      setQuestions(allQuestions);

      const { data: newSession } = await sessionsApi.create();
      setSession(newSession);

      setCurrentIndex(0);
      setCurrentQuestion(allQuestions[0]);
      setStage('original');
      setStartTime(Date.now());
      message.success('开始练习！共15道题目');
    } catch (error) {
      message.error('启动失败，请检查后端服务');
      console.error(error);
    }
  };

  // 提交答案
  const submitAnswer = async () => {
    if (!currentQuestion || !session) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const correct = checkAnswer(userAnswer, currentQuestion.answer);

    setIsCorrect(correct);
    setShowAnswer(true);

    try {
      const { data: answer } = await answersApi.submit({
        session_id: session.id,
        question_id: currentQuestion.id,
        user_answer: userAnswer,
        is_correct: correct,
        time_spent: timeSpent,
        question_type: 'original',
      });

      setAnswers([...answers, answer]);
    } catch (error) {
      message.error('提交失败');
      console.error(error);
    }
  };

  // 检查答案
  const checkAnswer = (userAns: string, correctAns: string): boolean => {
    const normalize = (str: string) => str.replace(/\s/g, '').toLowerCase();
    return normalize(userAns) === normalize(correctAns) ||
           correctAns.split('或').some(ans => normalize(userAns) === normalize(ans.trim()));
  };

  // 继续到变式题
  const continueToVariations = async () => {
    if (!currentQuestion) return;

    try {
      const { data: newVariations } = await questionsApi.generateVariations(currentQuestion.id);
      setVariations(newVariations);
      setCurrentVariationIndex(0);
      setStage('variations');
      setUserAnswer('');
      setShowAnswer(false);
      setIsCorrect(null);
      setStartTime(Date.now());
    } catch (error) {
      message.error('生成变式失败');
      console.error(error);
    }
  };

  // 提交变式答案
  const submitVariationAnswer = async () => {
    if (!currentQuestion || !session || variations.length === 0) return;

    const currentVariation = variations[currentVariationIndex];
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const correct = checkAnswer(userAnswer, currentVariation.answer);

    setIsCorrect(correct);
    setShowAnswer(true);

    try {
      const { data: answer } = await answersApi.submit({
        session_id: session.id,
        question_id: currentQuestion.id,
        user_answer: userAnswer,
        is_correct: correct,
        time_spent: timeSpent,
        question_type: 'variation',
        variation_id: currentVariation.id,
      });

      setAnswers([...answers, answer]);
    } catch (error) {
      message.error('提交失败');
      console.error(error);
    }
  };

  // 下一道变式或进入反思
  const nextVariationOrReflection = () => {
    if (currentVariationIndex < variations.length - 1) {
      setCurrentVariationIndex(currentVariationIndex + 1);
      setUserAnswer('');
      setShowAnswer(false);
      setIsCorrect(null);
      setStartTime(Date.now());
    } else {
      // 所有变式完成，进入反思
      setStage('reflection');
      setReflectionModalVisible(true);
    }
  };

  // 完成反思，进入下一题
  const completeReflection = () => {
    setReflectionModalVisible(false);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentQuestion(questions[currentIndex + 1]);
      setStage('original');
      setUserAnswer('');
      setShowAnswer(false);
      setIsCorrect(null);
      setVariations([]);
      setStartTime(Date.now());
    } else {
      // 所有题目完成
      setStage('completed');
      if (session) {
        sessionsApi.end(session.id);
      }
      message.success('恭喜完成所有题目！');
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

  if (stage === 'start') {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <Title level={2}>七年级代数测试</Title>
        <Paragraph>
          本测试包含15道代数题，分为初级、中级、高级三个难度
        </Paragraph>
        <Paragraph>
          每道题会有2-4道变式练习，帮助你巩固知识点
        </Paragraph>
        <Button type="primary" size="large" onClick={startPractice}>
          开始测试
        </Button>
      </div>
    );
  }

  if (stage === 'completed') {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a' }} />
        <Title level={2}>测试完成！</Title>
        <Paragraph>
          你已完成所有15道题目和变式练习
        </Paragraph>
        <Space>
          <Button type="primary" onClick={() => window.location.reload()}>
            重新开始
          </Button>
          <Button onClick={() => setStage('start')}>
            返回首页
          </Button>
        </Space>
      </div>
    );
  }

  const isVariationStage = stage === 'variations';
  const currentContent = isVariationStage && variations.length > 0
    ? variations[currentVariationIndex]
    : currentQuestion;

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="当前进度"
              value={currentIndex + 1}
              suffix={`/ ${questions.length}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已答对"
              value={answers.filter(a => a.is_correct).length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ marginBottom: 8 }}>
              <Text type="secondary">计时</Text>
            </div>
            <Timer startTime={startTime} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="当前阶段"
              value={isVariationStage ? '变式练习' : '原题'}
            />
          </Card>
        </Col>
      </Row>

      {currentQuestion && (
        <Card className="question-card">
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Space>
                <Tag color={getDifficultyColor(currentQuestion.difficulty)}>
                  {getDifficultyText(currentQuestion.difficulty)}
                </Tag>
                <Tag color="blue">{currentQuestion.thinking_type}</Tag>
                {isVariationStage && (
                  <Tag color="purple">
                    变式 {currentVariationIndex + 1}/{variations.length}
                  </Tag>
                )}
              </Space>
            </div>

            <div>
              <Title level={4}>
                {isVariationStage ? '变式题目：' : '题目：'}
              </Title>
              <Text style={{ fontSize: 18 }}>
                {currentContent?.content}
              </Text>
            </div>

            <div>
              <Text strong>你的答案：</Text>
              <Input
                size="large"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="请输入你的答案"
                disabled={showAnswer}
                onPressEnter={() => {
                  if (!showAnswer) {
                    isVariationStage ? submitVariationAnswer() : submitAnswer();
                  }
                }}
              />
            </div>

            {showAnswer && (
              <Card
                style={{
                  background: isCorrect ? '#f6ffed' : '#fff2f0',
                  borderColor: isCorrect ? '#b7eb8f' : '#ffccc7'
                }}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    {isCorrect ? (
                      <Text className="correct-answer">
                        <CheckCircleOutlined /> 回答正确！
                      </Text>
                    ) : (
                      <Text className="wrong-answer">
                        <CloseCircleOutlined /> 回答错误
                      </Text>
                    )}
                  </div>
                  <div>
                    <Text strong>正确答案：</Text>
                    <Text style={{ fontSize: 16, marginLeft: 8 }}>
                      {currentContent?.answer}
                    </Text>
                  </div>
                  {!isVariationStage && currentQuestion.explanation && (
                    <div>
                      <Text strong>解析：</Text>
                      <Paragraph style={{ marginTop: 8 }}>
                        {currentQuestion.explanation}
                      </Paragraph>
                    </div>
                  )}
                </Space>
              </Card>
            )}

            <div>
              <Space>
                {!showAnswer && (
                  <Button
                    type="primary"
                    size="large"
                    onClick={isVariationStage ? submitVariationAnswer : submitAnswer}
                    disabled={!userAnswer.trim()}
                  >
                    提交答案
                  </Button>
                )}

                {showAnswer && !isVariationStage && (
                  <Button
                    type="primary"
                    size="large"
                    onClick={continueToVariations}
                  >
                    继续变式练习
                  </Button>
                )}

                {showAnswer && isVariationStage && (
                  <Button
                    type="primary"
                    size="large"
                    onClick={nextVariationOrReflection}
                  >
                    {currentVariationIndex < variations.length - 1 ? '下一道变式' : '进入反思'}
                  </Button>
                )}
              </Space>
            </div>
          </Space>
        </Card>
      )}

      {currentQuestion && (
        <ReflectionModal
          visible={reflectionModalVisible}
          question={currentQuestion}
          answers={answers.filter(a => a.question_id === currentQuestion.id)}
          onComplete={completeReflection}
        />
      )}
    </div>
  );
};

export default PracticePage;
