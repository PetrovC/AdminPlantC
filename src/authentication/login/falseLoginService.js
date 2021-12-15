//!/ faux login en attendant le déploiement du backend /!//
export const falseLoginService = {
    login: ({email, password}) => new Promise((resolve, reject) => {
        setTimeout(() => {
            if(email === 'admin@admin.com' && password === 'admin') {
                resolve('fakeToken');
            }
            else {
                reject('error');
            }
        }, 500);
    })
}