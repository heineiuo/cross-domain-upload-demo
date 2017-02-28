import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Upload from 'rc-upload'

class App extends Component {
  state = {
    result: []
  };

  _onSuccess = (result) => {
    this.setState({result: result.result})
  };

  render(){
    const {result} = this.state;
    return (
      <div>
        {
          this.state.result.map(item => (
            <img src={item} alt="" key={item}/>
          ))
        }
        <div>
          <Upload
            action="http://127.0.0.1:8084/upload"
            onSuccess={this._onSuccess}
          >
            <button>
              {
                result.length > 0 ? '重新上传': '上传'
              }
            </button>
          </Upload>
        </div>

      </div>
    )
  }
}

const start = () => {
  ReactDOM.render(<App />, document.getElementById('app'));

};


start();
