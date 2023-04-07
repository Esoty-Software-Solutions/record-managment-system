import { ActionTypes } from "../actions/actionTypes";
const initialState = {
  Login_res: "",
  data_res: "",
  medica_res: "",
  update_res: "",
  medical_list: "",
  medical_special_list: "",
  get_doctor_list: "",
  city_list: "",
  add_doctor_res: "",
  add_medical_res: "",
  update_medical_res: "",
  update_doctor_res: "",
  schedule_res_doctor: "",
  schedule_res_medical: "",
  get_user_information: "",
  add_admist_user_res: "",
  cretate_schedule_res: "",
  update_schedule_res: "",
  admist_usr_list: "",
  benef_list: "",
  add_benef_res: "",
  add_instition_res: "",
  cretate_schedule_res_schdule: "",
  schdule_update_list: "",
  create_schdeule_Res_to_doctor: "",
  delete_schedule: "",
  delete_schedule_one_by_one: "",
  institution_list: "",
  sidebar: true,
  beneficary_relation_list: "",
  health_issue_family_member: "",
  health_issue_family_res: "",
  logout_res: "",
  genderList: "",
  delete_city_res: "",
  add_city_Res: "",
  add_medicalspeciality_Res: "",
  add_relation_res: "",
  add_gender_res: "",
  medicalService_list: "",
  add_medical_servie_res: "",
  appointment_List: "",
  add_appointment_Res: "",
  time_Slot_list: "",
  add_time_slot_res: "",
  get_account_list: "",
  add_account_status_Res: "",
  update_user_res: "",
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_LOGIN_RESPONSE:
      return { ...state, Login_res: payload };
    default:
      return state;
  }
};

export const Fetchdata = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_DATA_RESPONSE:
      return { ...state, data_res: payload };
    case ActionTypes.GET_TIMESLOT_LIST:
      return { ...state, time_Slot_list: payload };
    case ActionTypes.GET_ACCOUNTSTATUS_LIST:
      return { ...state, get_account_list: payload };

    case ActionTypes.GET_DATA_MEDICAL_RESPONSE:
      return { ...state, medica_res: payload };

    case ActionTypes.GET_MEDICAL_LIST_RESPONSE:
      return { ...state, medical_list: payload };

    case ActionTypes.GET_MEDICAL_SPECIAL_LIST_RESPONSE:
      return { ...state, medical_special_list: payload };

    case ActionTypes.GET_DOCTOR_LIST:
      return { ...state, get_doctor_list: payload };

    case ActionTypes.GET_DOCTOR_LIST_FORM:
      return { ...state, get_doctor_list_form: payload };

    case ActionTypes.GET_CITY_LIST:
      return { ...state, city_list: payload };

    case ActionTypes.SIDEBAR_VALUE:
      return { ...state, sidebar: payload };
    case ActionTypes.GET_SCHEDULES_RES_MEDICAL:
      return { ...state, schedule_res_medical: payload };

    case ActionTypes.GET_SCHEDULES_RES_DOCTOR:
      return { ...state, schedule_res_doctor: payload };

    case ActionTypes.GET_USER_INFORMATION:
      return { ...state, get_user_information: payload };
    case ActionTypes.GET_USER_ADMIS_LIST:
      return { ...state, admist_usr_list: payload };
    case ActionTypes.GET_BENE_LIST:
      return { ...state, benef_list: payload };
    case ActionTypes.GET_SCHEDULES_RES_DOCTOR_SCHEDULE:
      return { ...state, schdule_update_list: payload };
    case ActionTypes.GET_INSTITUTION_LIST:
      return { ...state, institution_list: payload };
    case ActionTypes.BENE_RETALTION_LIST:
      return { ...state, beneficary_relation_list: payload };
    case ActionTypes.HEALTH_ISSUE_FAMILY_MEMBER:
      return { ...state, health_issue_family_member: payload };
    case ActionTypes.GET_GENDER_LIST:
      return { ...state, genderList: payload };
    case ActionTypes.GET_MEDICAL_SERVICE_LIST:
      return { ...state, medicalService_list: payload };
    case ActionTypes.GET_APPOINTMENT_LIST:
      return { ...state, appointment_List: payload };
    default:
      return state;
  }
};
export const submitform = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_TIMESLOT_LIST:
      return { ...state, add_time_slot_res: payload };
    case ActionTypes.ADD_MEDICAL_SERVICE_RES:
      return { ...state, add_medical_servie_res: payload };
    case ActionTypes.ADD_BENE_RETALTION_LIST:
      return { ...state, add_relation_res: payload };
    case ActionTypes.ADD_GENDER_RES:
      return { ...state, add_gender_res: payload };
    case ActionTypes.UPDATE_APPOINTMENT_LIST:
      return { ...state, update_res: payload };
    case ActionTypes.ADD_MEDIACLSPECILAITY_RES:
      return { ...state, add_medicalspeciality_Res: payload };
    case ActionTypes.ADD_DOCTOR_RES:
      return { ...state, add_doctor_res: payload };
    case ActionTypes.UPDATE_DOCTOR_RES:
      return { ...state, update_doctor_res: payload };
    case ActionTypes.ADD_MEDICAL_RES:
      return { ...state, add_medical_res: payload };
    case ActionTypes.UPDATE_MEDICAL_RES:
      return { ...state, update_medical_res: payload };
    case ActionTypes.ADD_USER_RES:
      return { ...state, add_admist_user_res: payload };
    case ActionTypes.CREATE_SCHEDULE_API_RES:
      return { ...state, cretate_schedule_res: payload };
    case ActionTypes.CREATE_SCHEDULE_API_RES_SCHEDULE:
      return { ...state, cretate_schedule_res_schdule: payload };
    case ActionTypes.UPDATE_SCHEDULE_API_RES:
      return { ...state, update_schedule_res: payload };
    case ActionTypes.ADD_INSTITUTION_ITEM:
      return { ...state, add_instition_res: payload };
    case ActionTypes.ADD_BENEFICIARY_DATA:
      return { ...state, add_benef_res: payload };
    case ActionTypes.CREATE_SCHEDULE_API_RES_SCDHULE:
      return { ...state, create_schdeule_Res_to_doctor: payload };
    case ActionTypes.DELETE_SCHEDULE_RES:
      return { ...state, delete_schedule: payload };
    case ActionTypes.DELETE_SCHEDULE_RES_ONE_BY_ONE:
      return { ...state, delete_schedule_one_by_one: payload };
    case ActionTypes.ADD_HEALTH_ISSUE_FAMILY_MEMBER:
      return { ...state, health_issue_family_res: payload };
    case ActionTypes.DELETE_CITY_RES:
      return { ...state, delete_city_res: payload };
    case ActionTypes.LOGOUT_RES:
      return { ...state, logout_res: payload };
    case ActionTypes.ADD_CITY_RES:
      return { ...state, add_city_Res: payload };
    case ActionTypes.ADD_APPOINTMENT_RES:
      return { ...state, add_appointment_Res: payload };
    case ActionTypes.ADD_APPOINTMENT_RES:
      return { ...state, add_appointment_Res: payload };
    case ActionTypes.ADD_ACCOUNT_STATUS_LIST:
      return { ...state, add_account_status_Res: payload };
    case ActionTypes.UPDATE_USER_DETAILS:
      return { ...state, update_user_res: payload };
    default:
      return state;
  }
};
