import IntlMessages from "@iso/components/utility/intlMessages";

const options = [
  {
    key: "users",
    label: "sidebar.users",
    leftIcon: "user-icon",
  },
  {
    key: "alltasks",
    label: "sidebar.allTasks",
    leftIcon: "billing-icon",
    children: [
      {
        key: "alltasks/tasks",
        label: "sidebar.alltasks.tasks",
      },
      {
        key: "alltasks/reported-tasks",
        label: "sidebar.alltasks.reportedTasks",
      },
    ],
  },

  {
    key: "transactions",
    label: "sidebar.transactions",
    leftIcon: "brandapp-icon",
  },
  {
    key: "messages",
    label: "sidebar.messages",
    leftIcon: "support-icon",
  },
  {
    key: "attributes",
    label: "sidebar.attributes",
    leftIcon: "messages-icon",
  },

  {
    key: "reported-profiles",
    label: "sidebar.reportedProfiles",
    leftIcon: "subscription-plans-icon",
  },
];
export default options;
