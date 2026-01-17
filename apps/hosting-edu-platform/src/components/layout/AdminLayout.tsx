import { type ReactNode, useState } from 'react';
import styled from 'styled-components';
import { DrawerLayout } from './DrawerLayout';
import { HeaderLayout } from './HeaderLayout';
import { FooterLayout } from './FooterLayout';
import { useNavigate } from 'react-router-dom';
import { BreadcrumbLayout } from './Breadcrumb';
import { useAuthentication } from '../../providers';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase';
import { doc } from '../../firebase/firestore.ts';
import { Alert, Layout, Spin } from '../ui';

const { Content } = Layout;

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthentication();

  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const onNavigateTo = (url: string) => navigate(url);

  const [settingDefault, settingDefaultLoading, settingDefaultError] = useDocumentData(
    doc(firestore, 'settings', 'default'),
  );

  return (
    <Spin tip="Cargando..." className="spin-item">
      <LayoutContainer>
        <Layout className="site-layout">
          {settingDefault?.['system-update-message'].isVisible && (
            <Alert
              message={<strong>{settingDefault['system-update-message'].message}</strong>}
              description={settingDefault['system-update-message'].description}
              type={settingDefault['system-update-message'].type}
              showIcon
              closable
            />
          )}
          <DrawerLayout
            user={authUser}
            isVisibleDrawer={isVisibleDrawer}
            onSetIsVisibleDrawer={setIsVisibleDrawer}
            onNavigateTo={onNavigateTo}
          />
          <HeaderLayout
            user={authUser}
            onNavigateTo={onNavigateTo}
            isVisibleDrawer={isVisibleDrawer}
            setIsVisibleDrawer={setIsVisibleDrawer}
            openDropdown={openDropdown}
            onOpenDropdown={setOpenDropdown}
            onLogout={logout}
          />
          <Content style={{ margin: '0 16px' }}>
            <BreadcrumbLayout user={authUser} />
            <div className="site-layout-background" style={{ padding: 24 }}>
              {children}
            </div>
          </Content>
          <FooterLayout />
        </Layout>
      </LayoutContainer>
    </Spin>
  );
};

const LayoutContainer = styled(Layout)`
  min-width: 100vw;
  min-height: 100vh;
  .site-layout-background {
    background: #fff;
  }

  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
`;
