import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      quiz: [],
    }
  }

  componentDidMount() {
    this.fetchQuizzes()
  }

  fetchQuizzes() {
    fetch('http://localhost:3001/quizzes', {
      // mode: 'no-cors',
    })
    .then(response => response.json())
    .then(data => this.setState({quiz: data.quizzes[0]}))
  }

  scoreKeep(e, score) {
    console.log(score, 'score')
  }

  loadQuestions() {
    if (this.state.quiz.questions) {
    return this.state.quiz.questions.map((quiz, i) => {
    return <div key={i}>
        <header>{quiz.title}</header>
        <ul>
        {quiz.answers.map((answer, i) => {
          return <div key={i}><input type='radio' value='On' checked={false} onChange={(e) => this.scoreKeep(e, answer.score)} />
          <label>{answer.title}</label></div>
        })}
        </ul>
      </div>
    })
  }
  }

  render() {
    const { quiz } = this.state
    return (
    <div>
    <header>{quiz.title}</header>
    {this.loadQuestions()}
    </div>
   )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
