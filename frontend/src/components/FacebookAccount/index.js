import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import authAction from "@iso/redux/auth/actions";
import appAction from "@iso/redux/app/action";
import IntlMessages from "@iso/components/utility/intlMessages";
const { facebookLogin } = authAction;
const { globalLoaderHandler } = appAction;

const FacebookAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(true);

  const pathLink = window.location.pathname;
  const searchLink = window.location.search;
  useEffect(() => {
    dispatch(globalLoaderHandler(loader));
    if (pathLink && searchLink) {
      const newLink = pathLink.replace('/marketplace/client', '');
      const link = newLink + searchLink;
      setUrl(link);
    }
    let payload = {
      link: url,
    };
    setLoader(false);
    dispatch(facebookLogin(payload, history));
    return () => {
      dispatch(globalLoaderHandler(loader));
    };
  }, [pathLink, searchLink, url, loader, dispatch, history]);

  return <><IntlMessages id="please-wait" /></>;
};

export default FacebookAccount;
