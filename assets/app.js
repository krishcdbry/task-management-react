class TodoApp extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
        projects : [],
        todo : [],
        progress : [],
        done : [],
        projectVal : '',
        mainover: {},
    }
  }

  clickHandle (e) {
    if (e.keyCode === 13  && e.target.value.length > 0) {
      let projects = this.state.projects;
      let todos = this.state.todo;
      projects.push(e.target.value);
      todos.push(e.target.value);
      this.setState({
        projects : projects,
        todo: todos,
        projectVal: ''
      })
    }
    else {
      this.setState({
        projectVal: e.target.value
      })
    }
  }

  dragOver(e) {
    this.setState({
      mainover : e.target.dataset
    });
  }

  render () {
    return (
      <div className="wholeApp">
        <div className="container">
          <div className="row">
              <h1> TodoApp </h1>
              Add Project :
              <input type="text"
              onChange={this.clickHandle.bind(this)}
              onKeyUp={this.clickHandle.bind(this)}
              value={this.state.projectVal}
              placeholder="Name"/>

              <br/><br/>
              <div className="count-bar">
                {this.state.projects.length} <br/> Projects
              </div>
            </div>
        </div>
        <div className="container todo-board">
          <div className="row" onDragOver={this.dragOver.bind(this)}>
              <div className="col-xs-4" data-type="todo">
                <div className="todo block" data-type="todo">
                  <div className="block-header" data-type="todo">
                    <h3 data-type="todo">To do </h3>
                    <div className="count-bar" data-type="todo">{this.state.todo.length} <br/> PROJECTS</div>
                  </div>
                  <div className="block-body" data-type="todo">
                    {
                      (function(thisEve) {
                        if (thisEve.state.todo.length < 1) {
                            return (
                              <center data-type="todo">
                                <h5 className="light" data-type="todo">No projects</h5>
                              </center>
                            );
                        } else {
                          return (
                            <ProjectItem
                            list={thisEve.state.todo}
                            over={thisEve.state.mainover}
                            id="todo">
                            </ProjectItem>
                          )
                        }
                      })(this)
                    }
                  </div>
                </div>
              </div>
              <div className="col-xs-4" data-type="progress">
                <div className="in-progress block" data-type="progress">
                    <div className="block-header" data-type="progress">
                      <h3 data-type="progress">  InProgress </h3>
                      <div className="count-bar" data-type="progress">{this.state.progress.length} <br/> PROJECTS</div>
                    </div>
                    <div className="block-body" data-type="progress">
                    {
                        (function(thisEve) {
                          if (thisEve.state.progress.length < 1) {
                              return (
                                <center data-type="progress">
                                  <h5 className="light" data-type="progress">No projects</h5>
                                </center>
                              );
                          } else {
                            return (
                              <ProjectItem
                              list={thisEve.state.progress}
                              over={thisEve.state.mainover}
                              id="progress">
                              </ProjectItem>
                            )
                          }

                        })(this)

                    }
                    </div>
                </div>
              </div>
              <div className="col-xs-4" data-type="done">
                <div className="done block" data-type="done">
                    <div className="block-header" data-type="done">
                      <h3 data-type="done">  Done </h3>
                      <div className="count-bar" data-type="done">{this.state.done.length} <br/> PROJECTS</div>
                    </div>
                    <div className="block-body" data-type="done">
                    {
                      (function(thisEve) {
                        if (thisEve.state.done.length < 1) {
                            return (
                              <center data-type="done">
                                <h5 className="light" data-type="done">No projects</h5>
                              </center>
                            );
                        } else {
                          return (
                            <ProjectItem
                            list={thisEve.state.done}
                            over={thisEve.state.mainover}
                            id="done">
                            </ProjectItem>
                          )
                        }

                      })(this)
                    }
                    </div>
                </div>
              </div>
          </div>
        </div>
        </div>
    )
  }
}

class ProjectItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      list : this.props.list,
      id: this.props.id
    }
  }

  dragEnd(e) {
      e.preventDefault();
      let parent = this._reactInternalInstance._currentElement._owner._instance;
      let parentState = parent.state;
      let source = this.dragged.dataset;
      let newList = this.state.list;
      let dest = this.props.over;

      if (Object.keys(this.props.over).length > 0) {
        if (this.props.over.type !== this.state.id) {
            newList.splice(source.id, 1);
            this.setState({
              list: newList
            })

            var destList = parentState[this.props.over.type];
            destList.splice(this.props.over.id, 0, source.elem);
            var listKey = this.props.over.type;
            parent.setState({
              listKey: destList
            })
        }
        else if (this.props.over.type === this.state.id) {
            dest = this.over.dataset;
            newList.splice(source.id, 1);
            newList.splice(dest.id, 0, source.elem);
            this.setState({
              list: newList
            })
        }
    }
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
  }

  dragOver(e) {
    this.over = e.target;
  }

  render () {
    return (
      <ul onDragOver={this.dragOver.bind(this)}>
        {this.state.list.map(function(item, index) {
          return (
            <li data-id={index}
            data-type={this.state.id}
            data-elem={item}
            key={index}
            draggable="true"
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)}>
              {item}
            </li>
            )
          }.bind(this))}
      </ul>
    )
  }
}

ReactDOM.render(
		<TodoApp/>,
		document.getElementById('root')
	);
