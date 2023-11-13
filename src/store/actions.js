import {axiosInstance as axios} from "@/plugins/axios";

export default {

    getDataWithoutRequested(context, {data, requested}) {

        return data.filter( (dataElem) => {
            return !requested.includes(dataElem.name);
        });
    },

    solveProblem (context) {

        return new Promise( (resolve, reject) => {

            // Clear vars
            context.commit('data', []);
            context.commit('requested', []);
            context.commit('resolution', []);

            // Process request
            axios.post(`${process.env.VUE_APP_API_URL}solve-problem`, {
                problem: context.state.problem,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then( async (response) => {

                    const data = await context.dispatch('getDataWithoutRequested', {
                        data: response.data.data,
                        requested: response.data.requested,
                    });

                    context.commit('data', data);
                    context.commit('requested', response.data.requested);
                    context.commit('resolution', response.data.resolution);

                    resolve(response);

                })
                .catch( (errResponse) => {
                    reject(errResponse);

                    // Reset problem text
                    context.commit('problem', "");

                });
        });
    },

    resolveProblem (context) {

        return new Promise( (resolve, reject) => {

            // Clear vars
            context.commit('resolution', []);

            // Process request
            axios.post(`${process.env.VUE_APP_API_URL}solve-problem`, {
                resolution: {
                    data: context.state.data,
                    requested: context.state.requested,
                },
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then( (response) => {

                    context.commit('data', context.dispatch('getDataWithoutRequested', {
                        data: response.data.data,
                        requested: response.data.requested,
                    }));
                    context.commit('requested', response.data.requested);
                    context.commit('resolution', response.data.resolution);

                    resolve(response);

                })
                .catch( (errResponse) => {

                    // Reset problem text
                    context.commit('problem', "");

                    reject(errResponse);

                });
        });
    },
}
