import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
    test('returns new state with action NEW_NOTE', () => {

    const state = []
    const action = {
        type: 'NEW_NOTE',
        data: {
            content: 'The app state is in redux store',
            important: true,
            id:1
        }
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)

    })
})