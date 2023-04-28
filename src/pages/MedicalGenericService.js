import React, { useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useIntl } from "react-intl";

import { useSelector } from "react-redux";

function MedicalGenericService() {
  const {} = useSelector((state) => state.fetchdata);
  const { formatMessage: covert } = useIntl();
  const [filterview] = useState(true);

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
                    <label>{covert({ id: "filter" })}</label>
                    <select>
                      <option value={""} selected>
                        Filter
                      </option>
                    </select>
                  </div>
                </Col>
                <Col lg={6} md={6}>
                  <div className="flter d-inline">
                    <label>{covert({ id: "filter" })}</label>
                    <select>
                      <option value={""} selected>
                        Filter
                      </option>
                    </select>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="card-info-detl">
          <Row>
            <Col md={12}>
              <div className="crd-info">
                <h3>
                  {covert({ id: "Info Card" })}
                  <span className="float-end">
                    <button>{covert({ id: "onlyImport" })}</button>
                  </span>
                </h3>
                <ul className="crd-dtl">
                  <li>
                    <span>Subscriber Id :</span> 24324324
                  </li>
                  <li>
                    <span> Patient Name :</span> Patient Name
                  </li>
                  <li>
                    <span> Claim ID :</span> 4567
                  </li>
                  <li>
                    <span> Service Date :</span> 2/21/2023
                  </li>
                  <li>
                    <span> Gender :</span> Male
                  </li>
                  <li>
                    <span> Age :</span> 32
                  </li>
                  <li>
                    <span> Medical Center :</span> Medical Center Name
                  </li>
                  <li>
                    <span>Institution :</span> Institution Name
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
        <div className="card-info-detl inr-dtl-medi">
          <Row>
            <Col md={6}>
              <div className="data-tble medical-sub-tble nowrap p-3">
                <h3>{covert({ id: "medicalgenericList" })}</h3>
                <Table className="table-responsive">
                  <thead>
                    <tr>
                    
                    
                    
                      <th>{covert({ id: "onlyid" })}</th>
                      <th>{covert({ id: "Service ID" })}</th>
                      <th>{covert({ id: "Service Name" })}</th>
                      <th>{covert({ id: "Service Code" })}</th>
                      <th>{covert({ id: "Section Code" })}</th>
                      <th>{covert({ id: "Service Type" })}</th>
                      <th>{covert({ id: "who code" })}</th>
                      <th>{covert({ id: "Max Price" })}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>Internal Medicine Junior</td>
                      <td>S01010101001</td>
                      <td>S01010101</td>
                      <td>2</td>
                      <td>NULL</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>Internal Medicine Junior</td>
                      <td>S01010101001</td>
                      <td>S01010101</td>
                      <td>2</td>
                      <td>NULL</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>Internal Medicine Junior</td>
                      <td>S01010101001</td>
                      <td>S01010101</td>
                      <td>2</td>
                      <td>NULL</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>Internal Medicine Junior</td>
                      <td>S01010101001</td>
                      <td>S01010101</td>
                      <td>2</td>
                      <td>NULL</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>Internal Medicine Junior</td>
                      <td>S01010101001</td>
                      <td>S01010101</td>
                      <td>2</td>
                      <td>NULL</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>Internal Medicine Junior</td>
                      <td>S01010101001</td>
                      <td>S01010101</td>
                      <td>2</td>
                      <td>NULL</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>Internal Medicine Junior</td>
                      <td>S01010101001</td>
                      <td>S01010101</td>
                      <td>2</td>
                      <td>NULL</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>Internal Medicine Junior</td>
                      <td>S01010101001</td>
                      <td>S01010101</td>
                      <td>2</td>
                      <td>NULL</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>Internal Medicine Junior</td>
                      <td>S01010101001</td>
                      <td>S01010101</td>
                      <td>2</td>
                      <td>NULL</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>Internal Medicine Junior</td>
                      <td>S01010101001</td>
                      <td>S01010101</td>
                      <td>2</td>
                      <td>NULL</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>Internal Medicine Junior</td>
                      <td>S01010101001</td>
                      <td>S01010101</td>
                      <td>2</td>
                      <td>NULL</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>1325478936</td>
                      <td>Internal Medicine Junior</td>
                      <td>S01010101001</td>
                      <td>S01010101</td>
                      <td>2</td>
                      <td>NULL</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col md={6} className="bx-new">
              <div className="data-tble medical-sub-tble nowrap p-3">
                <h3>{covert({ id: "medicalgenericList" })}</h3>
                <Table className="table-responsive">
                  <thead>
                    <tr>
                      <th>{covert({ id: "dali" })}</th>
                      <th>{covert({ id: "Service Code" })}</th>
                      <th>{covert({ id: "Service Name" })} </th>
                      <th>{covert({ id: "Service Date" })} </th>
                      <th>{covert({ id: "Total Price" })}</th>
                      <th>{covert({ id: "Cash" })}</th>
                      <th>{covert({ id: "Deferred" })}</th>
                      <th>{covert({ id: "workInjury" })}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>871-6</td>
                      <td>Ms000000076</td>
                      <td>Service Name</td>
                      <td>05/01/2023</td>
                      <td>2</td>
                      <td>0.5</td>
                      <td>1.5</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>871-6</td>
                      <td>Ms000000076</td>
                      <td>Service Name</td>
                      <td>05/01/2023</td>
                      <td>2</td>
                      <td>0.5</td>
                      <td>1.5</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>871-6</td>
                      <td>Ms000000076</td>
                      <td>Service Name</td>
                      <td>05/01/2023</td>
                      <td>2</td>
                      <td>0.5</td>
                      <td>1.5</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>871-6</td>
                      <td>Ms000000076</td>
                      <td>Service Name</td>
                      <td>05/01/2023</td>
                      <td>2</td>
                      <td>0.5</td>
                      <td>1.5</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>871-6</td>
                      <td>Ms000000076</td>
                      <td>Service Name</td>
                      <td>05/01/2023</td>
                      <td>2</td>
                      <td>0.5</td>
                      <td>1.5</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>871-6</td>
                      <td>Ms000000076</td>
                      <td>Service Name</td>
                      <td>05/01/2023</td>
                      <td>2</td>
                      <td>0.5</td>
                      <td>1.5</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>871-6</td>
                      <td>Ms000000076</td>
                      <td>Service Name</td>
                      <td>05/01/2023</td>
                      <td>2</td>
                      <td>0.5</td>
                      <td>1.5</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>871-6</td>
                      <td>Ms000000076</td>
                      <td>Service Name</td>
                      <td>05/01/2023</td>
                      <td>2</td>
                      <td>0.5</td>
                      <td>1.5</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>871-6</td>
                      <td>Ms000000076</td>
                      <td>Service Name</td>
                      <td>05/01/2023</td>
                      <td>2</td>
                      <td>0.5</td>
                      <td>1.5</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>871-6</td>
                      <td>Ms000000076</td>
                      <td>Service Name</td>
                      <td>05/01/2023</td>
                      <td>2</td>
                      <td>0.5</td>
                      <td>1.5</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>871-6</td>
                      <td>Ms000000076</td>
                      <td>Service Name</td>
                      <td>05/01/2023</td>
                      <td>2</td>
                      <td>0.5</td>
                      <td>1.5</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>871-6</td>
                      <td>Ms000000076</td>
                      <td>Service Name</td>
                      <td>05/01/2023</td>
                      <td>2</td>
                      <td>0.5</td>
                      <td>1.5</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default MedicalGenericService;
