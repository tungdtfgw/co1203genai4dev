# Lecture Slide Creation Prompt

## Instructions

You are an expert in web design and development. Your task is to create slides for a lecture using HTML, CSS and JavaScript.

## Critical Success Factors

⚠️ **CRITICAL**: The following requirements are mandatory and must be followed exactly to avoid common mistakes:

### 1. Content Accuracy (Error Prevention #1)
- **NEVER abbreviate, summarize, or shorten content** from outline.md
- **Copy EXACTLY** every bullet point, sub-point, and explanation from the outline
- **Preserve ALL technical details**, examples, and explanations as written
- **Count bullet points** in outline vs slides to ensure completeness
- If outline has 4 bullet points, slide MUST have 4 bullet points
- If outline has detailed explanations, slide MUST include those explanations

### 2. Template Compliance (Error Prevention #3)
- **Study template files thoroughly** before creating slides
- **Copy exact CSS classes** and HTML structure from templates
- **Verify font sizes** match template specifications:
  - Template 6: Dynamic font sizing based on item count
  - Code slides: Proper syntax highlighting with colors
  - Image slides: Title positioning outside containers
- **Apply correct animation classes**: `slide-in-left`, `slide-in-right`, `slide-in-center`
- **Test template features** like dynamic sizing and animations

### 3. Systematic Workflow (Error Prevention #5)
- **Phase 1 - Planning**: Read entire outline.md, create slide mapping, identify templates needed
- **Phase 2 - Preparation**: Copy all assets, verify template compliance requirements
- **Phase 3 - Batch Creation**: Create 8-10 slides at once, not one-by-one
- **Phase 4 - Verification**: Test all slides before reporting completion

## Guidelines

### Content Requirements
- Build all lecture slides **in English** with content based on the `outline.md` file in the working directory `lecture xx`
- Follow the templates provided in the `templates` folder
- Ensure slides are created in English language
- Match the outline strictly regarding:
  - Number of slides (exact count)
  - Template selection (appropriate for content type)
  - Content structure (complete, unabbreviated)
  - Content accuracy (word-for-word from outline)

### Template Selection & Compliance
- Choose the correct template for each slide based on content type:
  - Cover slide (create one if not present in outline)
  - Table of contents (create one if not present in outline)
  - Text-only content (Template 1 for single level, Template 6 for 2 levels)
  - Image content (Template 2: text-image, Template 3: image-text, Template 4: image-focus)
  - Code examples (Template 5 with proper *COLOR* syntax highlighting)
- **MANDATORY**: Study the corresponding template code in local `/templates/` folder to ensure:
  - Text rendering follows template standards (font sizes, spacing)
  - Animations work correctly (proper CSS classes applied)
  - JavaScript behaviors match template implementation
  - CSS structure is copied exactly (classes, containers, hierarchy)

### Slide naming
- A slide name cover.html
- A slide name toc.html
- Other slides named slide1.html, slide2.html, etc.

### Asset Management
- **Copy** (don't link) logo, JavaScript, and styles from `templates` folder to working directory
- Modify copied assets as needed rather than writing from scratch
- **Do not** create links to the `templates` folder
- **CSS Customization**: For any custom styles specific to the lecture:
  - Create a separate `additional.css` file in the working directory
  - Place all custom styles in `additional.css` that override styles from `styles.css`
  - Do not modify the original `styles.css` file
  - Include `additional.css` after `styles.css` in HTML files to ensure proper override
- For slides requiring images with URLs:
  - Download images locally using `curl` command
  - Verify file sizes after download (must be > 0 bytes)
  - Save to the `images` folder in the working directory

## Mandatory Workflow Process

### Phase 1: Pre-Creation Analysis
1. **Read Complete Outline**: Study entire `outline.md` file thoroughly
2. **Create Slide Mapping**: Map each slide number to content title and template type
3. **Content Inventory**: Count total bullet points, sub-points, and explanations per slide
4. **Template Analysis**: Identify which templates will be used and study their requirements
5. **Create TODO List**: Use todo_write tool to track all tasks systematically

### Phase 2: Environment Setup
1. **Copy Assets**: Copy `styles.css`, `presentation.js`, and `images/` from local `templates` folder. Use these styles and scripts for all slides, do not modify them except when I ask you to do so.
2. **Template Study**: Read template HTML files to understand structure and classes
3. **Download Images**: Use `curl` to download all external images, verify file sizes
4. **Test Server**: Ensure local HTTP server is running for testing

### Phase 3: Batch Content Creation
1. **Work in Batches**: Create 8-10 slides per batch (not one-by-one)
2. **Content Fidelity**: Copy content word-for-word from outline, no abbreviations
3. **Template Compliance**: Apply exact CSS classes and HTML structure from templates. Use the templates as a reference, do not modify them except when I ask you to do so.
4. **Progressive Testing**: Test each batch immediately after creation

### Phase 4: Quality Verification
1. **Content Verification**: Compare each slide against outline for completeness
2. **Template Verification**: Verify font sizes, animations, and styling match templates. Use the templates as a reference, do not modify them except when I ask you to do so.
3. **Functionality Testing**: Use Playwright to test navigation and display properly after each batch.
4. **Final Review**: Complete end-to-end testing before completion

### Quality Assurance Checklist
- [ ] All content from outline.md copied exactly (no abbreviations)
- [ ] Slide count matches outline exactly
- [ ] Template CSS classes applied correctly
- [ ] Font sizes match template specifications
- [ ] Animation classes applied (`slide-in-*`)
- [ ] Images downloaded and verified (file size > 0)
- [ ] Code syntax highlighting applied with colors
- [ ] Custom styles placed in `additional.css` (not in `styles.css`)
- [ ] `additional.css` included after `styles.css` in HTML files
- [ ] Navigation tested with Playwright after each batch.
- [ ] All slides load without errors

## Input Files

- `outline.md` in the working directory (PRIMARY SOURCE - copy content exactly)
- Template files in the `templates` folder (REFERENCE for structure and styling. Do not modify them except when I ask you to do so.)

## Common Mistakes to Avoid

❌ **Never Do:**
- Abbreviate or summarize content from outline
- Create slides one-by-one (inefficient workflow)
- Skip template compliance verification
- Assume content is "good enough" without checking
- Report completion before full verification

✅ **Always Do:**
- Copy content word-for-word from outline
- Work in systematic batches
- Study templates thoroughly before coding. Use the templates as a reference, do not modify them except when I ask you to do so.
- Verify every detail against requirements
- Test comprehensively before completion