import { combineReducers } from "redux";
import App from "../app/reducer";
import ThemeSwitcher from "../themeSwitcher/reducer";
import LanguageSwitcher from "../languageSwitcher/reducer";
import Auth from "../auth/reducer";
import Profile from "../profile/reducer";
import userTypeAndFilter from "../userTypeAndFilter/reducer";
import Task from "../task/reducer";
import Notification from "../notification/reducer";
import Categories from "../categoriesAndServices/reducer";
import Portfolio from "../portfolio/reducer";
import Modals from "../modals/reducer";
import MyCard from "../myCard/reducer";
import Payment from "../payment/reducer";
import AdminDashboard from "../admin/dashboard/reducer";
import AdminTask from "../admin/tasks/reducer";
import AdminUser from "../admin/users/reducer";
import AdminProfile from "../admin/profile/reducer";
import AdminAttribute from "../admin/attribute/reducer";
import AdminTransaction from "../admin/transaction/reducer";
import Chat from "../chat/reducer";
import Stripe from "../mystripeAccount/reducer";

export default combineReducers({
  App,
  Auth,
  ThemeSwitcher,
  LanguageSwitcher,
  userTypeAndFilter,
  Task,
  Notification,
  Profile,
  Categories,
  Portfolio,
  Modals,
  MyCard,
  Payment,
  AdminDashboard,
  AdminTask,
  AdminUser,
  AdminProfile,
  AdminAttribute,
  AdminTransaction,
  Chat,
  Stripe
});
