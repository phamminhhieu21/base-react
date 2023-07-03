import {UserOutlined, SecurityScanOutlined} from '@ant-design/icons';
import Information from '../components/nav/Information';
import Security from '../components/nav/Security';
const itemTabs = [
  {
    title: 'Information',
    content: <Information/>,
    _label : <span><UserOutlined/> Information</span>
  },
  {
    title: 'Security',
    content: <Security/>,
    _label : <span><SecurityScanOutlined/> Security</span>
  },
];
export default itemTabs;