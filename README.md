# latex-html
An HTML-based latex-like editor; all formulas are rendered by MathJax.
## Features
1. Section environments are supported: `part`, `chapter`, `section`.
* Section environments should be contained in  `chapter` environments, and `chapter` environments should be contained in `part` environments.
2. `theorem` environments are supported: `theorem`, `proposition`, `lemma`, `corollary`, `example`, `definition`.
* `theorem-name` is supported.
3. Equation environment is supported: `equation`.
4. Counter is supported:  
* Apply for section environments, theorem environments, equation environment.
* Counters will appear automatically
* Counters for chapter and section are parallel; no counters for chapter.
* Counters for theorem and equation are dependent.
5. Cross references are supported: `label`, `ref`.
* Apply for theorem environments, equation environment.
