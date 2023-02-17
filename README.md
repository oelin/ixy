# ixy

A reversible event store. WIP.

This package aims to provide a bidirectional event-based state management system which supports timeline recomputation. This allows applications to change past actions while ensuring future state is affected in a predictable way. Useful for turn-based games or other applications where previous actions can be changed.


```js
const store = new Store(

  (state, action) => {
    if (action === 'increment') return state + 1
    if (action === 'decrement') return state - 1
  }
)
```

Perform actions.

```js
store.push('increment') // 1
store.push('increment') // 2
store.push('decrement') // 1
```

Move forwards or backwards in time.

```js
store.reverse() // 2
store.forward() // 1
```

Change prior actions and recompute the timeline deterministically.

```js
store.replace(0, 'decrement') // Set the initial action to `decrement` instead of `increment`.
                              // The new timeline is 0 -> 1 -> 0
```
