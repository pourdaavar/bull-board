import { useEffect, useState } from 'react';
import { Status, STATUSES } from '../components/constants';

const regularItems = ['Data', 'Options', 'Logs'] as const;

export type TabsType = typeof regularItems[number] | 'Error';

export function useDetailsTabs(currentStatus: Status) {
  const [tabs, updateTabs] = useState<TabsType[]>([]);
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);
  const selectedTab = tabs[selectedTabIdx];

  useEffect(() => {
    updateTabs(
      currentStatus === STATUSES.failed
        ? ['Error', ...regularItems]
        : [...regularItems]
    );
  }, [currentStatus]);

  return {
    tabs: tabs.map((title, index) => ({
      title,
      isActive: title === selectedTab,
      selectTab: () => setSelectedTabIdx(index),
    })),
    selectedTab,
  };
}
