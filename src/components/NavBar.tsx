import { AppShell, NavLink } from '@mantine/core';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderContext } from '../context/HeaderContext';

export function Navbar({ close }: any) {
  const navigate = useNavigate();
  const {dispatch} = useContext(HeaderContext)
  return (
    <AppShell.Navbar p="md" style={{ gap: '10px' }}>
      <NavLink
        label="Shopify"
        onClick={() => { close(); navigate('/'); dispatch('wizard');}}
        style={{ margin: '5px' }}
      />
      <NavLink
        label="Print"
        onClick={() => { close(); navigate('/print'); dispatch('print'); }}
        style={{ margin: '5px' }}
      />
      <NavLink
        label="Donation"
        onClick={() => { close(); navigate('/donation'); dispatch('donation'); }}
        style={{ margin: '5px' }}
      />
      <NavLink
        label="Settings"
        onClick={() => { close(); navigate('/settings'); dispatch('settings'); }}
        style={{ margin: '5px' }}
      />
    </AppShell.Navbar>
  );
};