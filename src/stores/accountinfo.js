import {defineStore} from 'pinia'
export const useAccountInfoStore = defineStore(
    'AccountInfoStore',
    {
        //状态管理
        state:()=>({
            accountInfo:{}
        }),
        //修改状态的方法
        actions:{
            setAccountInfo(accountInfo){
                this.accountInfo = accountInfo
            },
            getAccountInfo(){
                return this.accountInfo
            }
        }
    }
)