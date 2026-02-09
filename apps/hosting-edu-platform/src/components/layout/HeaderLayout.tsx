import { useMemo, useState } from 'react';
import { Layout, Space, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mediaQuery } from '../../styles';
// import { useGlobalData } from '../../providers';
// import { Roles } from '../../data-list';
import { useDevice } from '../../hooks';

const { Header } = Layout;
const { useToken } = theme;

type User = {
  roleCode?: string;
  profilePhoto?: { thumbUrl?: string };
};

type Props = {
  user: User | null;
  isVisibleDrawer: boolean;
  setIsVisibleDrawer: (v: boolean) => void;
  openDropdown: boolean;
  onOpenDropdown: (open: boolean) => void;
  onNavigateTo: (path: string) => void;
  onLogout: () => Promise<void> | void;
};

export const HeaderLayout: React.FC<Props> = ({
  user,
  isVisibleDrawer,
  setIsVisibleDrawer,
  openDropdown,
  onOpenDropdown,
  onNavigateTo,
  onLogout,
}) => {
  const { token } = useToken();
  const { rolesAcls } = useGlobalData();
  const { isMobile } = useDevice();

  const [showAllCommands, setShowAllCommands] = useState(false);

  const roleName = useMemo(() => {
    const code = user?.roleCode;
    if (!code) return '';
    return (
      rolesAcls.find((r: any) => r.id === code)?.name ||
      Roles.find((r: any) => r.id === code)?.name ||
      ''
    );
  }, [rolesAcls, user?.roleCode]);

  const dropdownItems = useMemo(
    () => [
      {
        label: (
          <Link to="/profile" style={{ color: '#000' }}>
            <div style={{ padding: '.4em 0' }}>Perfil</div>
          </Link>
        ),
        key: 'profile',
      },
      {
        label: (
          <div onClick={() => onLogout()} style={{ padding: '.4em 0', color: 'red' }}>
            Cerrar sesión
          </div>
        ),
        key: 'logout',
      },
    ],
    [onLogout],
  );

  const contentStyle = useMemo(
    () => ({
      backgroundColor: token.colorBgElevated,
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowSecondary,
    }),
    [token],
  );

  const profileImg = user?.profilePhoto?.thumbUrl || '/logo-not-found.png';

  return (
    <HeaderContainer>
      <div className="right-item">
        <Space align="center" className="items-wrapper">
          <div className="btn-menu" onClick={() => setIsVisibleDrawer(!isVisibleDrawer)}>
            <FontAwesomeIcon icon={faBars} className="icon-item" />
          </div>

          <div>
            <img
              src="/logo-iciproperu.png"
              width={40}
              alt="Logo"
              onClick={() => onNavigateTo('/home')}
              className="logo-img"
            />
          </div>

          <div onClick={() => onNavigateTo('/home')} className="command-title">
            <h3>Testeando</h3>
          </div>
        </Space>
      </div>

      <div className="user-items"></div>
    </HeaderContainer>
  );
};

/** styles (los tuyos, casi igual) */

const ItemDefaultCommand = styled.div`
  width: 23.8em;
  display: grid;
  gap: 1em;
  padding: 1em;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  .wrapper-default-commands {
    width: 100%;
    border-radius: 1em;
    background: aliceblue;
    padding: 0.5em;
    display: flex;
    justify-content: space-between;
    gap: 1em;

    .item-command {
      width: 5em;
      display: grid;
      grid-template-rows: 1fr 1fr;
      gap: 0.5em;
      cursor: pointer;
    }

    .selected-command {
      display: grid;
      grid-template-rows: 1fr 1fr;
      gap: 0.5em;

      img {
        place-self: center;
        width: 2.2em;
        height: 2.2em;
        border-radius: 50%;
      }

      .text-command {
        display: grid;
        grid-template-rows: 1fr 1em;
        gap: 0.5em;
        line-height: 1;
        text-align: center;
        font-size: 0.45em;
        span:last-child {
          font-size: 1.2em;
          text-transform: uppercase;
        }
      }
    }

    .last-command {
      display: grid;
      grid-template-rows: 1fr 1fr;

      .item-img {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon-rotate {
          position: absolute;
          font-size: 2.2em;
          z-index: 200;
          animation: spin 10s linear infinite;
        }

        img {
          width: 1.5em;
          height: 1.5em;
          border-radius: 50%;
          z-index: 300;
        }
      }

      .text-command {
        display: grid;
        grid-template-rows: 1fr 1em;
        line-height: 1;
        text-align: center;
        font-size: 0.45em;
        span:last-child {
          font-size: 1.2em;
          text-transform: uppercase;
        }
      }
    }
  }

  .item-show-more-commands {
    color: dodgerblue;
    span {
      cursor: pointer;
    }
  }

  .wrapper-go-back {
    color: dodgerblue;
    span {
      cursor: pointer;
    }
  }

  .wrapper-more-commands {
    ul {
      list-style: none;
      margin: 0;
      display: flex;
      justify-content: center;
      gap: 0.4em;

      .item-command {
        display: grid;
        grid-template-rows: 1fr 1fr;
        gap: 0.5em;
        cursor: pointer;
        padding: 0.2em;
        border-radius: 0.4em;
        width: 5em;

        &:hover {
          background: #c3ddf6;
        }

        img {
          width: 2.2em;
          height: 2.2em;
          border-radius: 50%;
          place-self: center;
        }

        .text-command {
          display: grid;
          grid-template-rows: 1fr 1em;
          line-height: 1;
          text-align: center;
          font-size: 0.45em;
          gap: 0.5em;
          span:last-child {
            font-size: 1.2em;
            text-transform: uppercase;
          }
        }
      }
    }
  }
`;

const HeaderContainer = styled(Header)`
  background: #fff !important;
  position: sticky;
  top: 1px;
  z-index: 1000;
  display: grid;
  grid-template-columns: auto 1fr;
  box-shadow: 0 1px 4px rgba(105, 105, 105, 0.24);
  overflow: hidden;
  padding: 0 16px;

  .btn-menu {
    font-size: 1.7em;
    display: flex;
    align-items: center;
  }

  .right-item {
    display: flex;
    align-items: center;

    .items-wrapper {
      .logo-img,
      .icon-item {
        cursor: pointer;
      }
      .icon-item {
        margin-right: 1em;
      }
    }

    .command-title h3 {
      text-transform: uppercase;
      font-weight: bold;
      margin: 0;
    }
  }

  .user-items {
    display: flex;
    align-items: center;
    justify-content: end;

    h4 {
      margin: 0;
      font-size: 0.8em;

      ${mediaQuery.minTablet} {
        font-size: 1em;
      }
    }

    img {
      width: 2em;
      height: 2em;
      border-radius: 50%;
      margin: auto;
      object-fit: cover;
      cursor: pointer;

      ${mediaQuery.minTablet} {
        width: 2.5em;
        height: 2.5em;
      }
    }
  }
`;
