import { loginreq, req } from './axiosFun';

// 登录接口
export const login = (params) => {
    return loginreq("post", "/api/login", params)
        .catch(error => {
            console.error('登录请求出错:', error);
            throw error;
        });
};

// 获取用户菜单
export const menu = (params) => {
    return req("get", "/api/menu", params)
        .catch(error => {
            console.error('获取菜单请求出错:', error);
            throw error;
        });
};

// 退出接口
export const loginout = () => {
    return req("delete", "/api/login", {})
        .catch(error => {
            console.error('退出请求出错:', error);
            throw error;
        });
};