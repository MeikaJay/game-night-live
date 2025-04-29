import React from 'react';

export default function GlobalLayoutWrapper({ children }) {
  const layout = localStorage.getItem('layoutPreference') || 'center';

  const layoutStyle =
    layout === 'center'
      ? 'flex flex-col items-center justify-center text-center px-4'
      : 'flex flex-col items-start justify-start text-left px-4';

  return <div className={`min-h-screen ${layoutStyle}`}>{children}</div>;
}
