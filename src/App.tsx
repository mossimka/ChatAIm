import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

          {/* Chat in the center (fill remaining space) */}
          <section className="flex-1 flex justify-center items-center bg-white size-full">
            <Chat />
          </section>
        </main>
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default App;
