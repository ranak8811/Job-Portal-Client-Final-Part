import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://job-portal-server-for-recruiter-part3-liart.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  //   const { signOutUser } = useAuth();
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     axiosInstance.interceptors.response.use(
  //       (response) => {
  //         return response;
  //       },
  //       (error) => {
  //         console.log("Error caught in interceptor: ", error);

  //         if (error.status === 401 || error.status === 403) {
  //           console.log("need to logout the user");
  //           signOutUser()
  //             .then(() => {
  //               console.log("logged out user from axiox interceptor");
  //               navigate("/signIn");
  //             })
  //             .catch((error) => {
  //               console.log("error caught in interceptor: ", error);
  //             });
  //         }

  //         return Promise.reject(error);
  //       }
  //     );
  //   }, []);

  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("API response error status: ", error.status);
        if (error.status === 401 || error.status === 403) {
          signOutUser()
            .then(() => {
              // redirect back to login page
              navigate("/signIn");
            })
            .catch((error) => {
              console.log("Error caught in interceptor: ", error);
            });
        }

        return Promise.reject(error);
      }
    );
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;

/**
 * axios: get, post, put, delete functionality makes it easy to use
 *
 * interceptor:
 *                      (incepting here)
 * client --------------------|---------------------------> server
 *
 * server <--------------------|------------------------ client
 *
 * in the interceptor for responses == needs two functions
 */
