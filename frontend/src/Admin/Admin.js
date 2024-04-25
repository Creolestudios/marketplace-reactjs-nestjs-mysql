import React from 'react';
import AdminRoutes from './AdminRoutes';
import AdminGlobalWrapper from './Admin.style';
export default class Admin extends React.Component {
  render() {
    return (
      <AdminGlobalWrapper>
        <AdminRoutes />
      </AdminGlobalWrapper>
    );
  }
}
