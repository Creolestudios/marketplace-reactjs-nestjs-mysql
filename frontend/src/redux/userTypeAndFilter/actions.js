const actions = {
    USER_TYPE : 'USER_TYPE',
    UPDATE_MYTASK_FILTER : 'UPDATE_MYTASK_FILTER',
    UPDATE_FINDTASK_FILTER : 'UPDATE_FINDTASK_FILTER',
    UPDATE_SPECIALIST_LIST_FILTER : 'UPDATE_SPECIALIST_LIST_FILTER',
    UPDATE_PAGINATION : 'UPDATE_PAGINATION',
    UPDATE_FINDTASK_CATEGORY : 'UPDATE_FINDTASK_CATEGORY',
    CLEAR_ALL: 'CLEAR_ALL',
    CLEAR_ALL_PAGES: "CLEAR_ALL_PAGES",
    OTHERFIELDS : "OTHERFIELDS",
    SEARCH_VALUE: "SEARCH_VALUE",
    OTHER_SPECIALIST_FIELDS: "OTHER_SPECIALIST_FIELDS",
    userType: (payload) => ({
      type: actions.USER_TYPE,
      payload: payload,
    }),
    updateMyTaskFilter: (payload) => ({
      type: actions.UPDATE_MYTASK_FILTER,
      payload: payload,
    }),
    updateFindTaskFilter: (payload) => ({
      type: actions.UPDATE_FINDTASK_FILTER,
      payload: payload,
    }), 
    updateSpecialistFilter: (payload) => ({
      type: actions.UPDATE_SPECIALIST_LIST_FILTER,
      payload: payload,
    }),  
    updatePagination: (payload) => ({
      type: actions.UPDATE_PAGINATION,
      payload: payload,
    }),
    clearAll: (payload) => ({
      type: actions.CLEAR_ALL,
      payload: payload,
    }),
    clearAllPages: (payload) => ({
      type: actions.CLEAR_ALL_PAGES,
      payload: payload,
    }),
    updateFindTaskCategory: (payload) => ({
      type: actions.UPDATE_FINDTASK_CATEGORY,
      payload: payload,
    }),
    otherField: (payload) => ({
      type: actions.OTHERFIELDS,
      payload: payload,
    }),
    otherSpecialistFields: (payload) => ({
      type: actions.OTHER_SPECIALIST_FIELDS,
      payload: payload,
    }),
    searchValue: (payload) => ({
      type: actions.SEARCH_VALUE,
      payload: payload,
    }),
  };
  
  export default actions;
  