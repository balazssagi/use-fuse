import useFuse from '../dist'
import Fuse from 'fuse.js'
import { renderHook } from 'react-hooks-testing-library'

const options = {
    keys: ['text'],
    threshold: 0.6,
}

test('returns correct search result', () => {
    const data = [{ text: 'hello' }, { text: 'bello' }]
    const search = 'hello'
    const fuse = new Fuse(data, options)
    const expected = fuse.search(search)
    const { result } = renderHook(() => useFuse(data, search, options))
    expect(result.current).toEqual(expected)
})

test('handles changing search term', () => {
    const data = [{ text: 'hello' }, { text: 'bello' }]
    const { result, rerender } = renderHook(
        ({ searchText }) => useFuse(data, searchText, options),
        { initialProps: { searchText: 'hello' } }
    )
    rerender({ searchText: '' })
    const fuse = new Fuse(data, options)
    const expected = fuse.search('')
    expect(result.current).toEqual(expected)
})

test('handles changing data', () => {
    const searchTerm = 'ello'
    const data = [{ text: 'hello' }]
    const nextData = [{ text: 'bello' }]
    const { result, rerender } = renderHook(
        ({ data }) => useFuse(data, searchTerm, options),
        { initialProps: { data } }
    )
    rerender({ data: nextData })
    const fuse = new Fuse(nextData, options)
    const expected = fuse.search(searchTerm)
    expect(result.current).toEqual(expected)
})

test('handles changing options', () => {
    const searchTerm = 'hllo'
    const data = [{ text: 'hello' }]
    const nextOptions = {
        ...options,
        threshold: 0,
    }
    const { result, rerender } = renderHook(
        ({ options }) => useFuse(data, searchTerm, options),
        { initialProps: { options } }
    )
    rerender({ options: nextOptions })
    const fuse = new Fuse(data, nextOptions)
    const expected = fuse.search(searchTerm)
    expect(result.current).toEqual(expected)
})
