import { Page } from '@/types';
import OnboardClient from './onboard-client/component/dashboard/Dashboard.component';

const Dashboard: Page = () => {
  return (
    <><OnboardClient /></>
  );
};

Dashboard.rootLayoutProps = {
  pageType: "protected",
  title: 'Dashboard',
  sidebar: true,
};

export default Dashboard;