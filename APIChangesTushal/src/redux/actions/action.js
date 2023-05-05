import AdminAPI from "../../Utils/AxiosInstance";
import { ActionTypes } from "../actions/actionTypes";
import { getToken } from "../../Utils/LocalStorage";

export const Logins = (val) => async (dispatch) => {
  try {
    const response = await AdminAPI.post("/login", {
      username: val?.username,
      password: val?.password,
    });

    dispatch({ type: ActionTypes.GET_LOGIN_RESPONSE, payload: response });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_LOGIN_RESPONSE,
      payload: err?.response?.data?.message,
    });
  }
};

export const GetData =
  (
    fromdate,
    todate,
    healthID,
    limit,
    skip,
    booked,
    completed,
    pending,
    cancelled,
    search,
    appointmentStatusid,
    medicalid,
    sorting
  ) =>
  async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.get(
        `/appointments?limit=${limit}&skip=${skip}&healthCenterId=${healthID}&${`pending=${
          pending ? pending : ""
        }&completed=${completed ? completed : ""}&booked=${
          booked ? booked : ""
        }&cancelled=${cancelled ? cancelled : ""}`} &searchQuery=${
          search ? search : ""
        }&appointmentStatusId=${
          appointmentStatusid ? appointmentStatusid : ""
        }&medicalCenterId=${medicalid ? medicalid : ""}&fromDate=${
          fromdate ? fromdate : ""
        }&toDate=${todate ? todate : ""}&sort=${sorting ? sorting : ""}

        `,

        //   `/appointments?limit=${limit}&skip=${skip}&${
        //     fromdate ? [`fromDate=${fromdate}`] : ""
        //   } &${todate ? [`toDate=${todate}`] : ""}  &${
        //     healthID ? [`medicalCenterId=${healthID}`] : ""
        //   }
        // `,

        {
          headers: {
            Authorization: token,
          },
        }
      );

      dispatch({ type: ActionTypes.GET_DATA_RESPONSE, payload: response });
    } catch (err) {
      dispatch({
        type: ActionTypes.GET_DATA_RESPONSE,
        payload: err?.response?.data?.message,
      });
    }
  };

