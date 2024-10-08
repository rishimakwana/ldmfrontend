import { Page } from '@/types';
import ClientDashboard from './components/clientDashboard/ClientDashboard.component';

const Dashboard: Page = () => {
  return (
    <><ClientDashboard /></>
  );
};

Dashboard.rootLayoutProps = {
  pageType: "protected",
  title: 'Dashboard',
  sidebar: true,
};
export default Dashboard;