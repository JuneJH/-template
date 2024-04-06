import { FC, ReactNode, useEffect, useState } from 'react';
import style from './index.less';
import {
  Col,
  Row,
  Form,
  Select,
  Input,
  Space,
  Button,
  DatePicker,
  InputNumber,
} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';


const { RangePicker } = DatePicker;

export interface IconditionConf {
  label: string | ReactNode;
  dataIndex: string;
  type: string;
  initValue: any;
  dataType?: string;
  option?: any;
}

interface IProps {
  conditionConf: IconditionConf[];
  options?: any;
  expandBtnOffset?: number;
}

function FormItems({ conditionConf, defualtSpan, options }: any) {
  //默认antd组件只传基础配置，其余都通过option配置
  const getDom = (item: any) => {
    if (item.type === 'select') {
      let optionSelect = item.option || '';
      if (typeof optionSelect === 'string') {
        optionSelect = options[optionSelect] || [];
      }
      const d = optionSelect.map((item: any) => (
        <Select.Option
          value={item.value || item.dic_value}
          key={item.value || item.dic_value}
        >
          {item.label || item.dic_label}
        </Select.Option>
      ));
      return (
        <Select allowClear placeholder={`请选择${item.label}`}>
          <Select.Option value={''}>全部</Select.Option>
          {d}
        </Select>
      );
    } else if (item.type === 'rangePicker') {
      return (
        <RangePicker
          style={{ width: '100%' }}
          allowClear
          placeholder={[`开始${item.label}`, `结束${item.label}`]}
          {...item?.option}
        />
      );
    } else if (item.type === 'date') {
      return (
        <DatePicker
          style={{ width: '100%' }}
          allowClear
          placeholder={`请选择${item.label}`}
          {...item?.option}
        />
      );
    } else if (item.type === 'inputNumber') {
      return (
        <InputNumber
          style={{ width: '100%' }}
          placeholder={`请输入${item.label}`}
          {...item?.option}
        />
      );
    } else {
      return (
        <Input
          allowClear
          placeholder={`请输入${item.label}`}
          {...item?.option}
        />
      );
    }
  };

  return conditionConf.map((item: any) => (
    <Col key={item.dataIndex} span={item.span || defualtSpan}>
      <Form.Item name={item.dataIndex} label={item.label}>
        {getDom(item)}
      </Form.Item>
    </Col>
  ));
}

const CollapseCondition: FC<IProps & any> = ({
  conditionConf,
  options,
  onSearchHandle,
  condition,
  initCondition,
  subResetAfter,
  expandBtnOffset = 0,
}) => {
  //栅格占位格数
  const defualtSpan: number = 4;
  //是否展开
  const [expand, setExpand] = useState(false);
  //显示的表单项
  const [showCondition, setShowCondition] = useState<any>([]);
  const [instanceForm] = Form.useForm();

  useEffect(() => {
    subResetAfter(()=>{
      instanceForm.resetFields();
    })
    return () => {
      
    }
  }, [instanceForm])
  

  //获取显示表单项
  useEffect(() => {
    let num: number = 0,
      _showCondition: any = [];
    conditionConf.forEach((item: any) => {
      num += item.span || defualtSpan;
      if (num < 24) _showCondition.push(item);
    });

    setShowCondition(_showCondition);
  }, [conditionConf]);

  return (
    <div className={`${style.conditonContainer}`}>
      <Form
        name="conditionFrom"
        form={instanceForm}
        layout="vertical"
        colon={false}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ ...initCondition.current }}
        onFinish={(values: any) => {
          condition = { ...condition, ...values };
          onSearchHandle({ ...condition });
        }}
      >
        <Row gutter={[16, 0]}>
          <FormItems
            defualtSpan={defualtSpan}
            condition={condition}
            options={options}
            conditionConf={expand ? conditionConf : showCondition}
          />
          <Col
            span={defualtSpan}
            offset={expand ? expandBtnOffset : 0}
            style={{
              textAlign:
                conditionConf?.length > showCondition?.length
                  ? 'right'
                  : 'left',
              paddingTop: expandBtnOffset == 20 && expand ? '0' : '30px',
            }}
          >
            <Space size={5}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                onClick={() => {
                  instanceForm.resetFields();
                  condition = JSON.parse(JSON.stringify(initCondition.current));
                  onSearchHandle({ ...initCondition.current });
                }}
              >
                重置
              </Button>
              {conditionConf?.length > showCondition?.length && (
                <a
                  style={{ fontSize: 12 }}
                  onClick={() => {
                    setExpand(!expand);
                  }}
                >
                  {!expand ? (
                    <>
                      <DownOutlined /> 展开
                    </>
                  ) : (
                    <>
                      <UpOutlined /> 收起
                    </>
                  )}
                </a>
              )}
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default CollapseCondition;
