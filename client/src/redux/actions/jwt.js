export const JWT_ADD = "JWT_ADD";
export const JWT_GET = "JWT_GET";
export const JWT_REMOVE = "JWT_REMOVE";


//Action Creator
export const jwtAdd = (token) => ({
   type: JWT_ADD,
   value: token
});

export const jwtGet = () => ({
    type: JWT_GET,
 });

export const jwtRemove = () => ({
    type: JWT_REMOVE
});