export const MedicalCenterList =
  (skip, limit, city, searchfilter) => async (dispatch) => {
    const token = getToken();
    try {
      const response = await AdminAPI.get(
        `/medicalCenters?limit=${limit}&skip=${skip}&city=${city}&searchQuery=${
          searchfilter !== undefined ? searchfilter : ""
        }`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      dispatch({
        type: ActionTypes.GET_DATA_MEDICAL_RESPONSE,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.GET_DATA_MEDICAL_RESPONSE,
        payload: err?.response?.data?.message,
      });
    }
  };

export const afterAddNewCentereAndLoadAll =
  (skip, limit, city, searchfilter) => async (dispatch) => {
    const token = getToken();
    try {
      const response = await AdminAPI.get(
        `/medicalCenters?limit=${limit}&skip=${skip}&city=${city}&searchQuery=${
          searchfilter !== undefined ? searchfilter : ""
        }`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      dispatch({
        type: ActionTypes.GET_DATA_MEDICAL_RESPONSE,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.GET_DATA_MEDICAL_RESPONSE,
        payload: err.response.data.message,
      });
    }
  };
// for DropDown
export const MedicalCenters = () => async (dispatch) => {
  const token = getToken();
  try {
    const response = await AdminAPI.get("/medicalCenters", {
      headers: {
        Authorization: token,
      },
    });

    dispatch({
      type: ActionTypes.GET_DATA_MEDICAL_RESPONSE,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_DATA_MEDICAL_RESPONSE,
      payload: err?.response?.data?.message,
    });
  }
};

export const SideBarFun = (boolvlu) => async (dispatch) => {
  dispatch({
    type: ActionTypes.SIDEBAR_VALUE,
    payload: boolvlu,
  });
};

export const UpdateAppointment =
  (appointmentId, bookingid) => async (dispatch) => {
    const token = getToken();
    try {
      const response = await AdminAPI.post(
        `appointments/${appointmentId}`,
        {
          appointmentStatus: bookingid,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      dispatch({
        type: ActionTypes.UPDATE_APPOINTMENT_LIST,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.UPDATE_APPOINTMENT_LIST,
        payload: err?.response?.data?.message,
      });
    }
  };

export const AddMedical = (values, mainmobile, file) => async (dispatch) => {
  const token = getToken();

  const formData = new FormData();
  formData.append("name", values?.centername);
  formData.append("cityId", values?.city);
  // formData.append("district", values?.district);
  formData.append("description", values.description);
  formData.append("address", values?.address);
  // formData.append("email","user@example.com")
  formData.append("facebookLink", values?.facbooklink);
  formData.append("website", values?.weblink);
  for (let i = 0; i < file.length; i++) {
    formData.append("file", file[i]);
  }
  for (let i = 0; i < mainmobile.length; i++) {
    formData.append("phoneNumber", mainmobile[i]);
  }
  // formData.append(    googleMapLink: "string")

  try {
    const response = await AdminAPI.post("/medicalCenters", formData, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.ADD_MEDICAL_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_MEDICAL_RES,
      payload: err?.response?.data,
    });
  }
};
export const UpdateMedicals =
  (values, mainmobile, file, id) => async (dispatch) => {
    const token = getToken();

    const formData = new FormData();
    formData.append("name", values?.centername);
    formData.append("city", values?.city);
    // formData.append("district", values?.district);
    formData.append("description", values.description);
    formData.append("address", values?.address);
    // formData.append("email","user@example.com")
    formData.append("facebookLink", values?.facbooklink);
    formData.append("website", values?.weblink);
    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }
    for (let i = 0; i < mainmobile.length; i++) {
      formData.append("phoneNumber", mainmobile[i]);
    }
    // formData.append(    googleMapLink: "string")

    try {
      const response = await AdminAPI.patch(`/medicalCenters/${id}`, formData, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: ActionTypes.UPDATE_MEDICAL_RES,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.UPDATE_MEDICAL_RES,
        payload: err.response.data.message,
      });
    }
  };

export const DoctorList =
  (skip, limit, specialty, searchQuery) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.get(
        `/doctors?skip=${skip}&limit=${limit}&medicalSpecialtyId=${
          specialty ? specialty : ""
        }&searchQuery=${searchQuery !== undefined ? searchQuery : ""}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.GET_DOCTOR_LIST,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.GET_DOCTOR_LIST,
        payload: err?.response?.data,
      });
    }
  };

export const DoctorListForForm = (skip, limit) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      `/doctors?skip=${skip}&limit=${limit}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.GET_DOCTOR_LIST_FORM,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_DOCTOR_LIST_FORM,
      payload: err?.response?.data?.message,
    });
  }
};

