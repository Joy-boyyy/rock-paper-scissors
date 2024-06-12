import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {RiCloseLine} from 'react-icons/ri'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const result = {success: 'ascending', wrong: 'descending', draw: 'common'}

class App extends Component {
  state = {
    yourChoice: '',
    opponentChoice: '',
    isTrue: true,
    cntNum: '0',
    datLocator: '',
  }

  playAgainBtn = () => {
    this.setState({isTrue: true})
  }

  renderResult = message => {
    const {yourChoice, opponentChoice} = this.state

    const myChoice = choicesList.find(
      filterProp => filterProp.id === yourChoice,
    )
    const oppChoice = choicesList.find(
      filterProp => filterProp.id === opponentChoice,
    )

    return (
      <div className="successResultToggle">
        <div className="resultDivToShow">
          <div className="drawMargin">
            <p className="myClr">YOU</p>
            <img
              src={myChoice.imageUrl}
              alt="your choice"
              className="imgPlay"
            />
          </div>
          <div className="drawMargin">
            <p className="myClr">OPPONENT</p>
            <img
              src={oppChoice.imageUrl}
              alt="opponent choice"
              className="imgPlay"
            />
          </div>
        </div>
        <div className="playAgainBtn">
          <h1 className="message">{message}</h1>
          <button
            type="button"
            onClick={this.playAgainBtn}
            className="play-agin"
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  resultFun = ID => {
    const randomSelection = Math.floor(Math.random() * 3)
    const systemSelect = choicesList[randomSelection].id

    let datLocator = ''
    let cntNumChange = 0

    if (ID === systemSelect) {
      datLocator = 'common'
    } else if (
      (ID === 'ROCK' && systemSelect === 'SCISSORS') ||
      (ID === 'PAPER' && systemSelect === 'ROCK') ||
      (ID === 'SCISSORS' && systemSelect === 'PAPER')
    ) {
      datLocator = 'ascending'
      cntNumChange = 1
    } else {
      datLocator = 'descending'
      cntNumChange = -1
    }

    this.setState(prevData => ({
      isTrue: false,
      yourChoice: ID,
      opponentChoice: systemSelect,
      cntNum: parseInt(prevData.cntNum) + cntNumChange,
      datLocator,
    }))
  }

  playGround = () => (
    <PlayGroundComponent allData={choicesList} resultFun={this.resultFun} />
  )

  resultSection = () => {
    const {datLocator} = this.state
    switch (datLocator) {
      case result.success:
        return this.renderResult('YOU WIN')
      case result.wrong:
        return this.renderResult('YOU LOSE')
      case result.draw:
        return this.renderResult('IT IS DRAW')
      default:
        return null
    }
  }

  render() {
    const {isTrue, cntNum} = this.state
    return (
      <div className="parentDiv">
        <div className="navSec">
          <div className="navSecChild">
            <ul>
              <p className="myClr">ROCK</p>
              <p className="myClr">PAPER</p>
              <p className="myClr">SCISSORS</p>
            </ul>
            <div className="countingDetail">
              <p>Score</p>
              <h1>{cntNum}</h1>
            </div>
          </div>
        </div>
        <div>{isTrue ? this.playGround() : this.resultSection()}</div>
        <div className="popupRUleDiv">
          <Popup
            modal
            trigger={
              <button type="button" className="ruleBtn">
                RULES
              </button>
            }
          >
            {close => (
              <div>
                <div>
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => close()}
                  >
                    <RiCloseLine />
                  </button>
                </div>
                <div className="ruleDivCl">
                  <img
                    className="rulesImg"
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                  />
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default App

const PlayGroundComponent = props => {
  const {allData, resultFun} = props

  const rockFun = () => resultFun(allData[0].id)
  const scissorFun = () => resultFun(allData[1].id)
  const paperFun = () => resultFun(allData[2].id)

  return (
    <div className="btnsDiv">
      <div className="twoBtn">
        <button
          type="button"
          className="btn"
          onClick={rockFun}
          data-testid="rockButton"
        >
          <img src={allData[0].imageUrl} alt="rock" className="imgPlay" />
        </button>
        <button
          type="button"
          className="btn"
          onClick={scissorFun}
          data-testid="scissorsButton"
        >
          <img src={allData[1].imageUrl} alt="scissor" className="imgPlay" />
        </button>
      </div>
      <div>
        <button
          type="button"
          className="btnBottom"
          onClick={paperFun}
          data-testid="paperButton"
        >
          <img src={allData[2].imageUrl} alt="paper" className="imgPlay" />
        </button>
      </div>
    </div>
  )
}
