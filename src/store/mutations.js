export default {
    problem (state, d) {
        state.problem = d;
    },

    data (state, d) {
        state.data = d;
    },
    requested (state, d) {
        state.requested = d;
    },
    resolution(state, d) {
        state.resolution = d;
    },

    addRequestedData (state) {
        state.requested.push("");
    },

    modifyRequestedData (state, {iRequestedData, value}) {
        state.requested[iRequestedData] = value;
    },

    addData (state, name) {
        state.data.push({
            name,
            value: "",
            unit: "",
        });
    },

    modifyData (state, {iData, type, value}) {
        state.data[iData][type] = value;
    },

    deleteData (state, iData) {
        state.data.splice(iData, 1);
    },

    modifyResolution (state, {iResolution, type, value}) {
        state.resolution[iResolution][type] = value;
    },
}
