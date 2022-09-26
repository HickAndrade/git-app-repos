'use strict'

import React, { Component } from 'react'
import AppContent from './components/app-content'
import ajax from '@fdaciuk/ajax'

class App extends Component {
  constructor () {
    super()
    this.state = {
      userinfo: null,
      repos: [],
      starred: [],
      isFetching: false
    }
    this.handleSearch = this.handleSearch.bind(this)
  }
  
  getGithubApiURL (username, type ) {
    const internalUser = username ? `/${username}`:''
    const tpRep = type ? `/${type}` : ''
    return `https://api.github.com/users${internalUser}${tpRep}`
  }

  handleSearch(e) {
    const key = e.which || e.keyCode
    const content = e.target.value

    if (key === 13) {
      this.setState({ isFetching: true, userinfo: null })
      ajax().get(this.getGithubApiURL(content)).then((result) =>{
        this.setState({
          userinfo: {
            username: result.name,
            photo: result.avatar_url,
            login:result.login,
            repos: result.public_repos,
            followers:result.followers,
            following: result.following
          },
          repos:[],
          starred:[]
        })
      }).always(() => this.setState({ isFetching: false }))
    }
  }

  getRepos(type) { 
  return () =>{
    const content = this.state.userinfo.login
      ajax().get(this.getGithubApiURL( content, type ))
      .then((result) =>{ 
        this.setState({
          [type]: result.map((repo) =>({
              name: repo.name,
              link: repo.html_url
          }))
        })
      })
    }
  }
  
  render () {
    return (
      <AppContent
       {...this.state}
        handleSearch={this.handleSearch}
        getRepos={this.getRepos('repos')}
        getStarred={this.getRepos('starred')}
      />
    )
  }
}

export default App
