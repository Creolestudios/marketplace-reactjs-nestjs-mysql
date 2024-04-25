import React from 'react';
import ClientRoutes from './ClientRoutes';
import { useSelector, useDispatch } from "react-redux";
import { SpinCustom } from "@iso/components/uielements/spin";
import useWindowSize from "../library/helpers/useWindowSize";
import appActions from "../redux/app/action";

// export default class Client extends React.Component {
//   render() {
//     return (

//         <ClientRoutes />
     
//     );
//   }
// }
const { toggleAll } = appActions;

export default function Client() {
  const dispatch = useDispatch();

  const appHeight = useSelector((state) => state.App.height);
  const globalLoader = useSelector((state) => state.App.globalLoader);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    // dispatch(getMyAccount());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);

  return (
    <SpinCustom spinning={globalLoader > 0}>
      <ClientRoutes />
    </SpinCustom>
  );
}

