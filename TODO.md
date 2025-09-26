# TODO: Implement Fullscreen Map Feature in InteractiveMap.tsx

## Breakdown of Approved Plan

1. **Add necessary imports**: Import fullscreen icons (Maximize2, Minimize2) from lucide-react to the InteractiveMap.tsx file.

2. **Add fullscreen state**: Introduce a useState hook to track whether the map is in fullscreen mode.

3. **Add toggle button**: Position a button at the bottom-right of the map container to toggle fullscreen mode.

4. **Implement fullscreen rendering**: When fullscreen is active, render the map in a full-screen overlay (fixed position covering the entire viewport) while preserving the original map content and functionality. Include an exit mechanism (toggle button changes to minimize icon).

5. **Handle fullscreen interactions**: Ensure that selections, popups, and other interactions work in fullscreen mode. The selections panel can be hidden or optional in fullscreen.

6. **Testing**:
   - Run the development server.
   - Navigate to a page using the InteractiveMap (e.g., /map or /planner).
   - Verify the button appears and toggles fullscreen correctly.
   - Test map interactions in fullscreen.
   - Exit fullscreen and confirm return to normal view.

7. **Cleanup**: Update TODO.md with completion status after each step. Remove or archive TODO.md upon full completion.

Progress:
- [x] Step 1: Add imports
- [ ] Step 2: Add state
- [ ] Step 3: Add button
- [ ] Step 4: Implement rendering
- [ ] Step 5: Handle interactions
- [ ] Step 6: Testing
- [ ] Step 7: Cleanup
