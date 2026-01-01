# Cursor Jump Fix - DocsEditor

## Problem
When typing in the docs editor, the cursor was automatically jumping to the front of the text, making it impossible to type normally.

## Root Cause
The `DocsEditor` component was using `dangerouslySetInnerHTML` to set the content of the contentEditable div. This caused React to completely re-render the div's innerHTML on every keystroke, which reset the cursor position to the beginning.

## Solution
Replaced the `dangerouslySetInnerHTML` approach with a ref-based solution:

1. **Added `useRef`** to maintain a reference to the contentEditable div
2. **Added `useEffect`** to initialize content only when the document changes (not on every keystroke)
3. **Removed `dangerouslySetInnerHTML`** which was causing the re-render
4. **Updated `onInput` handler** to track content changes without triggering re-renders

## Technical Details

### Before (Broken):
```tsx
<div
  contentEditable
  onInput={(e) => {
    const sanitized = DOMPurify.sanitize(e.currentTarget.innerHTML, PURIFY_CONFIG);
    onUpdateContent(sanitized);
  }}
  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(doc.content, PURIFY_CONFIG) }}
/>
```

### After (Fixed):
```tsx
const editorRef = useRef<HTMLDivElement>(null);
const lastContentRef = useRef<string>("");

useEffect(() => {
  if (editorRef.current && doc) {
    const sanitized = DOMPurify.sanitize(doc.content, PURIFY_CONFIG);
    if (sanitized !== lastContentRef.current) {
      editorRef.current.innerHTML = sanitized;
      lastContentRef.current = sanitized;
    }
  }
}, [doc?.id, doc?.content]);

<div
  ref={editorRef}
  contentEditable
  onInput={(e) => {
    const currentContent = e.currentTarget.innerHTML;
    const sanitized = DOMPurify.sanitize(currentContent, PURIFY_CONFIG);
    lastContentRef.current = sanitized;
    onUpdateContent(sanitized);
  }}
/>
```

## How It Works

1. **Initial Load**: When a document is selected, `useEffect` sets the initial content via `innerHTML`
2. **Typing**: User types, `onInput` fires and updates the content via the callback
3. **No Re-render**: The div's content is NOT re-rendered by React, preserving cursor position
4. **External Changes**: If the document changes externally (switching docs), `useEffect` updates the content

## Files Modified
- `src/planner_section/docs/DocsEditor.tsx`

## Testing
1. Open a document in the docs section
2. Click in the editor and start typing
3. Cursor should stay where you're typing (not jump to the front)
4. Try formatting text with the toolbar buttons
5. Switch between documents - content should load correctly
