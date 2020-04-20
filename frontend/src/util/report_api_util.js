import axios from 'axios';

export const getReports = reports => {
    return axios.get('api/reports', reports)
};

export const getReport = reportId => {
    return axios.get(`api/reports/${reportId}`)
};

export const postReport = report => {
    return axios.post('api/reports', report)
};