export const CityList = (skip, limit, search) => async (dispatch) => {
  // export const CityList = () => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      `/misc/cities?skip=${skip}&limit=${limit}&searchQuery=${
        search ? search : ""
      }`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.GET_CITY_LIST,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_CITY_LIST,
      payload: err?.response?.data?.message,
    });
  }
};

export const MedicalSpecialList = (skip, limit, search) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      `/misc/medicalSpecialties?skip=${skip}&limit=${limit}&searchQuery=${
        search ? search : ""
      }`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.GET_MEDICAL_SPECIAL_LIST_RESPONSE,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_MEDICAL_SPECIAL_LIST_RESPONSE,
      payload: err?.response?.data?.message,
    });
  }
};

export const GetSchedulesByMedical = (id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      `/schedules?medicalCenterId=${id}&groupBy=doctor`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.GET_SCHEDULES_RES_MEDICAL,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_SCHEDULES_RES_MEDICAL,
      payload: err.response.data.message,
    });
  }
};

export const GetSchedulesByMedicalNEw = (id, search) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      `/schedules?medicalCenterId=${id}&groupBy=doctor&searchQuery=${
        search ? search : ""
      }`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.GET_SCHEDULES_RES_MEDICAL,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_SCHEDULES_RES_MEDICAL,
      payload: err.response.data.message,
    });
  }
};

export const createSchedulesByMedical = (data) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post(`/schedules`, data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.CREATE_SCHEDULE_API_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.CREATE_SCHEDULE_API_RES,
      payload: err.response.data.message,
    });
  }
};

export const createSchedulesByDoctor = (data) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post(`/schedules`, data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.CREATE_SCHEDULE_API_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.CREATE_SCHEDULE_API_RES,
      payload: err.response.data.message,
    });
  }
};

export const createSchedulesByDoctorForScdeule = (data) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post(`/schedules`, data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.CREATE_SCHEDULE_API_RES_SCDHULE,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.CREATE_SCHEDULE_API_RES_SCDHULE,
      payload: err.response.data.message,
    });
  }
};

export const createSchedulesByMedicalForScdeule =
  (data) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.post(`/schedules`, data, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({
        type: ActionTypes.CREATE_SCHEDULE_API_RES_SCDHULE,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.CREATE_SCHEDULE_API_RES_SCDHULE,
        payload: err.response.data.message,
      });
    }
  };

export const updateMedicalSchedule = (scheduleId, data) => async (dispatch) => {
  const token = getToken();

  try {
    // const response = await AdminAPI.post(`/schedules/${scheduleId}`, data, {
    const response = await AdminAPI.patch(`/schedules/${scheduleId}`, data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.UPDATE_SCHEDULE_API_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_SCHEDULE_API_RES,
      payload: err.response.data.message,
    });
  }
};
export const ChangePasswordAPI = (data, id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post(`/users/${id}/changePassword`, data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.CHANGE_PASSWORD_API,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.CHANGE_PASSWORD_API,
      payload: err?.response?.data,
    });
  }
};

// export const GetSchedulesByDoctor = (id) => async (dispatch) => {
//   const token = getToken();

//   try {
//     const response = await AdminAPI.get(
//       `/schedules?doctorId=${id}&groupBy=medicalCenter`,
//       {
//         headers: {
//           Authorization: token,
//         },
//       }
//     );
//     dispatch({
//       type: ActionTypes.GET_SCHEDULES_RES_DOCTOR,
//       payload: response,
//     });
//   } catch (err) {
//     dispatch({
//       type: ActionTypes.GET_SCHEDULES_RES_DOCTOR,
//       payload: err.response.data.message,
//     });
//   }
// };

export const GetSchedulesByDoctor = (id, search) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      // `/schedules/new?doctorId=${id}&groupBy=medicalCenter`,
      `/schedules?doctorId=${id}&groupBy=medicalCenter&searchQuery=${
        search ? search : ""
      }`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.GET_SCHEDULES_RES_DOCTOR,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_SCHEDULES_RES_DOCTOR,
      payload: err.response.data.message,
    });
  }
};
export const GetSchedulesByDoctorForScdhule = (id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      `/schedules?doctorId=${id}&groupBy=medicalCenter`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.GET_SCHEDULES_RES_DOCTOR_SCHEDULE,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_SCHEDULES_RES_DOCTOR_SCHEDULE,
      payload: err.response.data.message,
    });
  }
};

export const GetUserInfo = () => async (dispatch) => {
  const token = getToken();
  const username = localStorage.getItem("Zept_User");
  const userId = localStorage.getItem("Zept_UserId");
  // const userId = localStorage.getItem("Zept_UserId");

  try {
    const response = await AdminAPI.get(`/users/${userId}`, {
      // const response = await AdminAPI.get(`/users/${username}`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.GET_USER_INFORMATION,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_USER_INFORMATION,
      payload: err?.response?.data?.message,
    });
  }
};

export const GetAdmistratotUserList =
  (skip, limit, search) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.get(
        `/users?limit=${limit}&skip=${skip}&searchQuery=${
          search ? search : ""
        }`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.GET_USER_ADMIS_LIST,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.GET_USER_ADMIS_LIST,
        payload: err?.response?.data?.message,
      });
    }
  };

export const PostUserInfo = (values) => async (dispatch) => {
  const token = getToken();
  // const formdata = new FormData();
  // formdata.append("username", values.username);
  // formdata.append("phoneNumber", values.phone);
  // formdata.append("beneficiaryId", values.beneid);
  try {
    const response = await AdminAPI.post(
      "/users",
      // {
      //   username: values.username,
      //   firstName: values.firstname,
      //   lastName: values.lastname,
      //   secondName: values.secondName,
      //   thirdName: values.thirdName,
      //   phoneNumber: values.phone,
      //   email: values.email,
      //   // beneficiaryId: values.beneid,
      //   subscriberId: "hELLO",
      //   doctorId: values.doctor_id,
      //   institutionId: "dsadas",
      // },
      values,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.ADD_USER_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_USER_RES,
      payload: err?.response?.data?.message,
    });
  }
};

export const Update_User_info = (values, id) => async (dispatch) => {
  const token = getToken();
  // const formdata = new FormData();
  // formdata.append("username", values.username);
  // formdata.append("phoneNumber", values.phone);
  // formdata.append("beneficiaryId", values.beneid);
  try {
    const response = await AdminAPI.patch(
      "/users/" + id,
      // {
      //   username: values.username,
      //   firstName: values.firstname,
      //   lastName: values.lastname,
      //   secondName: values.secondName,
      //   thirdName: values.thirdName,
      //   phoneNumber: values.phone,
      //   email: values.email,
      //   // beneficiaryId: values.beneid,
      //   subscriberId: "hELLO",
      //   doctorId: values.doctor_id,
      //   institutionId: "dsadas",
      // },
      values,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.UPDATE_USER_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_USER_RES,
      payload: err?.response?.data?.message,
    });
  }
};

export const MedicalCenterListForModal = () => async (dispatch) => {
  const token = getToken();
  try {
    const response = await AdminAPI.get(`/medicalCenters`, {
      headers: {
        Authorization: token,
      },
    });

    dispatch({
      type: ActionTypes.GET_DATA_MEDICAL_RESPONSE,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_DATA_MEDICAL_RESPONSE,
      payload: err?.response?.data?.message,
    });
  }
};

export const AddDoctors = (values) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post(
      "/doctors",
      {
        firstName: values.first,
        secondName: values.second,
        middleName: values.middle,
        lastName: values.last,
        specialtyId: values.specialtyId,
        level: null,
        // level: values.level,
        gender: values.gender,
        // gender: values.gender,
        birthdate: values.birthdate ? values.birthdate : null,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.ADD_DOCTOR_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_DOCTOR_RES,
      payload: err?.response,
    });
  }
};
export const UpdateDoc = (values, id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.patch(
      `/doctors/${id}`,
      {
        firstName: values.first,
        secondName: values.second,
        lastName: values.last,
        specialtyId: values.specialty,
        // level: values.level,
        // gender: values.gender,
        level: null,
        // level: values.level,
        gender: values.gender,
        birthdate: values.birthdate,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.UPDATE_DOCTOR_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_DOCTOR_RES,
      payload: err.response.data.message,
    });
  }
};

export const LogoutAPI = () => async (dispatch) => {
  const id = localStorage.getItem("Zept_UserId");

  try {
    const response = await AdminAPI.post(
      `/users/${id}/logout`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.LOGOUT_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.LOGOUT_RES,
      payload: err?.response?.data?.message,
    });
  }
};

export const BenefeciaryList = (limit, skip, search) => async (dispatch) => {
  const token = getToken();
  try {
    const response = await AdminAPI.get(
      `/subscribers?limit=${limit}&skip=${skip}&searchQuery=${
        search ? search : ""
      }`,
      // `/beneficiaries?limit=${limit}&skip=${skip}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({
      type: ActionTypes.GET_BENE_LIST,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_BENE_LIST,
      payload: err?.response?.data?.message,
    });
  }
};

