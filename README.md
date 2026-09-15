# Practice Assignment 1 – Filter & Search Todos

## What I Implemented

### Backend (`backend/controllers/todoController.js`)
Modified `getTodos` to support filtering todos by their `done` status via a query parameter:
- `GET /api/todos` – returns all todos (unchanged behavior when no filter is passed).
- `GET /api/todos?done=true` – returns only completed todos.
- `GET /api/todos?done=false` – returns only pending (not done) todos.

The filter object is built conditionally: if `req.query.done` is not provided, the filter stays empty (`{}`), so `Todo.find(filter)` behaves exactly as `Todo.find()` did before. When `done` is provided, it's converted from a string (`"true"`/`"false"`) to an actual boolean before being used in the filter.

No changes were made to `createTodo`, `updateTodo`, `deleteTodo`, or the routes — only `getTodos` was modified, as instructed.

### Frontend (`frontend/src/api/todos.js`)
Updated `fetchTodos` to accept an optional `filter` argument (`'all'`, `'active'`, or `'done'`) and translate it into the appropriate query parameter using axios's `params` option:
- `'active'` → `{ done: false }`
- `'done'` → `{ done: true }`
- `'all'` (or no argument) → no params, returns everything.

### Frontend (`frontend/src/App.jsx`)
- Added a `filter` state (`'all'`, `'active'`, `'done'`), defaulting to `'all'`.
- Updated the `useEffect` to depend on `filter` and re-fetch todos every time it changes.
- Added three buttons (All / Active / Done) above the todo list that update the filter state, triggering a re-fetch with the new query parameter.

## Design Choice: Server-side vs Client-side Filtering
I implemented **server-side filtering** as instructed, so the query parameter travels end-to-end from the UI to the database query.

**Trade-off considered:**
- **Server-side (implemented):** Scales better for large datasets since only matching todos are sent over the network. Requires a new network request every time the filter changes.
- **Client-side (alternative):** Would filter the already-loaded todos array in React with no extra network calls, giving instant UI feedback. However, it doesn't scale well if the todo list grows large, since all todos must be fetched upfront regardless of which filter is active.

## How to Test
1. Start the backend (`node server.js` inside `backend/`) with a MongoDB connection configured.
2. Start the frontend (`npm run dev` inside `frontend/`).
3. Add a few todos and mark some as done.
4. Click **All**, **Active**, and **Done** to confirm the list filters correctly, or hit the endpoints directly:
   - `GET /api/todos`
   - `GET /api/todos?done=true`
   - `GET /api/todos?done=false`
