module.exports = class {
    constructor(options){
        console.log("开始初始化自定义模块");
        this.options = options;
    }
    async init(){
        console.log("执行init方法",this.options);
        this.projectInfo = {
            ...this.options,
            dependencies:{
                "axios": "^0.21.0",
                "cli-spinner": "^0.2.10",
                "dotenv": "^8.2.0",
            },
            
        }
    }
}