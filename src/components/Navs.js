import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { NavList, LinkStyled } from './show/Navs.styled';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

const Navs = () => {
  const location = useLocation();

  return (
    <NavList>
      {LINKS.map(item => {
        return (
          <li key={item.to}>
            <LinkStyled
              className={item.to === location.pathname ? 'active' : ''}
              to={item.to}
            >
              {item.text}
            </LinkStyled>
          </li>
        );
      })}
    </NavList>
  );
};

export default memo(Navs);
