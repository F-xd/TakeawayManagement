import {defineStore} from 'pinia'
export const useTestStore = defineStore(
    'TestStore',
    {
        //状态管理
        state:()=>({
            number:0
        }),
        //修改状态的方法
        actions:{
            setNumber(num){
                this.number = num;
            },
            getNumber(){
                return this.number;
            }
        }
    }
)