function dateValidation(startDate, startTime, endDate,endTime ,selectedItem,setDateTimeError,setEndDateTimeError) {
    if (selectedItem === "GET_STARTED") {
        if (!startDate || !startTime) {
          setDateTimeError(true);
        } else {
          setDateTimeError(false);
        }
      } else if (selectedItem === "TO_FINISH_WORK") {
        if (!endDate || !endTime) {
          setDateTimeError(true);
        } else {
          setDateTimeError(false);
        }
      } else {
        if (selectedItem === "SPECIFY_PERIOD") {
          if (!startDate || !startTime) {
            setDateTimeError(true);
          } else {
            setDateTimeError(false);
          }
          if (!endDate || !endTime) {
            setEndDateTimeError(true);
          } else {
            setEndDateTimeError(false);
          }
        }
      }
  }
  
  export default dateValidation;