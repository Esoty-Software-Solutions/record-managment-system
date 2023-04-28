import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { DropdownButton, Dropdown, Button, ButtonGroup } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { LogoutAPI, SideBarFun } from "../redux/actions/action";
import Link from "next/link";
import { useIntl } from "react-intl";

const Header = () => {
  const dispatch = useDispatch();
  const { formatMessage: covert } = useIntl();
  const router = useRouter();
  const { sidebar } = useSelector((state) => state.fetchdata);
  const { logout_res } = useSelector((state) => state.submitdata);

  const CallActions = () => {
    dispatch(SideBarFun(!sidebar));
  };

  const Logout = (e) => {
    e.preventDefault();
    dispatch(LogoutAPI());
    localStorage.clear();
    router.push("/login");
  };
  useEffect(() => {
    if (logout_res) {
      if (logout_res?.data?.statusCode == "200") {
        localStorage.clear();
        router.push("/login");
      } else {
        localStorage.clear();
        router.push("/login");
      }
    }
    return () => {
      dispatch({ type: "LOGOUT_RES", payload: "" });
    };
  }, [logout_res]);
  const { locale, locales } = useRouter();
  return (
    <div>
      <div className="header">
        <div className="text-srch">
          <div className="menu-icn">
            {sidebar ? (
              <img
                src={"/assets/images/menu-1.svg"}
                alt="img"
                onClick={CallActions}
              />
            ) : (
              <span onClick={CallActions}>
                {" "}
                <img src={"/assets/images/menu-icon.svg"} alt="img" />
              </span>
            )}
          </div>
          <img src={"/assets/images/logo-1.svg"} alt="img" />
        </div>
        <div className="noti-mst-uer text-srch">
          <form>
            <input type="text" placeholder={covert({id:"Search"})} />
            <img src={"/assets/images/srch-1.svg"} alt="img" />
          </form>

          <div className="msg-icn">
            <img src={"/assets/images/noti-1.svg"} alt="img" />
          </div>
          <div className="profile-drpdn">
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle
                className="norml-btn-bt"
                id="dropdown-autoclose-true"
              >
                {/* <div className="user-profile">
                  <span>{locale}</span>
                </div> */}
              </Dropdown.Toggle>
              {/* <Dropdown.Menu>
                {locales?.map((val, i) => (
                  <Dropdown.Item
                    key={i}
                    // onClick={()=>localStorage.setItem("Lang",val)}
                  >
                    <Link href="#" locale={val}>
                      {val}
                    </Link>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu> */}
            </Dropdown>
          </div>

          <div class="lang">
            {/* <a href="ar.html" class="ara_eng arabic">
              Ar
            </a>
            <a href="/" class="ara_eng english active">
              En
            </a> */}

            {locales?.map((val, i) => (
              <Link
                href="#"
                className={val == "ar" ? "arabic ara_eng" : "ara_eng english"}
                id ={locale==val ?"active":""}
                locale={val}
              >
                {val}
              </Link>
            ))}
          </div>

          <div className="profile-drpdn">
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle
                className="norml-btn-bt"
                id="dropdown-autoclose-true"
              >
                <div className="user-profile">
                  <span>John Doe</span>
                  <img src={"/assets/images/drop-down.svg"} alt="img" />
                  <div className="img-usr">
                    <img src={"/assets/images/profile.png"} alt="img" />
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Profile</Dropdown.Item>
                <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
                {/* <span >Logout</span> */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
