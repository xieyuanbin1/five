import { defineComponent, onMounted, reactive, ref } from "vue";
import { RouterView, useRouter } from 'vue-router';
import { Layout, LayoutSider, LayoutContent, Menu, MenuItem, LayoutHeader } from "ant-design-vue";
import { CarryOutOutlined } from "@ant-design/icons-vue";

import './index.less';

interface Nav {
  key: string;
  path: string;
  name: string;
}

export default defineComponent({
  name: 'Home',
  setup () {
    const item = ref<string[]>(['statistics']);
    const router = useRouter();

    onMounted(() => {
      router.push('/statistics')
    })

    const itemList = reactive<Nav[]>([
      {key: 'statistics', path: '/statistics', name: '统计看板'},
      {key: 'coach', path: '/coach', name: '教练'},
      {key: 'trainee', path: '/trainee', name: '学员'},
    ])

    function handleClickTab (tab: Nav) {
      console.log('tab::', tab)
      item.value[0] = tab.key
      router.push(tab.path)
    }

    return () => (
      <Layout hasSider class="main-layout">
        <LayoutSider class="w-layout-sider" style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} trigger={null}>
          <div class="logo"></div>
          <Menu selectedKeys={item.value} mode="inline" theme="dark">
            {
              itemList.map(tab => (
                <MenuItem key={tab.key} onClick={() => handleClickTab(tab)}>
                  <CarryOutOutlined />
                  <span class="nav-text">{tab.name}</span>
                </MenuItem>
              ))
            }
          </Menu>
        </LayoutSider>
        <Layout style={{ marginLeft: '200px' }}>
          <LayoutHeader style="background: #fff; padding: 0;">
          </LayoutHeader>
          <LayoutContent style={{margin: '20px 10px', padding: '24px', background: '#fff', minHeight: '500px', overflow: 'initial'}}>
            <RouterView />
          </LayoutContent>
        </Layout>
      </Layout>
    )
  }
})
