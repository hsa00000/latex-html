window.MathJax = {
    chtml: {
    scale: 0.9,
    minScale: 0
    },
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
            Coker: ["\\operatorname\{Coker\}"],
            Ima: ["\\operatorname\{Im\}"],
            id: ["\\operatorname\{id\}"],
            colim: ["\\operatorname\{colim\}"],
            vol: ["\\operatorname\{vol\}"],
            supp: ["\\operatorname\{supp\}"],
            span: ["\\operatorname\{span\}"],
            esssup: ["\\operatorname\{ess\ sup\}"],
            sign: ["\\operatorname\{sgn\}"],
            tr: ["\\operatorname\{tr\}"],
            Hom: ["\\operatorname\{Hom\}"],
            Aut: ["\\operatorname\{Aut\}"],
            End: ["\\operatorname\{End\}"],
            Ind: ["\\operatorname\{Ind\}"],
            //https://math.meta.stackexchange.com/questions/23273/
            iddots: ["\\mathinner\{\\kern1mu\\raise1pt\{.\}\\kern2mu\\raise4pt\{.\}\\kern2mu\\raise7pt\{\\Rule{0pt}{7pt}{0pt}.\}\\kern1mu\}"]
        }
    },
    startup: {
        pageReady() {
            return MathJax.startup.defaultPageReady().then(function () {
                $(firstshow()).collapse("show");
            });
        }
    }
};