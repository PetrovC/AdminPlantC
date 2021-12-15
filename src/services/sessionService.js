export const sessionService = {
    login: ({email, password}) => new Promise((resolve, reject) => {
        setTimeout(() => {
            if(email === 'admin' && password === 'admin') {
                resolve('fakeToken');
            }
            else {
                reject();
            }
        }, 500);
    })
}