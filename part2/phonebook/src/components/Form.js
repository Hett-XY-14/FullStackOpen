const Form = ({onNameChange, nameValue, onNumberChange, numberValue, onSubmit}) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                    <p id="name">name</p> <input id="name-input" onChange={onNameChange} value={nameValue}></input>
                    <p id="number">number</p> <input id="number-input" onChange={onNumberChange} value={numberValue}></input>
                <button id="add-button" type="sumbit"> add </button>
            </form>
        </div>
    )
}

export default Form;