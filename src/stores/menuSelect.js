import {defineStore} from 'pinia'
export const useMenuSelectStore = defineStore(
    'MenuSelectStore',
    {
        //状态管理
        state:()=>({
            keyPath:['/home']
        }),
        //修改状态的方法
        actions:{
            setKeyPath(path){
                this.keyPath = path;
            },
            getKeyPath(){
                return this.keyPath;
            }
        }
    }
)