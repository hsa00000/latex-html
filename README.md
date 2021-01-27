# latex-html
An HTML-based latex-like editor; all formulas are rendered by MathJax.
## Features
1. Section environments are supported: `part`, `chapter`, `section`.
* `section` environments should be contained in  `chapter` environments, and `chapter` environments should be contained in `part` environments.
2. Theorem environments are supported: `theorem`, `proposition`, `lemma`, `corollary`, `example`, `definition`.
* `theorem-name` is supported.
3. Equation environment is supported: `equation`.
4. Counter is supported:  
* Apply for section environments, theorem environments, equation environment.
* Counters will appear automatically
* Counters for chapter and section are parallel; no counters for chapter.
* Counters for theorem and equation are dependent.
5. Cross references are supported: `label`, `ref`.
* Apply for theorem environments, equation environment.
6. Contents are supported.
7. Anchor is supported: `anchor`
* The editor will jump to where the anchor is located whenever the editor refreshes.
## Example
```
<div class="part" data-name="Part">

<div class="chapter" data-name="Chapter">

<div class="section" data-name="Section">

In this section we will prove (<a href=#>PT</a>):

<div class="theorem" data-name="Pythagorean" data-label="PT">
For a right triangle, if $c$ denotes the length of the hypotenuse and
$a$ and $b$ denote the lengths of the other two sides, we have

<div class="equation" data-label="PTE">
a^2 + b^2 = c^2
</div>

</div>

<div class="proof">
(<a href=#>PTE</a>) is trivial.
</div>

<div id="anchor">anchor</div>

</div>
</div>
</div>
```
