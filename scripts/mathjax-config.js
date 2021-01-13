window.MathJax = {
    loader: {
        load: ['[tex]/amscd', '[tex]/textmacros']
    },
    tex: {
        packages: {
            '[+]': ['amscd', 'textmacros']
        },
        inlineMath: [
            ['{jax}', '{jax}']
        ],
        displayMath: [
            ['{jax}{jax}', '{jax}{jax}'],
            ['\\[', '\\]']
        ],
        macros: {
            Abs: ['\\left\\lvert #1 \\right\\rvert', 1],
            abs: ['\\lvert #1 \\rvert', 1],
            Norm: ['\\left\\lVert #1 \\right\\rVert', 1],
            norm: ['\\lVert #1 \\rVert', 1],
            op: ['\\textrm{op}'],
            dist: ["\\operatorname\{dist\}"],
            Ker: ["\\operatorname\{Ker\}"],
            Ima: ["\\operatorname\{Im\}"],
            id: ["\\operatorname\{id\}"],
            colim: ["\\operatorname\{colim\}"],
            vol: ["\\operatorname\{vol\}"],
            supp: ["\\operatorname\{supp\}"],
            span: ["\\operatorname\{span\}"],
            esssup: ["\\operatorname\{ess\ sup\}"],
            sign: ["\\operatorname\{sgn\}"],
            tr: ["\\operatorname\{tr\}"],
            Aut: ["\\operatorname\{Aut\}"]
        }
    }
};