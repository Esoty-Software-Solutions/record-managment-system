import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Modal, Row, Col } from "react-bootstrap"
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';
import { UpdateMedicals } from '../../redux/actions/action';
import ErrorComponent from '../../Utils/ErrorComponent';



function UpdateMedical(props) {
    const dispatch = useDispatch()
    const mobiledata = props.medicaldata?.phoneNumber?.map((val) => {
        return { mobile: val };
    });
    console.log("props", props?.medicaldata?.medicalCenterId);
    const [file, setFile] = useState([]);
    const [files, setFiles] = useState([]);

    function uploadSingleFile(e) {
        let ImagesArray = Object.entries(e.target.files).map((e) =>
            URL.createObjectURL(e[1])
        );
        setFile([...file, ...ImagesArray]);
        if (e.target.files.length == "1") {
            setFiles((pre) => [...pre, e.target.files[0]]);
        } else {
            setFiles((pre) => [...pre, ...e.target.files]);
        }
    }

    function deleteFile(e) {
        const s = file.filter((item, index) => index !== e);
        const sa = files.filter((item, index) => index !== e);
        setFile(s);
        setFiles(sa);
    }

    const handleSubmit = (values) => {
        const mobilenumber = values?.phone?.map((ssa, s) => {
            return ssa.mobile;
        });
        dispatch(
            UpdateMedicals(
                values,
                mobilenumber,
                files,
                props?.medicaldata?.medicalCenterId
            )
        );

        props.onHide();
        // setTimeout(() => {
        // }, 1500);
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
                    <h4>Update Institution</h4>
                    <Row>
                        <Col md={3}>
                            <form>
                                <div className="upld-img-section">
                                    <div className="form-group">
                                        <img src={"/assets/images/upload-img-1.svg"} alt="img" />
                                        <input
                                            type="file"
                                            disabled={file.length === 5}
                                            className="form-control"
                                            onChange={uploadSingleFile}
                                            multiple
                                        />
                                    </div>
                                </div>
                                <div className="form-group preview">
                                    {file.length > 0 &&
                                        file.map((item, index) => {
                                            return (
                                                <div className="up-img-slct" key={item}>
                                                    <img src={item} alt="" />
                                                    <button
                                                        className="dtl-img-btn"
                                                        type="button"
                                                        onClick={() => deleteFile(index)}
                                                    >
                                                        <img src={"/assets/images/dltee-img.svg"} alt="img" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                </div>
                            </form>
                        </Col>
                        <Col md={9}>
                            <Formik
                                initialValues={{
                                    centername: props.medicaldata?.name,
                                    address: props.medicaldata?.address,
                                    district: props.medicaldata?.district,
                                    city: props.medicaldata?.city,
                                    description: props.medicaldata?.description,
                                    facbooklink: props.medicaldata?.facebookLink,
                                    weblink: props.medicaldata?.website,
                                    phone: mobiledata,
                                }}
                                onSubmit={handleSubmit}
                                // validationSchema={MedicalForm}
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
                                    <div className="add-denefi-marker">
                                        <div className="add-form p-0">
                                            <form id="form-data" onSubmit={handleSubmit}>
                                                <Row>
                                                    <Col md={6}>
                                                        <div className="form-group">
                                                            <label>Center Name </label>
                                                            <input
                                                                type="text"
                                                                placeholder="Center name"
                                                                name="centername"
                                                                value={values.centername}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                        </div>
                                                        <ErrorComponent
                                                            error={
                                                                errors.centername &&
                                                                touched.centername &&
                                                                errors.centername
                                                            }
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="form-group">
                                                            <label>Address </label>
                                                            <input
                                                                type="text"
                                                                name="address"
                                                                value={values.address}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="Address"
                                                            />
                                                        </div>
                                                        <ErrorComponent
                                                            error={
                                                                errors.address &&
                                                                touched.address &&
                                                                errors.address
                                                            }
                                                        />
                                                    </Col>

                                                    <Col md={6}>
                                                        <div className="form-group">
                                                            <label>District </label>
                                                            {/* <select
                                  name="district"
                                  value={values.district}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option value="" selected>
                                    --Select District--
                                  </option>
                                  <option value="ajmer">Ajmer</option>
                                  <option value="jaipur">Jaipur</option>
                                </select> */}

                                                            <input
                                                                type="text"
                                                                placeholder="District Name"
                                                                name="district"
                                                                value={values.district}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                        </div>
                                                        <ErrorComponent
                                                            error={
                                                                errors.district &&
                                                                touched.district &&
                                                                errors.district
                                                            }
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="form-group">
                                                            <label>City </label>
                                                            <select
                                                                name="city"
                                                                value={values.city}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            >
                                                                <option value="" selected>
                                                                    --Select City--
                                                                </option>
                                                                {props?.cityNames &&
                                                                    props?.cityNames?.map((vas, i) => (
                                                                        <option key={i}>{vas?.cityName}</option>
                                                                    ))}
                                                            </select>
                                                        </div>
                                                        <ErrorComponent
                                                            error={
                                                                errors.city && touched.city && errors.city
                                                            }
                                                        />
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className="form-group">
                                                            <label>Description </label>
                                                            <textarea
                                                                rows="3"
                                                                name="description"
                                                                value={values.description}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            ></textarea>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        {/* <div className="form-group">
                                <label>Contact </label>
                                {mainmobile
                                  ? mainmobile?.map((val, index) => (
                                      <div className="cntct-add">
                                        <input
                                          type="text"
                                          name="phone"
                                          value={val.mobile}
                                          onChange={(e) =>
                                            handlePhoneNumber(e, index)
                                          }
                                          placeholder="9856325478"
                                        />
                                        {mainmobile.length >= 2 ? (
                                          <img
                                            src={Indlt}
                                            alt="img"
                                            onClick={deleteRow}
                                            className="delete-img"
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    ))
                                  : ""}

                                <button
                                  className="add-cont-btn"
                                  onClick={addNewRow}
                                >
                                  {" "}
                                  + Add
                                </button>
                              </div> */}

                                                        <div className="form-group">
                                                            <label>Contacts </label>
                                                            <FieldArray name="phone">
                                                                {(props) => {
                                                                    const { push, remove, form } = props;
                                                                    const { values } = form;
                                                                    const { phone } = values;

                                                                    return (
                                                                        <div>
                                                                            {phone?.map((numbers, is) => (
                                                                                <>
                                                                                    <div className="cntct-add" key={is}>
                                                                                        <Field
                                                                                            type="text"
                                                                                            name={`phone.${is}.mobile`}
                                                                                            value={numbers.mobile}
                                                                                            // onChange={handleChange}
                                                                                            placeholder="9856325478"
                                                                                        />
                                                                                        {phone.length >= 2 ? (
                                                                                            <img
                                                                                                src={"/assets/images/in-dlt.svg"}
                                                                                                alt="img"
                                                                                                onClick={() => remove(is)}
                                                                                                className="delete-img"
                                                                                            />
                                                                                        ) : (
                                                                                            ""
                                                                                        )}
                                                                                    </div>
                                                                                    <ErrorMessage
                                                                                        component="span"
                                                                                        className="error-class"
                                                                                        name={`phone.${is}.mobile`}
                                                                                    />
                                                                                    {/* <ErrorComponent
                                              error={
                                                errors.phone &&
                                                touched.phone &&
                                                errors.phone
                                              }
                                            /> */}
                                                                                </>
                                                                            ))}
                                                                            <button
                                                                                className="add-cont-btn"
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    push({ mobile: "" });
                                                                                }}
                                                                            >
                                                                                {" "}
                                                                                + Add
                                                                            </button>
                                                                        </div>
                                                                    );
                                                                }}
                                                            </FieldArray>
                                                        </div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className="form-group social-link">
                                                            <img src={"/assets/images/facebook-10.svg"} alt="img" />
                                                            <input
                                                                name="facbooklink"
                                                                value={values.facbooklink}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                type="text"
                                                                placeholder="https://sdfsadfdsafdsafdsafsad"
                                                            />
                                                        </div>
                                                        <ErrorComponent
                                                            error={
                                                                errors.facbooklink &&
                                                                touched.facbooklink &&
                                                                errors.facbooklink
                                                            }
                                                        />
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className="form-group social-link">
                                                            <img src={"/assets/images/web-icon.svg"} alt="img" />
                                                            <input
                                                                name="weblink"
                                                                value={values.weblink}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                type="text"
                                                                placeholder="https://sdfsadfdsafdsafdsafsad"
                                                            />
                                                        </div>
                                                        <ErrorComponent
                                                            error={
                                                                errors.weblink &&
                                                                touched.weblink &&
                                                                errors.weblink
                                                            }
                                                        />
                                                    </Col>
                                                </Row>
                                            </form>
                                        </div>
                                    </div>
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
                    <button type="submit" form="form-data" className="add-fmy-btn">
                        Update
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
export default UpdateMedical