export const CreateInstitution = (data) => async (dispatch) => {
  const token = getToken();
  try {
    const response = await AdminAPI.post(`/institutions`, data, {
      headers: {
        Authorization: token,
      },
    });

    dispatch({
      type: ActionTypes.ADD_INSTITUTION_ITEM,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_INSTITUTION_ITEM,
      payload: err.response.data.message,
    });
  }
};

export const GetInstitutionList = () => async (dispatch) => {
  const token = getToken();
  try {
    const response = await AdminAPI.get(`/institutions`, {
      headers: {
        Authorization: token,
      },
    });

    dispatch({
      type: ActionTypes.GET_INSTITUTION_LIST,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_INSTITUTION_LIST,
      payload: err?.response?.data?.message,
    });
  }
};


export const GetRoleList = () => async (dispatch) => {
  const token = getToken();
  try {
    const response = await AdminAPI.get(`/role`, {
      headers: {
        Authorization: token,
      },
    });

    dispatch({
      type: ActionTypes.GET_ROLE_LIST,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_ROLE_LIST,
      payload: err?.response?.data?.message,
    });
  }
};

export const CreateBenefeciary = (data) => async (dispatch) => {
  const token = getToken();
  try {
    const response = await AdminAPI.post(
      // `/beneficiaries`,
      `/subscribers`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({
      type: ActionTypes.ADD_BENEFICIARY_DATA,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_BENEFICIARY_DATA,
      payload: err?.response,
    });
  }
};

export const UpdateBenefeciary = (data, id) => async (dispatch) => {
  const token = getToken();
  try {
    const response = await AdminAPI.patch(
      // `/beneficiaries`,
      `/subscribers/${id}`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({
      type: ActionTypes.UPDATE_BENEFICARY_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_BENEFICARY_RES,
      payload: err?.response?.data?.message,
    });
  }
};

export const GetSingleSubscriber = (id) => async (dispatch) => {
  const token = getToken();
  try {
    const response = await AdminAPI.get(
      // `/beneficiaries`,
      `/subscribers/${id}`,

      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({
      type: ActionTypes.GET_SINGLE_BENEFICIARY_DATA,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_SINGLE_BENEFICIARY_DATA,
      payload: err.response.data.message,
    });
  }
};
export const UpdateSubscriber = (data, id) => async (dispatch) => {
  const token = getToken();
  try {
    const response = await AdminAPI.post(
      // `/beneficiaries`,
      `/subscribers/${id}`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({
      type: ActionTypes.UPDATE_BENEFICIARY_DATA,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_BENEFICIARY_DATA,
      payload: err.response.data.message,
    });
  }
};

export const DeleteSchdeule = (id) => async (dispatch) => {
  const token = getToken();
  try {
    const response = await AdminAPI.delete(`/schedules/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    dispatch({
      type: ActionTypes.DELETE_SCHEDULE_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.DELETE_SCHEDULE_RES,
      payload: err.response.data.message,
    });
  }
};
export const DeleteSchdeuleOneByOne = (id) => async (dispatch) => {
  const token = getToken();
  try {
    const response = await AdminAPI.delete(`/schedules/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    dispatch({
      type: ActionTypes.DELETE_SCHEDULE_RES_ONE_BY_ONE,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.DELETE_SCHEDULE_RES_ONE_BY_ONE,
      payload: err.response.data.message,
    });
  }
};

export const ReltationShipBeneficary =
  (skip, limit, search) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.get(
        // "/relationshipToBeneficiaryEnum",
        `/misc/relationshipToSubscriberEnum?skip=${skip}&limit=${limit}&searchQuery=${
          search ? search : ""
        }`,

        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.BENE_RETALTION_LIST,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.BENE_RETALTION_LIST,
        payload: err?.response?.data?.message,
      });
    }
  };

export const ReltationShipBeneficarySingle = (id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      // "/relationshipToBeneficiaryEnum",
      "/misc/relationshipToBeneficiaryEnum" + id,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.BENE_RETALTION_SINGLE,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.BENE_RETALTION_SINGLE,
      payload: err.response.data.message,
    });
  }
};

