import axios from 'axios';

// 数据转换函数（改为 URLSearchParams）
const transformData = (data) => {
    return new URLSearchParams(data).toString();
};

// 创建通用请求配置
const createRequestConfig = (method, url, params, isLogin = false) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    if (!isLogin) {
        const token = localStorage.getItem('logintoken');
        if (token) {
            headers.token = token;
        }
    }

    return {
        method,
        url,
        headers,
        data: transformData(params) // 直接转换数据
    };
};

// 登录请求方法
const loginreq = async (method, url, params) => {
    try {
        const response = await axios(createRequestConfig(method, url, params, true));
        return response.data;
    } catch (error) {
        console.error('登录请求出错:', error?.response?.data || error.message);
        throw error;
    }
};

// 通用请求方法
const req = async (method, url, params) => {
    try {
        const response = await axios(createRequestConfig(method, url, params));
        return response.data;
    } catch (error) {
        console.error('通用请求出错:', error?.response?.data || error.message);
        throw error;
    }
};

export { loginreq, req };
