import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useIntl } from "react-intl";

import { useDispatch, useSelector } from "react-redux";

function Prescription() {
  const {} = useSelector((state) => state.fetchdata);
  const dispatch = useDispatch();
  const [filterview] = useState(true);
  const { formatMessage: covert } = useIntl();
  const [secondtable, setSecondTable] = useState(false);
  const [thirdtable, setThirdTable] = useState(false);
  useEffect(() => {
    // dispatch();
  }, []);
  return (
    <div>
      <div className="main-content">
        <div className="flter-section">
          <h3 className="fltr-drop">{covert({ id: "filter" })}</h3>
          <div className={filterview ? "mt-4" : "removefltr"}>
            <div className="slct-srt">
              <Row>
                <Col lg={6} md={6}>
                  <div className="flter d-inline">
                    <label> {covert({ id: "filter" })}</label>
                    <select>
                      <option value={""} selected>
                        {covert({ id: "filter" })}
                      </option>
                    </select>
                  </div>
                </Col>
                <Col lg={6} md={6}>
                  <div className="flter d-inline">
                    <label> {covert({ id: "filter" })}</label>
                    <select>
                      <option value={""} selected>
                        {covert({ id: "filter" })}
                      </option>
                    </select>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <div className="card-info-detl inr-dtl-medi">
          <Row>
            <Col md={secondtable && thirdtable ? 4 : secondtable ? 6 : 12}>
              <div className="data-tble medical-sub-tble nowrap p-3">
                <h3>{covert({ id: "Prescription List" })}</h3>
                <Table className="table-responsive">
                  <thead>
                    <tr>
                      <th>{covert({ id: "onlyid" })}</th>
                      <th>{covert({ id: "Prescription Title" })}</th>
                      <th>{covert({ id: "Uploaded" })}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr onClick={() => setSecondTable(!secondtable)}>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>09-04-2023</td>
                    </tr>

                    <tr onClick={() => setSecondTable(!secondtable)}>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>09-04-2023</td>
                    </tr>

                    <tr onClick={() => setSecondTable(!secondtable)}>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>09-04-2023</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>

            {secondtable && (
              <Col md={thirdtable ? 4 : 6} className="bx-new">
                <div className="data-tble medical-sub-tble nowrap p-3">
                  <div className="expl-img">
                    <img src={"/assets/images/explan-img.png"} alt="img" />
                  </div>

                  <div className="p-3">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                    </p>
                  </div>
                  <Table className="table-responsive">
                    <thead>
                      <tr>
                        <th>{covert({ id: "onlyid" })}</th>
                        <th> {covert({ id: "Pharmacy Name" })}</th>
                        <th> {covert({ id: "Total Price" })}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr onClick={() => setThirdTable(!thirdtable)}>
                        <td>8</td>
                        <td>1325478936</td>
                        <td>500</td>
                      </tr>

                      <tr onClick={() => setThirdTable(!thirdtable)}>
                        <td>8</td>
                        <td>1325478936</td>
                        <td>500</td>
                      </tr>

                      <tr onClick={() => setThirdTable(!thirdtable)}>
                        <td>8</td>
                        <td>1325478936</td>
                        <td>500</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            )}

            {thirdtable && (
              <Col md={4} className="bx-new">
                <div className="data-tble medical-sub-tble nowrap p-3">
                  <div className="p-3">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                    </p>
                  </div>
                  <Table className="table-responsive">
                    <thead>
                      <tr>
                        <th>{covert({ id: "onlyid" })}</th>
                        <th> {covert({ id: "MedicineName" })}</th>
                        <th> {covert({ id: "Total Price" })}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>8</td>
                        <td>1325478936</td>
                        <td>500</td>
                      </tr>

                      <tr>
                        <td>8</td>
                        <td>1325478936</td>
                        <td>500</td>
                      </tr>

                      <tr>
                        <td>8</td>
                        <td>1325478936</td>
                        <td>500</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Prescription;