export const FamilyMemberHealthIssueDetails =
  (bene_id, family_id) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.get(
        `/beneficiaries/${bene_id}/medicalFiles/familyMembers/${family_id}`,

        // /beneficiaries/{subscriberId}/beneficiaries/{beneficiaryId}/medicalFiles
        // `/beneficiaries/${bene_id}/beneficiaries/${family_id}/medicalFiles`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.HEALTH_ISSUE_FAMILY_MEMBER,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.HEALTH_ISSUE_FAMILY_MEMBER,
        payload: err.response.data.message,
      });
    }
  };

export const AddHelathreportData = (data, bene_id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post(
      // `/beneficiaries/${bene_id}/medicalFiles/familyMembers/tushar`,
      `/beneficiaries/${bene_id}/medicalFiles/familyMembers/tushar`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.ADD_HEALTH_ISSUE_FAMILY_MEMBER,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_HEALTH_ISSUE_FAMILY_MEMBER,
      payload: err.response.data.message,
    });
  }
};

// New Health isuue post  Updated API for medical issue   // change redux states after api live

export const GenderList = (skip, limit, search) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      // "/cities",
      `/misc/genderEnum?skip=${skip}&limit=${limit}&searchQuery=${
        search ? search : ""
      }`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.GET_GENDER_LIST,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_GENDER_LIST,
      payload: err?.response?.data,
    });
  }
};

export const GenderSingle = (id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      // "/cities",
      "/misc/genderEnum/" + id,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.GET_GENDER_SINGLE,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_GENDER_SINGLE,
      payload: err.response.data.message,
    });
  }
};

