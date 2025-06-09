import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="flex justify-start flex-col w-full">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 flex-col justify-between">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}
