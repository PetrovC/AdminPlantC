// import axios from 'axios';
// import { useSelector } from "react-redux";

// const isLogged = useSelector(state => state.login.isLogged);
// const token = useSelector(state => state.login.token);

// export function jwtInterceptor() {
//     axios.interceptors.request.use(request => {
//         // add auth header with jwt if account is logged in and request is to the api url
//         const isApiUrl = request.url.startsWith(process.env.REACT_APP_API_URL);

//         if (isLogged  && isApiUrl) {
//             request.headers.common.Authorization = `Bearer ${token}`;
//         }

//         return request;
//     });
// }