export const AddHelathreportClinicalVisits =
  (bene_id, family_id, data) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.post(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/clinicalVisits`,

        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.ADD_HEALTH_ISSUE_FAMILY_MEMBER,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.ADD_HEALTH_ISSUE_FAMILY_MEMBER,
        payload: err.response.data.message,
      });
    }
  };

export const AddHelathreportAllergies =
  (bene_id, family_id, data) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.post(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/allergies`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.ADD_HEALTH_ISSUE_FAMILY_MEMBER,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.ADD_HEALTH_ISSUE_FAMILY_MEMBER,
        payload: err.response.data.message,
      });
    }
  };

export const AddHelathreportSurgeryHistories =
  (bene_id, family_id, data) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.post(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/surgeryHistories`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.ADD_HEALTH_ISSUE_FAMILY_MEMBER,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.ADD_HEALTH_ISSUE_FAMILY_MEMBER,
        payload: err.response.data.message,
      });
    }
  };

export const AddHelathreportChronicDiseases =
  (bene_id, family_id, data) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.post(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/chronicDiseases`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.ADD_HEALTH_ISSUE_FAMILY_MEMBER,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.ADD_HEALTH_ISSUE_FAMILY_MEMBER,
        payload: err.response.data.message,
      });
    }
  };

export const AddHelathreportMedicalTests =
  (bene_id, family_id, data) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.post(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/medicalTests`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.ADD_HEALTH_ISSUE_FAMILY_MEMBER,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.ADD_HEALTH_ISSUE_FAMILY_MEMBER,
        payload: err.response.data.message,
      });
    }
  };

export const getHightWeightHelath =
  (subs_id, family_id) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.get(
        // `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/medicalTests`,
        `/subscribers/${subs_id}/beneficiaries/${family_id}/medicalFiles`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.GET_HEIGHT_WEIGHT,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.GET_HEIGHT_WEIGHT,
        payload: err.response.data.message,
      });
    }
  };

export const UpdateHightWeightHelath =
  (subs_id, family_id, data) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.patch(
        // `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/medicalTests`,
        `/subscribers/${subs_id}/beneficiaries/${family_id}/medicalFiles`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.UPDATE_HEIGHT_WEIGHT,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.UPDATE_HEIGHT_WEIGHT,
        payload: err.response.data.message,
      });
    }
  };

// New Health isuue get  Updated API for medical issue   // change redux states after api live
export const FamilyMemberClinicalVisits =
  (bene_id, family_id) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.get(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/clinicalVisits`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.HEALTH_ISSUE_FAMILY_MEMBER_CLINIC_VISIT,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.HEALTH_ISSUE_FAMILY_MEMBER_CLINIC_VISIT,
        payload: err.response.data.message,
      });
    }
  };

export const FamilyMemberAllergies = (subs_id, bene_id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      `/subscribers/${subs_id}/beneficiaries/${bene_id}/medicalFiles/allergies`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.HEALTH_ISSUE_FAMILY_MEMBER_ALLERGIES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.HEALTH_ISSUE_FAMILY_MEMBER_ALLERGIES,
      payload: err.response.data.message,
    });
  }
};

export const FamilyMemberSurgeryHistories =
  (bene_id, family_id) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.get(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/surgeryHistories`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.HEALTH_ISSUE_FAMILY_MEMBER_SURGEROY,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.HEALTH_ISSUE_FAMILY_MEMBER_SURGEROY,
        payload: err.response.data.message,
      });
    }
  };

export const FamilyMemberChronicDiseases =
  (bene_id, family_id) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.get(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/chronicDiseases`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.HEALTH_ISSUE_FAMILY_MEMBER_CHRONIC,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.HEALTH_ISSUE_FAMILY_MEMBER_CHRONIC,
        payload: err.response.data.message,
      });
    }
  };

export const FamilyMemberMedicalTests =
  (bene_id, family_id) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.get(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/medicalTests`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.HEALTH_ISSUE_FAMILY_MEMBER_MEDICAL_TEST,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.HEALTH_ISSUE_FAMILY_MEMBER_MEDICAL_TEST,
        payload: err.response.data.message,
      });
    }
  };

// 6 aprilr
export const AddCity = (data) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post(`/misc/cities`, data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.ADD_CITY_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_CITY_RES,
      payload: err?.response?.data?.message,
    });
  }
};

export const getSingleCity = (id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(`/misc/cities/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.GET_SINGLE_CITY,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_SINGLE_CITY,
      payload: err?.response?.data?.message,
    });
  }
};

