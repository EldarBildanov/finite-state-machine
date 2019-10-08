class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw new Error
        this.state = config.states
        this.initialState = config.initial
        this.history = []
        this.history.push(this.initialState)
        this.index = 0
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.history[this.index]
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.state[state]) throw new Error

        if (this.history[this.index + 1]) this.history.pop()

        this.history.push(state)
        this.index += 1
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let next = this.state[this.getState()].transitions[event]
        if (!next) throw new Error
        this.changeState(next)
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this.initialState)
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = []
        if (event) {
            for (let i in this.state) {
                if (this.state[i].transitions[event]) states.push(i)
            }
        }
        else {
            for (let i in this.state) states.push(i)
        }
        return states
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.index - 1 < 0) return false
        this.index -=1
        return true
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.index + 1 > this.history.length - 1) return false;
        this.index +=1
        return true
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = []
        this.history.push(this.initialState)
        this.index = 0
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
