import { useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { BookOutlined, DashboardOutlined, FileTextOutlined } from '@ant-design/icons';
import PracticePage from './components/PracticePage';
import Dashboard from './components/Dashboard';
import WrongQuestionsPage from './components/WrongQuestionsPage';
import './App.css';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'practice',
    icon: <BookOutlined />,
    label: '开始练习',
  },
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: '学习看板',
  },
  {
    key: 'wrong-questions',
    icon: <FileTextOutlined />,
    label: '错题本',
  },
];

function App() {
  const [selectedKey, setSelectedKey] = useState('practice');

  const renderContent = () => {
    switch (selectedKey) {
      case 'practice':
        return <PracticePage />;
      case 'dashboard':
        return <Dashboard />;
      case 'wrong-questions':
        return <WrongQuestionsPage />;
      default:
        return <PracticePage />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', background: '#1890ff' }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
          🎓 七年级代数AI学习工具
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
            onClick={({ key }) => setSelectedKey(key)}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
