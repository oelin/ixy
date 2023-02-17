export default class Store {

        constructor(reducer, initialState=null) {
                this.states = [ [null, initialState], ]
                this.index = 0
                this.reducer = reducer
        }

        push(action) {
                const state = [action, this.reducer(this.states[this.index], action)]

                this.states = this.states.slice(0, this.index + 1)
                this.states.push(state)
                this.index ++

                return state
        }

        pop() {
                return this.states.pop()
        }

        back() {
                if (this.index > 0) {
                        const state = this.states[this.index - 1]
                        this.index --

                        return state
                }

                return this.states[0]
        }

        forward() {
                if (this.index + 1 < this.states.length) {
                        const state = this.states[this.index + 1]
                        this.index ++

                        return state
                }

                return this.states[this.states.length - 1]
        }

        alter(index, action) {
                const original_index = this.index
                this.states[index + 1] = [action, this.reducer(this.states[index], action)]

                const future_actions = [...this.states.slice(index + 1)].map(([action, _]) => action)

                this.index = index
                future_actions.forEach(action => this.push(action))

                this.index = original_index
                return this.states[original_index]
        }

        now() {
                this.index = this.states.length - 1
                return this.states[this.index]
        }
}
