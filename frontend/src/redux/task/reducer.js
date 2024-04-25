import actions from "./actions";

const initState = {
  error: "",
  acceptBidSuccess: "",
  acceptBidError: "",
  inviteSpecialistSuccess: "",
  inviteSpecialistError: "",
  data: {
    data: {
      tasks: [],
    },
  },
  singleTaskDetails: {
    employerDetails: {},
    task: {
      description: "",
    },
    placed_bid:{
      bid_amount:""
    },
    taskMedia: [],
    specialistDetails: {},
    openTaskBid: {
      bid_amount: "",
      bid_message: "",
    },
  },
  singleBidDetails: {
    task: {},
    activeBid: {},
    allBids: [],
  },
  findTask: {
    tasks: [],
  },
  title_search: "",
  specialist_List: {
    specialists: "",
    totalData: "",
  },
  TotalSuggested: [],
  reviewMessage: null,
  checkoutBidDetails:{},
  reportProfileSuccess: "",
  reportProfileFailer:"",
  placeBidFailerMessage:""
};

export default function taskReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_TASK_SUCCESS:
      return {
        error: "",
        ...state,
        data: action.data,
      };
      case actions.REPORT_PROFILE_SUCCESS:
        return {
          error: "",
          ...state,
          reportProfileSuccess: action.payload,
        };
        case actions.REPORT_PROFILE_FAILER:
          return {
            error: "",
            ...state,
            reportProfileFailer: action.payload,
          };
          case actions.PLACE_BID_FAILED:
            return {
            
              ...state,
              placeBidFailerMessage: action.payload,
            };
    case actions.GET_SPECIALIST_SUCCESS:
      return {
        error: "",
        ...state,
        specialist_List: action.payload,
      };
    case actions.SINGLE_TASK_SUCCESS:
      const singleTaskDetails = action.data;

      singleTaskDetails.employerDetails
        ? (singleTaskDetails.specialistDetails = {})
        : (singleTaskDetails.employerDetails = {});

      !singleTaskDetails.openTaskBid &&
        (singleTaskDetails.openTaskBid = { bid_amount: "", bid_message: "" });

      return {
        ...state,
        singleTaskDetails: singleTaskDetails,
        error: "",
      };
    case actions.GET_INVITED_SUCCESS:
      return {
        ...state,
        TotalSuggested: action.payload,
        error: "",
      };
    case actions.FIND_TASK_SUCCESS:
      return {
        ...state,
        findTask: action.payload,
        error: "",
      };
    case actions.SINGLE_BID_SUCCESS:
      return {
        ...state,
        singleBidDetails: action.data,
        error: "",
      };
    case actions.TASK_ACTION_SUCCESS:
      return {
        ...state,
        taskActionSuccess: action.data,
        error: "",
      };
    case actions.TASK_ACTION_FAILED:
      return {
        ...state,
        error: action.data,
      };
    case actions.ACCEPT_REJECT_BID_FAILED:
      return {
        ...state,
        acceptBidError: action.payload,
      };
    case actions.ACCEPT_REJECT_BID:
      return {
        ...state,
        acceptBidError: "",
      };
    case actions.ACCEPT_REJECT_BID_SUCCESS:
      return {
        ...state,
        acceptBidSuccess: action.payload,
      };
    case actions.INVITE_TASK_TO_SPECIALIST_SUCCESS:
      return {
        ...state,
        inviteSpecialistSuccess: action.payload,
        inviteSpecialistError: "",
      };
    case actions.INVITE_TASK_TO_SPECIALIST_FAILED:
      return {
        ...state,
        inviteSpecialistError: action.payload,
        inviteSpecialistSuccess: "",
      };
    case actions.CLEAR_MESSAGES:
      return {
        ...state,
        error: "",
        acceptBidSuccess: "",
        acceptBidError: "",
        inviteSpecialistSuccess: "",
        inviteSpecialistError: "",
        placeBidFailerMessage : "",
        reportProfileSuccess : "",
      };
    case actions.REVIEW_TASK_FAILED:
      return {
        ...state,
        reviewMessage: action.payload,
      };
    case actions.CHECKOUT_BID_DETAIL_SUCCESS:
      return {
        ...state,
        checkoutBidDetails: action.payload,
      };
    default:
      return state;
  }
}
