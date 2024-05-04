import { Button, Form, FormInstance, FormItem, Input, Modal, Popconfirm, Select, SelectOption, Table, TableColumnsType, message } from "ant-design-vue";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { AddCoach, apiAddCoach, apiGetCoach, Coach } from "../../api/coach";

export default defineComponent({
  name: "Coach",
  setup () {
    const list = ref<Coach[]>([
      {
        id: "1",
        name: "伍晨",
        sex: 0,
        phone: "15191919892"
      }
    ])
    const loading = ref<boolean>(false)
    const addVisable = ref<boolean>(false)
    const record = reactive<AddCoach>({
      name: '',
      sex: 1,
      phone: ''
    })
    const formRef = ref<FormInstance>()
    const form = Form.useForm(formRef)

    onMounted(() => {
    })

    const columns: TableColumnsType<any> | undefined = [
      { title: 'ID', dataIndex: 'id', },
      { title: '姓名', dataIndex: 'name', },
      { title: '性别', dataIndex: 'sex', customRender({record}){ return (<span>{record.sex ? '男' : '女' }</span>) } },
      { title: '电话', dataIndex: 'phone', },
      { 
        title: '操作',
        dataIndex: 'operation',
        customRender({record}) {
          return (
            <div>
              <Button type={'link'}>查看学员</Button>
              <Popconfirm title="确认删除?" okText="确认" cancelText="取消" onConfirm={() => delCoach(record.id)}>
                <Button type={'link'}>删除</Button>
              </Popconfirm>
            </div>
          )
        }
      },
    ]

    async function delCoach(id: string) {
      // TODO: 删除教练
      getCoach()
    }

    async function getCoach() {
      loading.value = true
      const data = await apiGetCoach()
      loading.value = false
      list.value = data as any
    }

    async function handleAddCoach () {
      try {
        console.log('form::', form)
        await apiAddCoach(record)
        addVisable.value = false
        getCoach()
      } catch (error) {
        message.error(error as any)
      }
    }

    return () => (
      <div class="expenditure-box">
        <Modal
          open={addVisable.value}
          title="添加教练"
          okText="添加"
          cancelText="取消"
          destroyOnClose
          onOk={handleAddCoach}
          onCancel={() => addVisable.value = false}>
            <Form ref="formRef" model={record} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} name="add_record">
                <FormItem label="姓名">
                  <Input value={record.name} onInput={(e) => (record.name = e.target.value as string)} />
                </FormItem>
                <FormItem label="性别" rules={{ required: true, message: '请选择性别' }}>
                  <Select value={record.sex} onChange={(value: any) => (record.sex = value)}>
                    <SelectOption value={1}>男</SelectOption>
                    <SelectOption value={0}>女</SelectOption>
                  </Select>
                </FormItem>
                <FormItem label="手机号">
                  <Input value={record.phone} onInput={(e) => (record.phone = e.target.value as string)} />
                </FormItem>
              </Form>
        </Modal>
        <div class="expenditure-controller">
            <Button type="primary" onClick={() => addVisable.value = true}>添加</Button>
          </div>
        <Table columns={columns} dataSource={list.value} pagination={false} loading={loading.value} bordered></Table>
      </div>
    )
  }
})
