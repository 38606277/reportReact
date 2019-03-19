import React        from 'react';
import { Link, Redirect } from 'react-router-dom';
import DictService         from '../../service/DictService.jsx'
import { Form, Col, message,Button, Upload,Card,Row, Icon } from 'antd';
import LocalStorge  from '../../util/LogcalStorge.jsx';
const localStorge = new LocalStorge();
const FormItem = Form.Item;
const _dict = new DictService();
import './upload.scss';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const url=window.getServerUrl()+"/reportServer/uploadFile/uploadFile";
//const fileList = [];

// const props = {
//   action: url,
//   listType: 'picture',
//   headers:{
//     credentials: JSON.stringify(localStorge.getStorage('userInfo') || '')
//   },
//   defaultFileList: [...fileList],
// };
function beforeUpload(file) {
  let isJPG=false;
 // const isJPG = file.type === 'image/jpeg';
  if(file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif'){
    isJPG=true;
  }
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
class UploadInfo extends React.Component{
    state = {
      loading: false,
      fileList: []
    };
    handleChange = (info) => {
      console.log(info);
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        // getBase64(info.file.originFileObj, imageUrl => this.setState({
        //   imageUrl,
        //   loading: false,
        // }));
      }
    }
  
 //初始化加载调用方法
    componentDidMount(){
      
    }
   render() {
    const fileList=this.state.fileList;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div id="page-wrapper">
      <Row>
        <Col xs={24} sm={24}>
        <Link to="/upload">返回</Link>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24}>
          <Upload 
              accept={"image/*"}
              listType='picture'
              beforeUpload={beforeUpload}
              action={url}
              headers={{
                credentials: JSON.stringify(localStorge.getStorage("userInfo") || "")}
              }
              defaultFileList={[...fileList]}
              onChange={this.handleChange}
          >
            <Button>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>
          </Col>
        </Row>
      </div>
    );
  }
}
export default UploadInfo;