
var sampleSelected = [
  {name: 'slack', id:1},
  {name: 'uber', id:2},
]

var sampleTechnologies = [
  {name: 'mySQL', companies: [{name:'apple', id:0},{name:'uber', id:1}], id:0},
  {name: 'php', companies: [{name:'slack', id:0},{name:'uber', id:1}], id:1}
]


//-------------------------------------------------------------------




var StaticBox = React.createClass({
  render: function(){
    return (
      <div className="navbar row">
        <h3 className="main-blurb">
          Tell us which companies you want to work for.<br></br> We give you their intersecting technologies.
        </h3>
        <p>Thanks to <a className="credit" href="https://www.stackshare.io">Stackshare.io</a></p>
      </div>
    );
  }
});

//------------------Selected Company Tiles-------------------------------

var SelectCompanyList = React.createClass({
  render: function(){
    var selectNodes = this.props.data.map(function(company){
      return (
        <SelectedCompany name={company.name} key={company.id} ></SelectedCompany>
      );
    });
    return (
      <div className="row selected-companies">
        <div className="col-sm-8 col-centered">
          {selectNodes}
        </div>
      </div>
    );
  }
});  


var SelectedCompany = React.createClass({
  render: function() {
    return (
      <div className="company-tile col-centered">
        <h3 className="company-title"> {this.props.name} </h3>
      </div>
    );
  }
});

var InputBox = React.createClass({
  render: function(){
    return(
      <div className="row companies">
        <div className="col-sm-6 col-centered">
          <form className="company-input-form">
            <input ng-model="inputString" ng-keyup="inputHandler($event)" placeholder="Where do you want to work?" className="company-input col-sm-10" autofocus></input>
            <div ng-click="intersect()" className="company-input-button col-sm-2"><img className="company-input-button-image" src="assets/intersection.png"></img></div>
          </form>
          <DropdownList entries={this.props.entries}></DropdownList>
        </div>
      </div>
    );
  }
})


var DropdownList = React.createClass({
  render: function(){
    var dropdownNodes = this.props.entries.map(function(entry){
      return (
        <DropdownEntry name={entry.name} key={entry.id}></DropdownEntry>
      );
    })
    return (
      <div ng-hide="dropdownHidden()" className="company-dropdown">
        {dropdownNodes}
      </div>
    )
  }
});

var DropdownEntry = React.createClass({
  render: function(){
    return (
      <div className="col-sm-12 company-dropdown-entry">
        <h4 className="company-dropdown-title"> {this.props.name} </h4>
      </div>
    )
  }
});


var TechnologyBox = React.createClass({
  render: function(){
    var techNodes = this.props.entries.map(function(entry){
      return(
        <TechnologyEntry name={entry.name} entries={entry.companies} key={entry.id}></TechnologyEntry>
      );
    }); 
    return (
      <div className="row">
        <div className="col-sm-12 technologies col-centered">
          {techNodes}
        </div>
      </div>
    );
  }
});

var TechnologyEntry = React.createClass({
  render: function(){
    var companyNodes = this.props.entries.map(function(company){
      return(
        <TechnologyCompanyItem name={company.name} key={company.id}></TechnologyCompanyItem>
      );
      
    });
    return (
      <div className="col-sm-8 technology-entry col-centered">
        <p>
          <a href="#">{this.props.name}:</a> used by {companyNodes} 
        </p>
      </div>
    );
  }
});

var TechnologyCompanyItem = React.createClass({
  render: function(){
    return (
      <a href="#">{this.props.name} </a>
    );
  }
})






//------------------R--------------------------------------------------------


ReactDOM.render(
  <StaticBox />,
  document.getElementById('content')
)

ReactDOM.render(
  <SelectCompanyList data={sampleSelected} />,
  document.getElementById('selected')
)

ReactDOM.render(
  <InputBox entries={sampleSelected} />,
  document.getElementById('input')
)

ReactDOM.render(
  <TechnologyBox entries={sampleTechnologies}/>,
  document.getElementById('technology')
)