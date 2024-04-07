<template>
    <el-form ref="formRef" :model="model" :rules="rules" label-width="auto" labelPosition="top">
        <el-form-item v-for="item in enConf" :label="item.label" :prop="item.name">
            <component class="w100" v-if="!item.options" :is="item.component" v-bind="item.extraProps" v-model="model[item.name]"
                :placeholder="`请输入${item.label}`" @keyup.enter="onEnter">
            </component>
            <component class="w100" v-else :is="item.component" v-bind="item.extraProps"
                v-model="model[item.name]" :placeholder="`请输入${item.label}`" @keyup.enter="onEnter">
                <component style="width:100%" :is="item.subComponent" v-for="(option, k) in options[item.name]" :label="option.label" :key="k" :value="option.value">
                   {{option.label}}
                </component>
            </component>

        </el-form-item>
        <slot></slot>
    </el-form>

</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
const props = defineProps(["conf", "initVal", "ref"]);
interface IEmits {
    (event: "onChange", ...args: any[]): void
    (event: "onEnter", ...args: any[]): void
};
const emits = defineEmits<IEmits>();
const model = ref(props.initVal);
const formRef = ref();
const { proxy } = getCurrentInstance();
watch(() => props.initVal, () => {
    model.value = Object.assign(model.value, props.initVal);
})
const options = ref({});

const enConf = computed(()=>{
    return props.conf.map(item=>{
        if(typeof item.options === "function"){
            const apiHander = item.options;
            const hander = item.optionsTransform;
            apiHander().then(res=>{
                if(res.code == 200){
                    if(typeof hander === "function"){
                        options.value[item.name] = hander(res.rows);
                    }else{
                        options.value[item.name] = res.rows;
                    }
                   
                }else{
                    proxy.$modal.msgError(res.msg || "获取数据失败");
                }
            })
            
        }else if(Array.isArray(item.options)){
            options.value[item.name] = item.options
        }
        return {
            ...item,
        }
    })
})


function onEnter() {
    emits("onEnter", model.value);
}
const rules = computed(() => {
    const rules = {};
    const conf = props.conf;
    conf.forEach((item: any) => {
        rules[item.name] = [
            {
                required: true, message: `请输入${item.label}`, trigger: 'blur'
            }
        ]
    })
    return rules;
})
function onChange() {
    emits("onChange", model.value);
}

function validate() {
    return formRef.value.validate()
}

function resetFields() {
    return formRef.value.resetFields();
}

function getData() {
    return model.value;
}

defineExpose({
    validate,
    resetFields,
    getData
})

</script>