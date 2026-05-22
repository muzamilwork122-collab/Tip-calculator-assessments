# ANSWERS

## 1. How to run

### Requirements
- Node.js 18+

### Commands

```bash
npm install
npm run dev
```



---

## 2. Stack & design choices

I picked React with Vite because it provides fast local development, component-based state management, and smooth live updates while typing. This task depends heavily on responsive UI updates and inline validation, which React handles cleanly through controlled inputs.

### Design decision 1 — Two-column responsive layout
On larger screens, the calculator uses a two-column layout with inputs on the left and results on the right. This keeps the outputs visible while the user edits values without forcing scrolling. On mobile, the layout collapses into a single column for readability.

### Design decision 2 — Active tip preset styling
Preset tip buttons visually highlight the active selection with stronger contrast and scaling. This reduces ambiguity about which percentage is currently applied and improves keyboard navigation visibility.

---

## 3. Responsive & accessibility

### Responsive behavior
- On a 360px mobile screen:
  - Layout stacks vertically
  - Buttons wrap cleanly
  - Inputs expand to full width
  - Large touch targets improve usability

- On a 1440px laptop:
  - Two-column layout appears
  - Output summary remains visible beside inputs
  - Wider spacing improves readability

### Accessibility handled
All inputs have visible labels and keyboard focus states. Buttons are fully keyboard accessible using Tab and Enter.

### Accessibility skipped
I did not implement full screen-reader live-region announcements for changing totals. With another day, I would add ARIA live regions for dynamic calculations.

---



### Usage
- Generated initial project structure
- Suggested validation edge cases
- Helped draft README and ANSWERS documentation

### What I changed
The AI originally suggested fixed-width tip buttons. I changed the layout to use flexible wrapping with responsive sizing so the buttons reflow naturally on smaller screens instead of overflowing horizontally.

---

## 5. Honest gap

The app currently uses standard floating-point math with rounding to two decimals using `toFixed(2)`. With another day, I would implement precise currency-safe calculations using integer cents to eliminate floating-point edge cases for extremely large or precise inputs.