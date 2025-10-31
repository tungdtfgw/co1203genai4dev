# Common Errors and Solutions - Greenwich Presentation Template

This document contains common issues encountered in the Greenwich presentation template system and their solutions.

## Table of Contents
1. [Footer Positioning Issues](#footer-positioning-issues)
2. [Navigation Button Problems](#navigation-button-problems)
3. [List Item Display Issues](#list-item-display-issues)
4. [Layout and Responsive Issues](#layout-and-responsive-issues)

---

## Footer Positioning Issues

### Problem: Footer not sticking to bottom in normal mode
**Symptoms:**
- Footer appears in middle of screen or not at bottom edge
- Works correctly in full-screen mode but not in normal browser window
- Footer appears cut off or hidden

**Root Cause:**
The CSS uses shorthand `margin` property that overrides the `margin-top: auto` needed for flexbox positioning.

**Original problematic CSS:**
```css
.slide-footer {
    margin-top: auto;  /* This gets overridden */
    margin: 0 -60px -30px -60px;  /* This overrides the above */
}
```

**Solution:**
Replace shorthand margin with individual properties:
```css
.slide-footer {
    margin-top: auto;
    margin-left: -60px;
    margin-right: -60px;
    margin-bottom: -30px;
}
```

Also update slide container and content:
```css
.slide {
    overflow-x: hidden;
    overflow-y: auto;  /* Instead of overflow: hidden */
}

.slide-content {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
}
```

---

## Navigation Button Problems

### Problem: All "Previous" buttons disabled in lecture slides
**Symptoms:**
- Previous button appears grayed out on all slides except first
- JavaScript navigation not working properly
- Button text shows "Previous" but functionality is disabled

**Root Cause:**
Mismatch between slide filenames in HTML files and the slides array in `presentation.js`.

**Original problematic code:**
```javascript
this.slides = [
    'cover.html',
    'table-of-contents.html',
    'template1-text-list.html',
    // ... template names that don't match actual files
];
```

**Solution:**
Update the slides array to match actual slide filenames:
```javascript
this.slides = [
    'slide01.html',
    'slide02.html',
    'slide03.html',
    // ... continue with all actual slide files
    'slide46.html'
];
```

### Problem: Button text too long for layout
**Symptoms:**
- Navigation buttons appear cramped
- Button text overflows in smaller screens

**Solution:**
Use shorter button labels:
```bash
# Use sed command to replace all instances
find "lecture XX" -name "*.html" -exec sed -i '' 's/◀ Previous/◀ Prev/g' {} \;
```

---

## List Item Display Issues

### Problem: List items appear split into 2 columns
**Symptoms:**
- Bold text appears on left side of list item
- Regular text appears on right side of list item
- Content looks like it's in a 2-column layout within each list item
- Affects template1-list specifically

**Root Cause:**
List items using `display: flex` with `align-items: center` causes content to be arranged as flexbox children, separating bold and regular text.

**Original problematic CSS:**
```css
.content-list.template1-list li {
    display: flex;
    align-items: center;
    /* This causes bold and regular text to separate */
}
```

**Solution:**
Override flexbox display with block display for natural text flow:
```css
.content-list.template1-list li {
    width: 100% !important;
    display: block !important;
    text-align: left !important;
}

/* Override all flex display rules for template1-list items */
.content-list.template1-list:has(li:nth-child(1):nth-last-child(1)) li,
.content-list.template1-list:has(li:nth-child(2):nth-last-child(1)) li,
.content-list.template1-list:has(li:nth-child(3):nth-last-child(1)) li,
.content-list.template1-list:has(li:nth-child(4):nth-last-child(1)) li,
.content-list.template1-list:has(li:nth-child(5):nth-last-child(1)) li,
.content-list.template1-list:has(li:nth-child(6):nth-last-child(1)) li,
.content-list.template1-list:has(li:nth-child(7)) li {
    display: block !important;
    align-items: unset !important;
}
```

**Prevention:**
Ensure strong tags maintain inline display:
```css
strong {
    display: inline !important;
}

.content-list li strong {
    display: inline !important;
    flex: none !important;
}
```

---

## Layout and Responsive Issues

### Problem: 2-row grid layout overlapping in normal mode
**Symptoms:**
- Third list overlaps with first two lists in 2-row grid layouts
- Works in full-screen but fails in normal browser window
- Content appears cramped

**Solution:**
Create optimized 2-row grid with reduced spacing:
```css
.template6-grid-2row {
    display: grid !important;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 24px 36px;  /* Reduced from 36px 48px */
    align-items: start;
}

.template6-grid-2row > li:nth-child(1),
.template6-grid-2row > li:nth-child(2) {
    padding: 24px 30px;  /* Reduced from 33px 39px */
}

.template6-grid-2row > li:nth-child(3) {
    grid-column: 1 / -1;
    justify-self: center;
    max-width: 50%;
    padding: 24px 30px;
}
```

### Problem: Template6-list content boxes insufficient height and poor alignment
**Symptoms:**
- Content appears cut off or truncated in normal mode (works in full-screen)
- Boxes have insufficient height for their content
- When few boxes or boxes with little content, they align to top leaving empty space at bottom
- Content boxes don't take natural height needed for their content

**Root Causes:**
1. **Fixed equal height distribution**: `flex: 1` forces all list items to have equal height regardless of content
2. **Space distribution**: `justify-content: space-evenly` distributes items evenly but constrains natural height
3. **Top alignment**: `justify-content: flex-start` pushes content to top

**Original problematic CSS:**
```css
.content-list.template6-list {
    justify-content: space-evenly;  /* or flex-start */
    height: 100%;
}

.content-list.template6-list > li {
    flex: 1;  /* Forces equal height */
    min-height: 60px;
}
```

**Solution:**
Allow natural height while maintaining centered alignment:
```css
.content-list.template6-list {
    display: flex;
    flex-direction: column;
    justify-content: center;  /* Center boxes vertically */
    flex: 1;
    height: auto;  /* Natural height */
    min-height: 400px;
    max-width: 85%;
    width: 85%;
    gap: 20px;  /* Consistent spacing */
}

.content-list.template6-list > li {
    flex: none;  /* Natural height based on content */
    min-height: auto;  /* No minimum height constraint */
    /* ... other styling preserved */
}
```

**Benefits:**
- Content boxes take natural height for their content
- Boxes are centered vertically in available space
- Works well with both few boxes and many boxes
- No content truncation in normal viewing mode

---

## Debugging Tips

### Using Browser Developer Tools
1. **Inspect Element**: Right-click on problematic elements
2. **Check Computed Styles**: Look for conflicting CSS rules
3. **Console Errors**: Check for JavaScript errors affecting functionality

### Using Playwright for Testing
```javascript
// Navigate to slide
await page.goto('file:///path/to/slide.html');

// Take screenshot for visual verification
await page.screenshot({path: 'debug-screenshot.png'});

// Check element properties
const element = await page.$('.problematic-element');
const styles = await element.evaluate(el => getComputedStyle(el));
```

### CSS Specificity Issues
When CSS rules don't apply:
1. Use `!important` for critical overrides
2. Increase selector specificity
3. Check for competing rules in browser dev tools
4. Ensure selectors match actual HTML structure

---

## File Locations

- **Styles**: `lecture XX/styles.css`
- **Navigation Logic**: `lecture XX/presentation.js`
- **Individual Slides**: `lecture XX/slideXX.html`
- **Testing Screenshots**: `.playwright-mcp/`

---

## 5. Template6-list Content Overlapping Slide Titles

**Problem**: When using `template6-list` with centering, the content boxes overlap or hide the slide title, making it invisible.

**Symptoms**:
- Slide title exists in HTML but is not visible on screen
- Content appears to start at the very top of the slide
- Browser developer tools show title element is being "intercepted" by content list
- Click events on title are blocked by content elements

**Root Cause**: 
- The `justify-content: center` property centers the entire content list vertically
- Combined with `flex: 1`, the list expands to fill available space and overlaps the title
- The content list doesn't respect the space needed for the slide title above it

**Solution**:
```css
.content-list.template6-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: none;                    /* Don't expand to fill parent */
    height: calc(100% - 120px);    /* Leave space for title and footer */
    min-height: 350px;
    max-width: 85%;
    width: 85%;
    gap: 15px;                     /* Reduced gap for better fit */
    margin-top: 60px;              /* Explicit space for title */
}
```

**Key Changes**:
- `flex: none` instead of `flex: 1` to prevent expansion
- `margin-top: 60px` to reserve space for the slide title
- `height: calc(100% - 120px)` to account for title and footer space
- Reduced `gap` and `min-height` for better content fitting

**Files Affected**: `lecture 04/styles.css`

---

## Version History

- **v1.0**: Initial error documentation
- **v1.1**: Added footer positioning fixes
- **v1.2**: Added navigation button solutions
- **v1.3**: Added list display issue fixes
- **v1.4**: Added template6-list height and alignment issues
- **v1.5**: Added template6-list title overlap fixes

Last updated: September 2025