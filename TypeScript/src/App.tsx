import { Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

import Header from './components/Header';
import Nav from './components/Nav';

import CreateIssue from './pages/CreateIssue';
import Issue from './pages/Issue';

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
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
