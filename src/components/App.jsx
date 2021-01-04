import React, { Component } from 'react';
// axiosをインポート
import axios from 'axios';
import Article from "./Article";

class App extends Component {
    constructor(props) {
        super(props);
        this.getQiitaPosts = this.getQiitaPosts.bind(this);
        this.state = {
            /*
                // ここを`React`など検索したいワードに変えられる
                query: 'user:chihiroyn'
             */
            }
    }

    // QiitaAPIを叩く
    getQiitaPosts() {
        const env = process.env
        const token = env.REACT_APP_QIITA_TOKEN
        // TODO: アクセストークン付きでAPIを呼べるようにはなったが、大量にエラーが出ている。
        // 「Rendar title of articles.」コミットでは出ていないので、その後の改修を確認してエラーの原因を調査する。
        //axios.get(APIのエンドポイント,パラメータの引数)
        axios.get('https://qiita.com/api/v2/users/chihiroyn/items', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                "page": "1",
                "per_page": "20",
//                "query": this.state.query,
            }
        })
            // response にAPIからのレスポンスが格納される
            .then((response) => {
                this.setState({
                    articles: response.data
                });
                // コンソールから response と title と url を確認
                console.debug(response, "ressponse");
                console.debug(this.state.title, "title")
                console.debug(this.state.url, "url")
            })
            .catch((error) => {
                console.debug(error);
            });
    }

    // 表示されるHTMLを記述
    render() {
        return (
            <div className="App">
                <h1 className="app-title">Hello Qiita API</h1>
                {
                    (this.state.articles != null) && (
                        this.state.articles.map((article, index) => (
                            <li key={{index}}>
                                {article.title}
                            </li>
                        ))
                    )
                }
                <Article />
                <Article />
                <p>タイトル: {this.state.title}</p>
                <p>URL: <a target="__blank" href={this.state.url}>{this.state.url}</a></p>
                <input
                    type="button"
                    value="検索"
                    onClick={() => this.getQiitaPosts()}
                />
            </div>
        )
    }
}

export default App;
