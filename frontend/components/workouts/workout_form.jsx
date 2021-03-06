import React from 'react'
import MainNav from '../mainNav/main_nav'
import { Link, withRouter } from 'react-router-dom';
import MainFooter from '../footer/main_footer';
import GrayFooter from '../footer/grayFooter'

class WorkoutForm extends React.Component{
  constructor(props){
    super(props)
    this.state = this.props.workout; 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleDisable = this.toggleDisable.bind(this);
  }

  componentDidMount(){
    this.props.fetchRoutes(this.props.session?.id)
  }

  handleSubmit(e){
    e.preventDefault(); // stops a refresh 
    this.props.action(this.state, this.props.currentUser).then(this.props.history?.push("/workouts"));
  }

  handleChange(field){
    // this.toggleDisable()
    return e => {
        this.setState({[field]: e.target.value})
    }
  }

   handleChange(field){
    return e => {
      this.setState({[field]: e.target.value})
    }
  }

   toggleDisable(){
   if(e.target.value.length > 0){
      this.setState({disabled: false})
    } else { 
      this.setState({disabled: true})
    }
  }

  render(){
    let link = this.props.formType === "Edit" ?
    `/workouts` : `/`

    let routesList = this.props?.routes?.map((route , i) => {
      return <option placeholder={this.props?.workout?.route?.title} value={route.id} key={i}>{route.title} </option> 
    })

    let formName = this.props.formType === "Edit" ?
    'Update' : 'Create'
    return (
      <div>
        <MainNav/>
        <div className="workoutFormBody">
          <h1 className="woFormTitle">Workout Entry</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="topWorkoutForm">
              <div>
                <label className="workoutFormlabel">Route 
                  <select onChange={this.handleChange('route_id')} className="routeOptions" >
                    <option className="routeOptionschoices" 
                    value={this.props?.workout?.route?.id || ''} disabled selected>{this.props?.workout?.route?.title || 'Choose a route'}</option>
                    {routesList}
                  </select>
                </label>
              </div> 
              <div className="woTimeEntry workoutFormlabel">
                <label>Time 
                  <div className="timeinputAreas">
                    <input type="number" onChange={this.handleChange('hours')} value={this.state.hours} placeholder={'hr'} className="timeInpute" min="0" max="100"/>
                    <input type="number" onChange={this.handleChange('minutes')} value={this.state.minutes} placeholder={'min'} className="timeInpute" min="0" max="59"/>
                    <input type="number" onChange={this.handleChange('seconds')} value={this.state.seconds} placeholder={'s'} className="timeInpute" min="0" max="59"/>
                  </div>
                </label> 
              </div>
            </div>
            <div className="midWorkoutForm">
              <div className="midWorkoutForm-top">
                <label className="workoutFormlabel" id="run_type">Type
                <select onChange={this.handleChange('run_type')} value={this.state.run_type} className="wOforminput">
                  <option>Run</option>
                  <option>Walk</option>
                </select>
                </label>
                <label className="workoutFormlabel workoutForm-date">Date
                  <input type="date" onChange={this.handleChange('date')} className="wOforminput date_entry"
                  min="2021-01-01" max="2030-12-31" value={this.state.date}/>
                </label> 
              </div>
              <label className="workoutFormlabel">Title 
                <input className="workinput wOforminput" type="text" value={this.state.title} onChange={this.handleChange('title')} placeholder={'Afternoon Run'}/>
              </label> <br/>
            </div>
            <div className="lowWorkoutForm">
              <label className="workoutFormlabel">Description 
                <textarea  className="workinput" id="workDescBox" 
                onChange={this.handleChange('description')} 
                value={this.state.description} 
                placeholder={'How did it go? Were you tired or rested? How was the weather?'}
                />
              </label>
              <br/>
            </div>
            <button className="workoutCreatebutton" 
              disabled={
                !this.state.title || 
                !this.state.description || 
                !this.state.hours ||
                !this.state.minutes ||
                !this.state.seconds ||
                !this.state.run_type ||
                !this.state.date
              }
              >{formName}</button>
            <Link to={link} className="cancelButton">Cancel</Link>
          </form>
        </div>
        <GrayFooter/>
        <MainFooter/>
      </div>
    )
  }
}

export default WorkoutForm;