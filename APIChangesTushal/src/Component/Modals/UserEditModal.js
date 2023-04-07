import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import { UpdateUserDetail } from "../../redux/actions/action";
import ErrorComponent from "../../Utils/ErrorComponent";

function UserEditModal(props) {
  const [userrole, setUserRole] = useState(
    props?.userinfo?.userRole ? props?.userinfo?.userRole : []
  );
  // const [role, setRole] = useState([]);
  const dispatch = useDispatch();

  const UpdateDetails = (values) => {
    console.log("val",values)
    dispatch(UpdateUserDetail(props?.userinfo?._id, values));
    // setTimeout(() => {

    // }, 1500);
    // props.onHide();
  };
  console.log("prop", props?.userinfo);
  let data = [
    {
      id: "1",
      role: "general",
    },
    {
      id: "2",
      role: "doctor",
    },
    {
      id: "3",
      role: "nurse",
    },
    {
      id: "3",
      role: "pateint",
    },
    {
      id: "4",
      role: "Clerk",
    },
    {
      id: "5",
      role: "medical-staff",
    },
  ];

  const setRoles = (e) => {
    e.preventDefault();
    if (userrole?.length == 0) {
      setUserRole([e.target.value]);
    } else {
      setUserRole((pre) => [...pre, e.target.value]);
    }
  };

  console.log("role",  props?.userinfo);

  const removeRole = (e, data) => {
    e.preventDefault();
    setUserRole((current) => current.filter((rolelist) => rolelist !== data));
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="add-medi-cntr"
    >
      <Modal.Body className="p-0 ">
        <div className="add-new-bene institution">
          <h4>Update User</h4>
          <Row>
            <Col md={12}>
              <Formik
                initialValues={{
                  username: props?.userinfo?.username,
                  email: props?.userinfo?.email ? props?.userinfo?.email : null,
                  firstName: props?.userinfo?.firstName,
                  secondName: props?.userinfo?.secondName,
                  thirdName: props?.userinfo?.thirdName,
                  lastName: props?.userinfo?.lastName,
                  phoneNumber: props?.userinfo?.phoneNumber
                    ? props?.userinfo?.phoneNumber
                    : "",
                  birthdate: props?.userinfo?.birthdate,
                  // gender: props?.userinfo?.gender
                  //   ? props?.userinfo?.gender
                  //   : "",
                  instituionId: props?.userinfo?.instituionId,
                
                  doctorId: props.userinfo?.doctorId
                    ? props.userinfo?.doctorId
                    : null,
                  subscriberId: props.userinfo?.subscriberId
                    ? props.userinfo?.subscriberId
                    : null,
                  auxiliaryCenterId: props.userinfo?.auxiliaryCenterId
                    ? props.userinfo?.auxiliaryCenterId
                    : null,
                }}
                onSubmit={UpdateDetails}
                // validationSchema={DoctorForm}
                enableReinitialize
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form
                    className="inpt-fld"
                    id="form-datass"
                    onSubmit={handleSubmit}
                  >
                    <div className="prt-fmr">
                      <Row>
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>User Name</label>
                            <input
                              placeholder="username123"
                              name="username"
                              value={values.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>First Name</label>
                            <input
                              placeholder="firstName"
                              name="firstName"
                              value={values.firstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>Second Name</label>
                            <input
                              placeholder="Secondname"
                              name="secondName"
                              value={values.secondName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>Third Name</label>
                            <input
                              placeholder="Thirdname"
                              name="thirdName"
                              value={values.thirdName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>Last Name</label>
                            <input
                              placeholder="Lastname"
                              name="lastName"
                              value={values.lastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>Birth Date</label>
                            <input
                              type="date"
                              name="birthdate"
                              value={values.birthdate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>Doctor Id</label>
                            <input
                              placeholder="Doctor"
                              name="doctorId"
                              value={values.doctorId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>
                        <Col lg={4} md={6}>
                          {/* <div className="form-group">
                            <label>Organization</label>
                            <input
                              placeholder="Alvin Hospital"
                              // value={userinfo?.username}
                            />
                          </div> */}
                          <div className="form-group">
                            <label>Instituion Id</label>
                            <input
                              placeholder="Alvin Hospital"
                              name="instituionId"
                              value={values.instituionId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>

                        {/* <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>Benefeciary Id</label>
                            <input
                              type="text"
                              placeholder="Benefeciary Id"
                              value={props?.userinfo?.beneficiaryId}
                            />
                          </div>
                        </Col> */}
                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>Subscriber Id</label>
                            <input
                              type="text"
                              placeholder="subscriber Id"
                              name="subscriberId"
                              value={values.subscriberId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input
                              placeholder="1235-452-567"
                              name="phoneNumber"
                              value={values.phoneNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <img
                              className="inpt-img"
                              src={"/assets/images/accept-mob.svg"}
                              alt="img"
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              placeholder="demo@gmail.com"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <img
                              className="inpt-img"
                              src={"/assets/images/accept-mob.svg"}
                              alt="img"
                            />
                          </div>
                        </Col>

                        <Col lg={4} md={6}>
                          <div className="form-group">
                            <label>AuxileryCenter Id</label>
                            <input
                              placeholder="1235-452-567"
                              name="auxiliaryCenterId"
                              value={values.auxiliaryCenterId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </Col>
                        {/* <Col md={4}>
                          {userrole?.length > 0 && (
                            // <div className="orgn-tags mt-4">
                            //   <ul>
                            //     {userrole &&
                            //       userrole?.map((val, i) => <li>{val}</li>)}
                            //   </ul>
                            // </div>

                            <div className="prt-fmr">
                              <div className="orgn-tags edt-tags">
                                {userrole &&
                                  userrole?.map((val, is) => (
                                    <label className="multipal-slt" key={is}>
                                      {val}{" "}
                                      <img
                                        className="img-fluid mt-4"
                                        src={"/assets/images/sl-close.svg"}
                                        alt="img"
                                        onClick={(e) => removeRole(e, val)}
                                      />
                                    </label>
                                  ))}
                              </div>
                            </div>
                          )} */}

                        {/* <div className="tag-inpt">
                            <select onChange={(e) => setRoles(e)}>
                              <option value="" selected>
                                --Select Role--
                              </option>
                              {data &&
                                data?.map((val, ind) => (
                                  <option
                                    value={val.role}
                                    disabled={userrole?.includes(val?.role)}
                                  >
                                    {val?.role}
                                  </option>
                                ))}
                            </select>
                          </div> */}
                        {/* </Col> */}
                      </Row>
                    </div>
                  </form>
                )}
              </Formik>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="can-sve mt-0">
          <button onClick={props.onHide} className="cls-btn-btn">
            Cancel
          </button>
          <button className="add-fmy-btn" type="submit" form="form-datass">
            Update
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default UserEditModal;
