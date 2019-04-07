A tiny wrapper around the [Fuse.js](https://fusejs.io/) fuzzy-search library using React Hooks.

# Demo

[Basic usage](https://codesandbox.io/s/github/balazssagi/use-fuse/tree/master/example)

# Install

using NPM:

```bash
npm install use-fuse --save
```

or Yarn:

```bash
yarn add use-fuse --save
```

# Usage

The library exports a single hook.

## Example

```jsx
import React from 'react'
import useFuse from 'use-fuse'

// see: https://fusejs.io/
const fuseOptions = {
    keys: ['name'],
    threshold: 0.6,
}

function App() {
    const [list] = React.useState([
        { name: 'Hesse' },
        { name: 'Pelevin' },
        { name: 'Steinbeck' },
        { name: 'Moore' },
        { name: 'Atwood' },
    ])
    const [search] = React.useState('')
    const filteredList = useFuse(list, search, fuseOptions)

    return (
        <ul>
            {filteredList.map(item => (
                <li key={item.name}>{item.name}</li>
            ))}
        </ul>
    )
}
```

## Parameters

```js
 useFuse(list, searchTerm, fuseOptions) : filteredList
```

| Parameter   | Type   | Required | Note                                   |
| ----------- | ------ | -------- | -------------------------------------- |
| list        | array  | ✓        | The list to filter                     |
| searchTerm  | string | ✓        | The search term to filter by           |
| fuseOptions | object | ✓        | see [Fuse.js Docs](https://fusejs.io/) |

# TypeScript

Type definition of Fuse.js has some limitations so you may have to use some type casting if using TypeScript.
