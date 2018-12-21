import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.css';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import MenuItem from 'react-bootstrap/lib/MenuItem';

const __gameTypes = ["chatroom","dressup"];
const __gameIds = ["nebula","msp2","bsp"];
const __environments = ["SANDBOX","DEVELOPMENT","STAGING","PRODUCTION"];

class Limit {
    constructor(gameType, gameId, environment)
    {
        this.environment = environment;
        this.gameType = gameType;
        this.gameId = gameId;
        this.minUsers = 0;
        this.minRooms = 0;
        this.maxRooms = 10;
        this.maxUsers = 100;
    }
}

class Item {
    constructor(id,text,isActive)
    {
        this.id = id;
        this.text = text;
        this.isActive = isActive;
    }
}

function Row(props) {
    return (
        <tr>
            <th scope="row">{props.limit.environment}</th>
            <td>{props.limit.minUsers} ; {props.limit.minRooms}</td>
            <td>{props.limit.maxUsers} ; {props.limit.maxRooms}</td>
        </tr>
        /*<button type="button" class="btn btn-primary"//onClick={props.onClick}
        >
            {props.value.environment}
        </button>*/
    );
}
  
class GSList extends React.Component {
    renderRow(l) {
        return (
            <Row
                limit={l}
                //onClick={() => this.state.onClick(i)}
            />
        );
    }

    render() {
        return (
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Environment</th>
                        <th scope="col">Minimum</th>
                        <th scope="col">Maximum</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.limits.map((limit) => this.renderRow(limit))}
                </tbody>
            </table>
        );
    }
}
  
class DropDownMenu extends React.Component {
    renderItem(item) {
        return (
            <MenuItem key={item.id} onSelect={() => this.props.onSelected(item.id)} active={item.isActive}>{item.text}</MenuItem>
        )
    }
    render () {
        return (
        <DropdownButton
            bsStyle={"primary"}
            title={this.props.active}
            noCaret
            key={this.props.active}
            id={`dropdown-no-caret-1`}
            >
            {this.props.items.map((item) => this.renderItem(item))}
        </DropdownButton>
        )
    }
}

class GameServerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limits: [],
            gameId: "GameId",
            gameType: "GameType",
        }
        let i = 0;
        const idItems=[];
        const typeItems=[];
        __gameIds.forEach(item => {
            idItems.push(new Item(i,item.toLowerCase(),false));
            i++;
        });
        this.state.idItems = idItems;
        i=0;
        __gameTypes.forEach(item => {
            typeItems.push(new Item(i,item.toLowerCase(),false));
            i++;
        });
        this.state.typeItems = typeItems;
    }
    onSelectId(i) {
        this.setState({gameId: this.state.idItems[i].text})
        const items = this.state.idItems.slice();
        items.forEach(x => x.isActive = false);
        items[i].isActive = true;
        this.setState({idItems: items});
        this.getLimits(this.state.idItems[i].text,this.state.gameType);
    }
    onSelectType(i) {
        this.setState({gameType: this.state.typeItems[i].text})
        const items = this.state.typeItems.slice();
        items.forEach(x => x.isActive = false);
        items[i].isActive = true;
        this.setState({typeItems: items});
        this.getLimits(this.state.gameId,this.state.typeItems[i].text);
    }
    getLimits(gameId,gameType)
    {
        const __dummyLimits = [new Limit("chatroom","nebula","SANDBOX"),new Limit("chatroom","nebula","DEVELOPMENT")]
        if(gameId != "GameId" && gameType != "GameType")
        {
            const limit = __dummyLimits.filter(l => (l.gameType == gameType && l.gameId == gameId));
            this.setState({limits: limit});
        }
    }
    render () {
        return (
        <div>
        <div>
            <ButtonToolbar>
            <DropDownMenu active={this.state.gameId} items={this.state.idItems} onSelected={(i) => this.onSelectId(i)}></DropDownMenu><DropDownMenu active={this.state.gameType} items={this.state.typeItems} onSelected={(i) => this.onSelectType(i)}></DropDownMenu>
            </ButtonToolbar>
        </div>
        <div>
            <GSList limits={this.state.limits}/>
        </div>
        </div>
        )
    }
}

// ========================================

ReactDOM.render(
    <div class="container">
        <p></p>
        <GameServerDashboard />
    </div>,
document.getElementById('root')
);