import React from 'react';
import { Tabs } from 'antd';
import AntTab, {
  CustomTabsHeaderWrapper,
  CustomTabsPanelWrapper,
  CustonTabPanelWrapper,
} from './styles/tab.style';
import WithDirection from '@iso/lib/helpers/rtl';
const WDTabs = AntTab(Tabs);
const TabPane = Tabs.TabPane;
const isoTabs = WithDirection(WDTabs);

export default isoTabs;
export { TabPane };

export const CustomTabHeader = ({
  tabs,
  activeKey = 1,
  changeTabKey,
  children,
  ...props
}) => {
  const handleTabClick = (data) => {
    if (activeKey !== data.key) {
      return changeTabKey(data);
    }
  };

  return (
    <CustomTabsHeaderWrapper>
      {children ? (
        children
      ) : (
        <React.Fragment>
          <ul className="customTabHeaderItems">
            {tabs.map((tab) => (
              <li
                key={tab.key}
                className={`customTabHeaderItem${
                  activeKey === tab.key ? ' activeTabKey' : ''
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.title}
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
    </CustomTabsHeaderWrapper>
  );
};

export const CustomTabPanelContainer = ({
  tabs,
  activeKey = 1,
  changeTabKey,
  children,
  ...props
}) => {
  return (
    <CustomTabsPanelWrapper {...props}>
      {children.map((panel) => {
        if (panel.props.tabkey === activeKey) {
          return panel;
        } else return null;
      })}
    </CustomTabsPanelWrapper>
  );
};

export const CustonTabPanel = ({ children, ...props }) => {
  return <CustonTabPanelWrapper {...props}>{children}</CustonTabPanelWrapper>;
};
