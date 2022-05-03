export const services = {
    users: import.meta.env.VITE_USERS_SERVICE,
    casurid: import.meta.env.VITE_CASURID_SERVICE,
    academic: import.meta.env.VITE_ACADEMIC_SERVICE,
    lti: import.meta.env.VITE_LTI_SERVICE,
    ltiProvider: import.meta.env.VITE_LTI_PROVIDER_SERVICE,
};