import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';

import { SidebarProvider } from './components/ui/sidebar';
import { AppSidebar } from './components/AppSidebar';
import { Chat } from './features/chat/Chat';

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <main className="flex h-screen w-full">
            {/* Sidebar on the left */}
            <aside className="h-full">
              <AppSidebar />
            </aside>

            {/* Dynamic content on the right */}
            <section className="flex-1 flex justify-center items-center bg-white size-full">
              <Routes>
                <Route path="/chat/:userId" element={<Chat />} />
                <Route path="*" element={<div>Select a chat</div>} />
              </Routes>
            </section>
          </main>
        </SidebarProvider>
      </QueryClientProvider>
  );
}

export default App;
