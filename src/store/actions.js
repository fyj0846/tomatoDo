export function TOGGLE_TODO ({ commit, dispatch, state }, { id, done }) {
  commit('TOGGLE_TODO', { id, done })
}

export function ADD_TODO ({ commit, dispatch, state }, { name }) {
  commit('ADD_TODO', { name })  /* 更新vue */
}

/* context.commit,  context.dispatch, context.state, es6 函数结构写法 */
export function LOAD_TODOS ({ commit, dispatch, state }) {
}
