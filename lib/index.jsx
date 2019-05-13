import React from 'react'
import PropTypes from 'prop-types';

class FormGen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            values: {}
        }
    }

    handleValueChange = (input) => (e) => {
        e.preventDefault()
        let values = this.state.values
        values[input.key] = e.target.value
        this.props.onChange(values)
        this.setState({values: values})
    }

    render(){
        const {schema, template} = this.props

        const label = (label) => (
            <label>
                {label}
            </label>
        )
        const field = (input) => (
            <input className="validate" {...input} onChange={this.handleValueChange(input)}/>
        )
        const dropdown = (input) => {
            return (
                <select onChange={this.handleValueChange(input)} {...input}>
                    <option></option>
                    {
                        input.options.map((option, index) => (
                            <option key={option.value} {...option}>{option.label}</option>
                        ))
                    }
                </select>
            )
        }
        const element = (input) => {
            let element
            switch(input.type){
                case "dropdown":
                    element = dropdown(input)
                    break
                default:
                    element = field(input)
            }
            if(!template){
                return (
                    <React.Fragment>
                        {label(input.label)}
                        {element}
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        {template(input.label, element)}
                    </React.Fragment>
                )
            }

        }
        if(schema){
            return (
                <form onSubmit={this.props.onSubmit(this.state.values)}>
                    {
                        schema.map(input => {
                            return (
                                <React.Fragment key={input.key}>
                                    {element(input)}
                                </React.Fragment>
                            )
                        })
                    }
                </form>
            )
        } else {
            return (
                <React.Fragment></React.Fragment>
            )
        }
    }
}

FormGen.propTypes = {
    schema: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    template: PropTypes.func
}

export default FormGen