export const UpdateCity = (data, id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.patch(`/misc/cities/${id}`, data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.UPDATE_CITY_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_CITY_RES,
      payload: err?.response?.data?.message,
    });
  }
};

export const AddMedicalRes = (data) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post(`/misc/medicalSpecialties`, data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.ADD_MEDIACLSPECILAITY_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_MEDIACLSPECILAITY_RES,
      payload: err?.response?.data?.message,
    });
  }
};

export const updateMedicalSpecilaty = (data, id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.patch(
      `/misc/medicalSpecialties/${id}`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.UPDATE_MEDIACLSPECILAITY_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_MEDIACLSPECILAITY_RES,
      payload: err?.response?.data?.message,
    });
  }
};

export const GetSingleMedicalSpecilaty = (id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      `/misc/medicalSpecialties/${id}`,

      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.SINGLE_MEDIACLSPECILAITY_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.SINGLE_MEDIACLSPECILAITY_RES,
      payload: err?.response?.data?.message,
    });
  }
};

export const AddReltationShipBeneficary = (data) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post(
      // "/relationshipToBeneficiaryEnum",
      // "/misc/relationshipToBeneficiaryEnum",
      "/misc/relationshipToSubscriberEnum",
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.ADD_BENE_RETALTION_LIST,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_BENE_RETALTION_LIST,
      payload: err.response.data.message,
    });
  }
};

export const UpdateRelationShipBeneficary = (data, id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.patch(
      // "/relationshipToBeneficiaryEnum",
      "/misc/relationshipToSubscriberEnum/" + id,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.UPDATE_BENE_RETALTION_LIST,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_BENE_RETALTION_LIST,
      payload: err.response.data.message,
    });
  }
};

export const AddGender = (data) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post("/misc/genderEnum", data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.ADD_GENDER_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_GENDER_RES,
      payload: err.response.data.message,
    });
  }
};

export const UpdateGender = (data, id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.patch(`/misc/genderEnum/${id}`, data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.UPDATE_GENDER,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_GENDER,
      payload: err.response.data.message,
    });
  }
};

export const getMedicalService = (skip, limit, Search) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      // "/relationshipToBeneficiaryEnum",
      `/misc/medicalServices?skip=${skip}&limit=${limit}&searchQuery=${
        Search ? Search : ""
      }`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.GET_MEDICAL_SERVICE_LIST,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_MEDICAL_SERVICE_LIST,
      payload: err.response.data.message,
    });
  }
};

