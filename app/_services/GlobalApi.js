
const { default: axios } = require('axios')

const postInterview = (data) => axios.post('/api/postInterview', data)

const getCompany = () => axios.get('/api/getCompanies')

const getCompanyStudents = (company) => axios.get(`/api/getCompanyStudents/${company}`);

const getInterviewExperience = (company, name) => axios.get(`/api/getCompanyStudents/${company}/${name}`);

const CreateNewUser = (data) => axios.post('/api/user', data)

const LoginUser = (data) => axios.post('/api/login', data);

const GetUserData = (token) => {
    return axios.get('/api/getUserData', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const UpdateUser = (data, token) => {

    return axios.put('/api/updateUser', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const FetchSkills=()=>axios.get('/api/fetchSkills')

const FetchPackage=()=>axios.get('/api/fetchPackage')

const Predict = async(file) => {
    const formData = new FormData();
    formData.append('resume', file);

    return axios.post('/api/predict', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const PostQuery = (data, token) => {
    return axios.post('/api/postQuery', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const GetAllQueries = () => {
    return axios.get('/api/getAllQueries');
};

const PostReply = (queryId, message, token) => {
    return axios.post(`/api/postReply/${queryId}`, { message }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const GenerateCareerRoadmap = (formData, token) => {
    return axios.post('/api/career-roadmap', { formData }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export default {
    postInterview,
    getCompany,
    getCompanyStudents,
    getInterviewExperience,
    CreateNewUser,
    LoginUser,
    GetUserData,
    UpdateUser,
    FetchSkills,
    FetchPackage,
    Predict,
    PostQuery,
    GetAllQueries,
    PostReply,
    GenerateCareerRoadmap
}