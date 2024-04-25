import actions from "./actions";

const initState = {
  userType: "employer",
  myTaskFilter: {
    "Open Task": 0,
    "Active Task": 0,
    "Completed Task": 0,
    "Cancelled Task": 0,
    "Archieved Task": 0,
    "Reported Task": 0,
    "Resolved Task": 0,
  },
  findTaskFilter: {
    "Placed Bids": 0,
    "Tasks for business": 0,
    "Tasks for freelancer": 0,
    "Urgent Task": 0,
    "Tasks with no bids": 0,
    "NemID Autorization": 0,
    "Remote Work": 0,
  },
  findTaskCategoryFilter: {
    category: null,
    sub_category: null,
  },
  specialistListFilter: {
    business: 0,
    freelancer: 0,
    "Rating above 4": 0,
    "Nemid authorization": 0,
  },
  pagination: {
    myTask: {
      page: 1,
      limit: 10,
    },
    findTask: {
      page: 1,
      limit: 10,
    },
    paymentHistory: {
      page: 1,
      limit: 10,
    },
    bids: {
      page: 1,
      limit: 10,
    },
    specialistList: {
      page: 1,
      limit: 10,
    },
    openTask: {
      page: 1,
      limit: 10,
    },
    notification: {
      page: 1,
      limit: 10,
    },
  },
  otherFields: {
    zipCode: null,
    task_budget: null,
    selectedBudget: null
  },
  otherSpecialistField: {
    category: null,
    sub_category: null,
    city: null
  },
  searchText: null
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.USER_TYPE:
      return {
        ...state,
        userType: action.payload,
      };

    case actions.UPDATE_MYTASK_FILTER:
      return {
        ...state,
        myTaskFilter: action.payload,
      };
    case actions.UPDATE_FINDTASK_FILTER:
      return {
        ...state,
        findTaskFilter: action.payload,
      };
    case actions.UPDATE_FINDTASK_CATEGORY:
      const updateCatFilter = { ...state.findTaskCategoryFilter };
      updateCatFilter["category"] = action.payload.category;
      updateCatFilter["sub_category"] = action.payload.sub_category;
      return {
        ...state,
        findTaskCategoryFilter: { ...updateCatFilter },
      };
    case actions.UPDATE_SPECIALIST_LIST_FILTER:
      return {
        ...state,
        specialistListFilter: action.payload,
      };
    case actions.UPDATE_PAGINATION:
      const updatePage = { ...state.pagination };
      updatePage[action.payload.type] = action.payload.currentPage;
      return {
        ...state,
        pagination: { ...updatePage },
      };
    case actions.CLEAR_ALL:
      return {
        ...state,
        [action.payload.type]: action.payload.payload,
      };
      case actions.OTHERFIELDS:
        return {
          ...state,
          otherFields: {...state.otherFields ,...action.payload}
        };
        case actions.SEARCH_VALUE:
          return {
            ...state,
            searchText: action.payload
          };
          case actions.OTHER_SPECIALIST_FIELDS:
            return {
              ...state,
              otherSpecialistField: {...action.payload}
            };    
      case actions.CLEAR_ALL_PAGES:
        return  initState
    default:
      return state;
  }
}
