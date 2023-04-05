import store from "@/redux/store";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ActionTypes } from "@/redux/actions/actionTypes";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Layout from "@/Layout";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    let auth = !!localStorage.getItem("Zept_Auth_token_User");
    if (!auth) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth < 1200) {
          // store.dispatch(SideBarFun(false));
          store.dispatch({
            type: ActionTypes.SIDEBAR_VALUE,
            payload: false,
          });
        } else {
          store.dispatch({
            type: ActionTypes.SIDEBAR_VALUE,
            payload: true,
          });
        }
      },
      true
    );
  }, []);

  return (
    <>
      {router?.pathname == "/login" ? (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      ) : (
        <Provider store={store}>
          {/* <div className="axyz">
            <Header />
            <Sidebar />
            <div className={`other-component ${sidebar ? "" : "com-pde"}`}>
              <Component {...pageProps} />
            </div>
          </div> */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      )}
    </>
  );
}