export const getSingleMedicalService = (id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      // "/relationshipToBeneficiaryEnum",
      `/misc/medicalServices/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.GET_MEDICAL_SERVICE_SINGLE,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_MEDICAL_SERVICE_SINGLE,
      payload: err.response.data.message,
    });
  }
};

export const AddMedicalService = (data) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post("/misc/medicalServices", data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.ADD_MEDICAL_SERVICE_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_MEDICAL_SERVICE_RES,
      payload: err.response.data.message,
    });
  }
};

export const UpdateMedicalService = (data, id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.patch("/misc/medicalServices/" + id, data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.UPDATE_MEDICAL_SERVICE_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_MEDICAL_SERVICE_RES,
      payload: err.response.data.message,
    });
  }
};
export const AddAppointmentStatus = (data) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post("/misc/appointmentStatusEnum", data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.ADD_APPOINTMENT_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_APPOINTMENT_RES,
      payload: err.response.data.message,
    });
  }
};

export const UpdateAppointmentStatus = (data, id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.patch(
      "/misc/appointmentStatusEnum/" + id,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.UPDATE_APPOINTMENT_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_APPOINTMENT_RES,
      payload: err.response.data.message,
    });
  }
};

export const getAppointmentStatus =
  (skip, limit, search) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.get(
        `/misc/appointmentStatusEnum?skip=${skip}&limit=${limit}&searchQuery=${
          search ? search : ""
        }`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.GET_APPOINTMENT_LIST,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.GET_APPOINTMENT_LIST,
        payload: err.response.data.message,
      });
    }
  };

export const getAppointmentSingleStatus = (id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get("/misc/appointmentStatusEnum/" + id, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.GET_APPOINTMENT_SINGLE,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_APPOINTMENT_SINGLE,
      payload: err.response.data.message,
    });
  }
};

export const getTimeSlotEnum = (skip, limit, search) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      `/misc/timeSlotEnum?skip=${skip}&limit=${limit}&searchQuery=${
        search ? search : ""
      }`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.GET_TIMESLOT_LIST,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_TIMESLOT_LIST,
      payload: err?.response?.data?.message,
    });
  }
};

export const getTimeSlotEnumSingle = (id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get("/misc/timeSlotEnum/" + id, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.GET_TIMESLOT_SINGLE,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_TIMESLOT_SINGLE,
      payload: err.response.data.message,
    });
  }
};

export const addTimeSlotEnum = (data) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post("/misc/timeSlotEnum", data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.ADD_TIMESLOT_LIST,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_TIMESLOT_LIST,
      payload: err.response.data.message,
    });
  }
};

export const UpdateTimeSlotEnum = (data, id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.patch("/misc/timeSlotEnum/" + id, data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.UPDATE_TIMESLOT_LIST,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_TIMESLOT_LIST,
      payload: err.response.data.message,
    });
  }
};

export const getAccountstatusEnum =
  (skip, limit, search) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.get(
        `/misc/accountStatusEnum?skip=${skip}&limit=${limit}&searchQuery=${
          search ? search : ""
        }`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({
        type: ActionTypes.GET_ACCOUNTSTATUS_LIST,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.GET_ACCOUNTSTATUS_LIST,
        payload: err.response.data.message,
      });
    }
  };

export const getSingleAccountstatusEnum = (id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get("/misc/accountStatusEnum" + id, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.GET_ACCOUNTSTATUS_SINGLE,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_ACCOUNTSTATUS_SINGLE,
      payload: err.response.data.message,
    });
  }
};
export const addAccountStatusEnum = (data) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post("/misc/accountStatusEnum", data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.ADD_ACCOUNT_STATUS_LIST,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_ACCOUNT_STATUS_LIST,
      payload: err.response.data.message,
    });
  }
};

export const UpdateAccountStatusEnum = (data, id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.patch(
      "/misc/accountStatusEnum/" + id,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.UPDATE_ACCOUNT_STATUS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_ACCOUNT_STATUS,
      payload: err.response.data.message,
    });
  }
};

export const UpdateUserDetail = (userId, data) => async (dispatch) => {
  const token = getToken();
  // let userId = localStorage.getItem("Zept_UserId");
  try {
    const response = await AdminAPI.patch(`/users/${userId}`, data, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.UPDATE_USER_DETAILS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_USER_DETAILS,
      payload: err.response.data.message,
    });
  }
};

export const UpdateSubscriber1 = (subscriberId, data) => async (dispatch) => {
  const token = getToken();
  // let subscriberId = localStorage.getItem("Zept_UserId");
  try {
    const response = await AdminAPI.patch(
      `/subscribers/${subscriberId}`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.UPDATE_USER_DETAILS,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.UPDATE_USER_DETAILS,
      payload: err.response.data.message,
    });
  }
};

// Get Single Doctor & medical and other things

export const getSingleDocotor = (id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get("/doctors/" + id, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.GET_SINGLE_DOCTOR,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_SINGLE_DOCTOR,
      payload: err.response.data.message,
    });
  }
};

export const getSingleMedical = (id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get("/medicalCenters/" + id, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.GET_SINGLE_MEDICAL,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_SINGLE_MEDICAL,
      payload: err.response.data.message,
    });
  }
};

export const getSingleSubScriber = (id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get("/subscribers/" + id, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.GET_SINGLE_SUBSCRIBER,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_SINGLE_SUBSCRIBER,
      payload: err.response.data.message,
    });
  }
};

export const getSingleBenificary = (subid, beneid) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      `subscribers/${subid}/beneficiaries/${beneid}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: ActionTypes.GET_SINGLE_BENEFICIARY,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_SINGLE_BENEFICIARY,
      payload: err.response.data.message,
    });
  }
};

export const UpdateRelationShipMember =
  (data, subid, beneid) => async (dispatch) => {
    const token = getToken();
    try {
      const response = await AdminAPI.patch(
        // `/beneficiaries`,
        `subscribers/${subid}/beneficiaries/${beneid}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      dispatch({
        type: ActionTypes.UPDATE_BENEFICARY_RES,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ActionTypes.UPDATE_BENEFICARY_RES,
        payload: err?.response?.data?.message,
      });
    }
  };
