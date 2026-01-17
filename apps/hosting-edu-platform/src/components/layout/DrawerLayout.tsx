import { Drawer, Menu } from '../ui';
import styled from 'styled-components';
import { version } from '../../firebase';
import { faGears, faHome, faUsers, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { includes, isEmpty } from 'lodash';

interface DrawerLayoutProps {
  user: '';
  isVisibleDrawer: boolean;
  onSetIsVisibleDrawer: () => void;
  onNavigateTo: () => void;
}

interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  fullName: string;
  phone: {
    prefix: string;
    number: string;
  };
  dateOfBirth: string;
  country?: string;
  city?: string;
  timezone?: string;
  role: 'admin' | 'user' | 'moderator' | 'guest';
  permissions?: string[]; // ['read:posts', 'write:comments', etc]
  isEmailVerified: boolean;
  isActive: boolean;
  isBanned?: boolean;
  language?: string;
  theme?: 'light' | 'dark' | 'auto';
  notifications?: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
}

export const DrawerLayout = ({
  user,
  isVisibleDrawer,
  onSetIsVisibleDrawer,
  onNavigateTo,
}: DrawerLayoutProps) => {
  const existsAclsInAclsOfUser = (category, subCategories = [], aclNames = []) => {
    return subCategories
      .map((subCategory) => {
        if (isEmpty(user?.acls?.[category]?.[subCategory])) return false;

        return user.acls?.[category]?.[subCategory].some((acl) => includes(aclNames, acl));
      })
      .some((acl) => acl);
  };

  const onClickMenu = (pathname) => {
    onSetIsVisibleDrawer(false);
    onNavigateTo(pathname);
  };

  const onClickHome = () => {
    onSetIsVisibleDrawer(false);
    onNavigateTo('/home');
  };

  const items = [
    {
      label: 'Home',
      key: 'home',
      icon: <FontAwesomeIcon icon={faHome} size="lg" />,
      isVisible: existsAclsInAclsOfUser('default', ['home'], ['/home']),
      onClick: () => onClickHome(),
    },
    {
      label: 'Control de Accesos (acls)',
      key: 'group-acls',
      icon: <FontAwesomeIcon icon={faUsersCog} size="lg" />,
      isVisible: existsAclsInAclsOfUser(
        'accessControl',
        ['defaultRolesAcls', 'manageAcls'],
        ['/default-roles-acls', '/manage-acls'],
      ),
      children: [
        {
          label: 'Roles con Acls',
          key: 'default-roles-acls',
          isVisible: existsAclsInAclsOfUser(
            'accessControl',
            ['defaultRolesAcls'],
            ['/default-roles-acls'],
          ),
          onClick: () => onClickMenu('/default-roles-acls'),
        },
        {
          label: 'Administrador Acls',
          key: 'manage-acls',
          isVisible: existsAclsInAclsOfUser('accessControl', ['manageAcls'], ['/manage-acls']),
          onClick: () => onClickMenu('/manage-acls'),
        },
      ],
    },
    {
      label: 'Administración',
      key: 'manager',
      icon: <FontAwesomeIcon icon={faGears} size="lg" />,
      isVisible: existsAclsInAclsOfUser(
        'administration',
        ['users'],
        ['/users', '/entities-gu', '/departments', '/sections', '/offices'],
      ),
      children: [
        {
          label: 'Usuarios',
          key: 'users',
          icon: <FontAwesomeIcon icon={faUsers} size="lg" />,
          isVisible: existsAclsInAclsOfUser('administration', ['users'], ['/users']),
          onClick: () => onClickMenu(`/users?userType=${currentCommand?.id}`),
        },
      ],
    },
  ];

  const filterByRoleCode = (items) => {
    return items.filter((item) => {
      if (item?.children) {
        item.children = (item?.children || []).filter((_children) => _children.isVisible);
      }

      return item.isVisible;
    });
  };

  return (
    <DrawerContainer
      key="right"
      title={
        <div style={{ width: '100%', textAlign: 'right' }}>
          <h5 style={{ color: '#fff' }}>version: {version}</h5>
        </div>
      }
      placement="left"
      width={330}
      closable={true}
      onClose={() => onSetIsVisibleDrawer(!isVisibleDrawer)}
      open={isVisibleDrawer}
      className="drawer-content"
      bodyStyle={{ padding: '0' }}
    >
      <div className="logo" />
      <Menu defaultSelectedKeys={['1']} mode="inline" items={filterByRoleCode(items)} />
    </DrawerContainer>
  );
};

const DrawerContainer = styled(Drawer)`
  .drawer-content {
    color: #fff;
  }
`;
