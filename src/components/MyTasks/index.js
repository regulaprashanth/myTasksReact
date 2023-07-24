import {Component} from 'react'
import {v4 as uniqueId} from 'uuid'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    newTaskList: [],
    taskName: '',
    taskTag: tagsList[0].displayText,
    activeTabId: '',
    isTabActive: false,
    filteredList: [],
  }

  onChangeTaskCategory = event => {
    this.setState({taskTag: event.target.value})
  }

  onChangeTaskName = event => {
    this.setState({taskName: event.target.value})
  }

  onSubmitNewTask = event => {
    event.preventDefault()
    const {taskName, taskTag} = this.state
    const newTaskItem = {
      id: uniqueId(),
      TaskName: taskName,
      category: taskTag,
    }
    this.setState(prevState => ({
      newTaskList: [...prevState.newTaskList, newTaskItem],
      taskName: '',
      taskTag: tagsList[0].displayText,
    }))
  }

  onClickTagButton = event => {
    const {activeTabId, newTaskList} = this.state
    const currentActiveTab =
      activeTabId === event.target.value ? '' : event.target.value
    const currentTabStatus =
      activeTabId === event.target.value ? 'false' : 'true'
    const updatedTaskList = newTaskList.filter(
      eachNewTask =>
        eachNewTask.category.toLowerCase() === currentActiveTab.toLowerCase(),
    )
    const updatedFilteredList =
      currentActiveTab === '' ? newTaskList : updatedTaskList
    this.setState({
      filteredList: updatedFilteredList,
      activeTabId: currentActiveTab,
      isTabActive: currentTabStatus,
    })
  }

  renderNewList = () => {
    const {newTaskList} = this.state
    return newTaskList.length > 0 ? (
      <ul>
        {newTaskList.map(eachNewTask => (
          <li className="taskListCard" key={eachNewTask.id}>
            <p className="taskName">{eachNewTask.TaskName}</p>
            <div className="tagCard">
              <p>{eachNewTask.category}</p>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <div className="noTasksContainer">
        <p className="noTasksParagraph">No Tasks Added Yet</p>
      </div>
    )
  }

  renderFilteredList = () => {
    const {filteredList} = this.state

    return filteredList.length > 0 ? (
      <ul>
        {filteredList.map(eachFilteredTask => (
          <li className="taskListCard" key={eachFilteredTask.id}>
            <p className="taskName">{eachFilteredTask.TaskName}</p>
            <div className="tagCard">
              <p>{eachFilteredTask.category}</p>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <div className="noTasksContainer">
        <p className="noTasksParagraph">No Tasks Added Yet</p>
      </div>
    )
  }

  render() {
    const {
      newTaskList,
      taskName,
      taskTag,
      isTabActive,
      activeTabId,
    } = this.state

    console.log(newTaskList)
    console.log(isTabActive)
    return (
      <div className="appContainer">
        <form className="taskInputContainer" onSubmit={this.onSubmitNewTask}>
          <h1 className="formHeader">Create a task!</h1>
          <label className="label" htmlFor="taskInput">
            Task
          </label>
          <input
            className="taskNameInput"
            type="text"
            id="taskInput"
            value={taskName}
            onChange={this.onChangeTaskName}
            placeholder="Enter the task here"
          />
          <label htmlFor="options" className="label">
            Tags
          </label>
          <select
            id="options"
            className="selectOptionContainer"
            onChange={this.onChangeTaskCategory}
            value={taskTag}
          >
            {tagsList.map(eachTag => (
              <option selected key={eachTag.optionId}>
                {eachTag.displayText}
              </option>
            ))}
          </select>
          <button className="addTaskButton" type="submit">
            Add Task
          </button>
        </form>
        <div className="tasksContainer">
          <h1 className="tagsListHeading">Tags</h1>
          <ul className="tagsListContainer">
            {tagsList.map(eachTaskTag => (
              <li key={eachTaskTag.optionId}>
                <button
                  type="button"
                  className={
                    activeTabId === eachTaskTag.optionId
                      ? 'activeButton'
                      : 'inactiveButton'
                  }
                  value={eachTaskTag.optionId}
                  onClick={this.onClickTagButton}
                >
                  {eachTaskTag.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1 className="tasksListHeading">Tasks</h1>
          {activeTabId === ''
            ? this.renderNewList()
            : this.renderFilteredList()}
        </div>
      </div>
    )
  }
}
export default MyTasks
