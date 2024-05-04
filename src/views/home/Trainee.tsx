import { Button, Form, FormItem, Input, Modal, Popconfirm, Select, SelectOption, Table, TableColumnsType } from "ant-design-vue";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { AddCategory, Category, apiAddCategory, apiDeleteCategory, apiGetCategory } from "../../api/category";

export default defineComponent({
  name: "Trainee",
  setup () {
    const list = ref<Category[]>([])
    const loading = ref<boolean>(false)
    const addVisable = ref<boolean>(false)
    const record = reactive<AddCategory>({
      name: '',
      code: '',
      type: 0,
    })

    const columns: TableColumnsType<any> | undefined = [
      { title: 'ID', dataIndex: 'id', },
      // { title: '类型码', dataIndex: 'category', },
      { title: '名称', dataIndex: 'name', },
      { title: '编码', dataIndex: 'code', },
      { title: '类型', dataIndex: 'type', customRender:({record}) => (record.type == 1?'收入':'支出') },
      { 
        title: '操作',
        dataIndex: 'operation',
        customRender({record}) {
          return (
            <Popconfirm title="确认删除?" okText="确认" cancelText="取消" onConfirm={() => delCategory(record.id)}>
              <a>delete</a>
            </Popconfirm>
          )
        }
      },
    ]

    onMounted(() => {
      getCategory()
    })

    async function delCategory (id: number) {
      await apiDeleteCategory(id)
      getCategory()
    }

    async function getCategory() {
      loading.value = true
      const data = await apiGetCategory()
      loading.value = false
      list.value = data.data as any
    }

    async function handleAddCategory () {
      console.log('record::', record)
      await apiAddCategory(record)
      addVisable.value = false
      getCategory()
    }

    return () => (
      <div>
        <Modal
          open={addVisable.value}
          title="记一笔"
          okText="添加"
          cancelText="取消"
          destroyOnClose
          onOk={handleAddCategory}
          onCancel={() => addVisable.value = false}>
            <Form ref="formRef" model={record} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} name="add_record">
                <FormItem label="名称">
                  <Input value={record.name} onInput={(e) => (record.name = e.target.value as string)} />
                </FormItem>
                <FormItem label="分类" rules={{ required: true, message: '请选择分类' }}>
                  <Select value={record.type} onChange={(value: any) => (record.type = value)}>
                    <SelectOption value={0}>支出</SelectOption>
                    <SelectOption value={1}>收入</SelectOption>
                  </Select>
                </FormItem>
                <FormItem label="编码">
                  <Input value={record.code} onInput={(e) => (record.code = e.target.value as string)} />
                </FormItem>
                
              </Form>
        </Modal>
        <div class="expenditure-controller">
            <Button type="primary" onClick={() => addVisable.value = true}>新增分类</Button>
          </div>
        <Table columns={columns} dataSource={list.value} pagination={false} loading={loading.value} bordered></Table>
      </div>
    )
  }
})
