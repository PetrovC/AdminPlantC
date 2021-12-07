import store from './store'

export const checkStore = () =>{
    store.subscribe(() => {
        console.log('state updates')
        console.log(store.getState())
    })
}