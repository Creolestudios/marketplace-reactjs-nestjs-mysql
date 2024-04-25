import React from 'react';
import { Tabs } from 'antd';
import { TabWrapper } from './style';
import IntlMessages from '@iso/components/utility/intlMessages';
import { Link, Redirect, useHistory,useLocation } from 'react-router-dom';

const { TabPane } = Tabs;


// function callback(key) {
//   console.log(key);
// }

const Tab = () => {
  const location = useLocation();
  const { pathname } = location;
  let testPath = pathname.split("/")

  let selectedPath = pathname.split("/").slice(-1)[0];
   let history = useHistory();
   function callback(key) {
    sessionStorage.getItem("is_guest") &&  key == "create-task" && sessionStorage.clear() &&
    localStorage.clear() && history.push("/client")
    
    key == "create-task" ? history.push(`/client/create-task`): history.push(`/client/find-task`);
    // window.location.reload()
  }
  
  return (
    <TabWrapper>
      <Tabs
        activeKey={testPath.includes("find-task") || testPath.includes("task-details-specialists") ? "find-task" : testPath.includes("create-task")? "create-task":""}
         onChange={callback}
      >
      
        <TabPane tab={<IntlMessages id="tab.CreateTask" />} key="create-task">
          {/* Create  */}
        </TabPane>
      
        <TabPane tab={<IntlMessages id="tab.FindTask" />} key="find-task">
          {/* Find Task */}
        </TabPane>
       
      </Tabs>
    </TabWrapper>
  );
};

export default Tab;
