import { AppShell, NavLink } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();

  return (
    <AppShell.Navbar p="md" style={{ gap: '10px' }}>
      <NavLink
        label="Wizard"
        onClick={() => navigate('/')}
        style={{ margin: '5px' }}
      />
      <NavLink
        label="Print"
        onClick={() => navigate('/print')}
        style={{ margin: '5px' }}
      />
      <NavLink
        label="Settings"
        onClick={() => navigate('/settings')}
        style={{ margin: '5px' }}
      />
    </AppShell.Navbar>
  );
};