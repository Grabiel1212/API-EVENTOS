
import { Outlet } from 'react-router-dom';
import { AppMenu } from '../components/app-menu/app-menu';

export default function AdminLayout() {
  return (
    <AppMenu>
      <Outlet />
    </AppMenu>
  );
}
