import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit'
import {apiSlice} from '../../app/api/apiSlice'

const notesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getnotes: builder.query({
            query: () => '/notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadednotes = responseData.map(note => {
                    note.id = note._id
                    return note
                });
                return notesAdapter.setAll(initialState, loadednotes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'note', id }))
                    ]
                } else return [{ type: 'note', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetNotesQuery,
} = notesApiSlice


export const selectnotesResult = notesApiSlice.endpoints.getnotes.select()


const selectnotesData = createSelector(
    selectnotesResult,
    notesResult => notesResult.data
)


export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds

} = notesAdapter.getSelectors(state => selectnotesData(state) ?? initialState)