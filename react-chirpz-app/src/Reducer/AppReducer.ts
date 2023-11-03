const intialState:{[key:string]:any} = {
    chirpzList: [],
    modalOpen:false,
}

const appReducer = (state = intialState, action:{[key:string]:any}) => {
    switch (action.type) {
        case "INITIAL":
            {
                return { ...state,chirpzList:[...action.payload] }
            }
        case "MODALOPEN":
            {
                return { ...state,modalOpen:true }
            }
        case "MODALCLOSE":
            {

                return { ...state,modalOpen:false }
            }
        case "CREATECHIRPZ":
            {
                return { ...state,chirpzList:[action.payload,...state.chirpzList] }
            }
        default:
            return state;
    }

}
export default appReducer;