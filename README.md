# react-formgen
Have the structure of your form in a JSON array, pass it into the FormGen component, and boom! Let there be form!

## Installation
```shell
npm i react-formgen
```

## Example

```js
import React from 'react'
import FormGen from 'react-formgen'

class App extends React.Component {

  	handleChange = (values) => (e) => {
    	console.log(values)
    }
    
    
    handleSubmit = (inputs) => (e) => {
        e.preventDefault()
    	console.log(inputs)
    }


    render() {
      	const template = (label, input) => {
        	<div className="input-field">
          		{input}
          		<label>{label}</label>
        	</div>  
        }
      	
        const data = [
            {
                key: "first_name",
                type: "text",
                label: "First name"
            },
            {
                key: "last_name",
                type: "text",
                label: "last name"
            },
            {
                key: "submit",
                type: "submit",
                placeholder: "Submit"
            }
        ]

        return ( 
        	<React.Fragment >
            	<FormGen schema={data} template={template} onChange={this.handleChange} onSubmit={this.handleSubmit} /> 
          	</React.Fragment>
        )
    }
}
export default App
```

## Props
* `schema`: `required` `array`, each dictionary can contain the props that will be populated into the `<input />` JSX element.
* `template`: `required` `func`, can contain a certain view structure you would like the inputs to be populated into.
* `onChange`: `func`, an object function that would be called when a change in the form happens, the FormGen component's state values will be passed into this function.
* `onSubmit`: `func`, an object function that would be called when a submission is made, the FormGen component's state values will be passed into this function.
