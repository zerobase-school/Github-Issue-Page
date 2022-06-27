import { Route, Routes } from 'react-router-dom';

import Nav from './components/Nav';
import Header from './components/Header';

import Issue from './pages/Issue';
import CreateIssue from './pages/CreateIssue';
import Projects from './pages/Projects';
import PullRequest from './pages/PullRequest';
import Code from './pages/Code';
import Security from './pages/Security';
import Actions from './pages/Actions';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Header />
      <Routes>
        <Route path="/" element={<Issue />} />
        <Route path="/issue" element={<Issue />} />
        <Route path="/new" element={<CreateIssue />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/pulls" element={<PullRequest />} />
        <Route path="/code" element={<Code />} />
        <Route path="/security" element={<Security />} />
        <Route path="/actions" element={<Actions />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
