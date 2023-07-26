import { useEffect } from 'react';
import { useNewsStore } from './store';
import { Navbar, Container } from './components/index';
import { Content, Header } from 'rsuite';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  const fetchNews = useNewsStore((state) => state.fetchNews);

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Content>
      <Header>
        <Navbar />
      </Header>
      <Container>
        <Outlet/>
      </Container>
    </Content>
  );
}

export default App;
