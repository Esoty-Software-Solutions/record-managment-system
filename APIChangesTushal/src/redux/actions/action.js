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
    cancelled
  ) =>
  async (dispatch) => {
    // let pending = null;
    // let completed = completed;
    // let booked = booked;
    // let cancelled = null;
    const token = getToken();
    // if (status === "pending") {
    //   pending = true;
    //   completed = false;
    //   booked = false;
    //   cancelled = false;
    // }
    // if (status === "booked") {
    //   pending = false;
    //   completed = false;
    //   booked = true;
    //   cancelled = false;
    // }

    // if (status === "cancelled") {
    //   pending = false;
    //   completed = false;
    //   booked = false;
    //   cancelled = true;
    // }

    // if (status === "completed") {
    //   pending = false;
    //   completed = true;
    //   booked = false;
    //   cancelled = false;
    // }
    try {
      const response = await AdminAPI.get(
        `/appointments?limit=${limit}&skip=${skip}&medicalCenterId=${healthID}&${
          pending
            ? `pending=${pending}&completed=${completed}&booked=${booked}&cancelled=${cancelled}`
            : completed
            ? `pending=${pending}&completed=${completed}&booked=${booked}&cancelled=${cancelled}`
            : booked
            ? `pending=${pending}&completed=${completed}&booked=${booked}&cancelled=${cancelled}`
            : cancelled
            ? `pending=${pending}&completed=${completed}&booked=${booked}&cancelled=${cancelled}`
            : ""
        }

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
        payload: err.response.data.message,
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

export const UpdateAppointment = (appointmentId, type) => async (dispatch) => {
  const token = getToken();
  try {
    const response = await AdminAPI.post(
      `appointments/${appointmentId}`,
      {
        appointmentStatus: type,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: ActionTypes.UPDATE_APPOINTMENT_LIST, payload: response });
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
  formData.append("city", values?.city);
  formData.append("district", values?.district);
  formData.append("description", values.description);
  formData.append("address", values?.address);
  // formData.append("email","user@example.com")
  formData.append("facebookLink", values?.facbooklink);
  formData.append("website", values?.weblink);
  for (let i = 0; i < file.length; i++) {
    formData.append("image", file[i]);
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
      payload: err?.response?.data?.message,
    });
  }
};
export const UpdateMedicals =
  (values, mainmobile, file, id) => async (dispatch) => {
    const token = getToken();

    const formData = new FormData();
    formData.append("name", values?.centername);
    formData.append("city", values?.city);
    formData.append("district", values?.district);
    formData.append("description", values.description);
    formData.append("address", values?.address);
    // formData.append("email","user@example.com")
    formData.append("facebookLink", values?.facbooklink);
    formData.append("website", values?.weblink);
    for (let i = 0; i < file.length; i++) {
      formData.append("image", file[i]);
    }
    for (let i = 0; i < mainmobile.length; i++) {
      formData.append("phoneNumber", mainmobile[i]);
    }
    // formData.append(    googleMapLink: "string")

    try {
      const response = await AdminAPI.post(`/medicalCenters/${id}`, formData, {
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
        `/doctors?skip=${skip}&limit=${limit}&specialty=${specialty}&searchQuery=${
          searchQuery !== undefined ? searchQuery : ""
        }`,
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
        payload: err?.response?.data?.message,
      });
    }
  };

export const DoctorListForForm = () => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(`/doctors`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.GET_DOCTOR_LIST_FORM,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_DOCTOR_LIST_FORM,
      payload: err.response.data.message,
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
        middleName: values.middle,
        lastName: values.last,
        specialty: values.specialty,
        level: values.level,
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
      type: ActionTypes.ADD_DOCTOR_RES,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ADD_DOCTOR_RES,
      payload: err.response.data.message,
    });
  }
};

export const CityList = () => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      // "/cities",
      "/misc/cities",
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
      payload: err.response.data.message,
    });
  }
};

export const MedicalSpecialList = () => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get("/misc/medicalSpecialties", {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.GET_MEDICAL_SPECIAL_LIST_RESPONSE,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_MEDICAL_SPECIAL_LIST_RESPONSE,
      payload: err.response.data.message,
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
    const response = await AdminAPI.post(`/schedules/${scheduleId}`, data, {
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

export const GetSchedulesByDoctor = (id) => async (dispatch) => {
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

export const GetAdmistratotUserList = (skip, limit) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(`/users?limit=${limit}&skip=${skip}`, {
      headers: {
        Authorization: token,
      },
    });
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
      payload: err.response.data.message,
    });
  }
};

export const UpdateDoc = (values, id) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post(
      `/doctors/${id}`,
      {
        firstName: values.first,
        middleName: values.middle,
        lastName: values.last,
        specialty: values.specialty,
        level: values.level,
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

export const BenefeciaryList = (limit, skip) => async (dispatch) => {
  const token = getToken();
  try {
    const response = await AdminAPI.get(
      `/subscribers?limit=${limit}&skip=${skip}`,
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
      payload: err.response.data.message,
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
      payload: err.response.data.message,
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

export const ReltationShipBeneficary = () => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      // "/relationshipToBeneficiaryEnum",
      "/misc/relationshipToBeneficiaryEnum",
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

export const GenderList = () => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      // "/cities",
      "/misc/genderEnum",
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
      payload: err.response.data.message,
    });
  }
};

export const AddHelathreportClinicalVisits =
  (data, bene_id) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.post(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/clinicalVisits`,
        // `/beneficiaries/${bene_id}/medicalFiles/familyMembers/tushar`,

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
  (bene_id, family_id) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.post(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/allergies`,
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

export const AddHelathreportSurgeryHistories =
  (bene_id, family_id) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.post(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/surgeryHistories`,
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

export const AddHelathreportChronicDiseases =
  (bene_id, family_id) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.post(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/chronicDiseases`,
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

export const AddHelathreportMedicalTests =
  (bene_id, family_id) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.post(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/medicalTests`,
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

export const FamilyMemberAllergies =
  (bene_id, family_id) => async (dispatch) => {
    const token = getToken();

    try {
      const response = await AdminAPI.get(
        `/subscribers/${bene_id}/beneficiaries/${family_id}/medicalFiles/allergies`,
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

export const AddReltationShipBeneficary = (data) => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.post(
      // "/relationshipToBeneficiaryEnum",
      "/misc/relationshipToBeneficiaryEnum",
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

export const getMedicalService = () => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get(
      // "/relationshipToBeneficiaryEnum",
      "/misc/medicalServices",
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

export const getAppointmentStatus = () => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get("/misc/appointmentStatusEnum", {
      headers: {
        Authorization: token,
      },
    });
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

export const getTimeSlotEnum = () => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get("/misc/timeSlotEnum", {
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: ActionTypes.GET_TIMESLOT_LIST,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.GET_TIMESLOT_LIST,
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

export const getAccountstatusEnum = () => async (dispatch) => {
  const token = getToken();

  try {
    const response = await AdminAPI.get("/misc/accountStatusEnum", {
      headers: {
        Authorization: token,
      },
    });
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

export const UpdateUserDetail = (subscriberId, data) => async (dispatch) => {
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
