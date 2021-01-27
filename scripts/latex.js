var theoremcounter = 0;
var levelcounter = {
    "part": 0,
    "chapter": 0,
    "section": 0
};
var section_level = ["part", "chapter", "section"];
var toc_tree = [];
var label = {};

$(document).ready(function() {
    $("body").append("<div id=\"hackmd-content\"></div>");
    $("#doc").append("<div id=\"bottomspace\"></div>");
    document.getElementById("bottomspace").setAttribute("style","height:"+document.documentElement.clientHeight+"px;");
    $("#hackmd-content").load("ajax/hackmd_content.html document > *", function() {
        $("#hackmd-content").children().each(function(){
            $(this).appendTo("body");
        });
        $("#hackmd-content").remove();
        document.getElementById("tocbr").innerHTML = generateTOC();
        document.getElementById("tocr").innerHTML = generateTOC();
        try {
            MathJax.typesetPromise();
        } catch (e) {} finally {
        }
        $.getScript("ajax/hackmd_content.js");
    });

    $(".proof").append("<span style=\"float:right;\">$\\square$</span>");

    $(".proof").each(function() {
        if ($(this).data("name")) {
            $(this).prepend($(this).data("name"));
        } else {
            $(this).prepend("<em>Proof</em>.")
        }
    });

    $(".theorem, .proposition, .lemma, .corollary").attr("style", "font-style: italic;");

    $(".part, .chapter, .section, .theorem, .proposition, .lemma, .corollary, .example, .equation, .definition").each(function() {
        if ($(this).hasClass("part") || $(this).hasClass("chapter") || $(this).hasClass("section")) {
            var level = $(this).attr("class").split(" ")[0];
            levelcounter[level]++;
            var name = $(this).data("name");
            var id = name.replace(/\s+/g, '-').toLowerCase();
            name = name.replace(/\$/g, "{jax}");
            id = id.replace(/[^\w\s-]/g, '');
            $(this).attr("id", "content-" + id);
            $(this).addClass("collapse");
            var h_level = section_level.indexOf(level);
            h_level++;
            var numbered_name = name;
            if (level == "chapter") {
                numbered_name = romanize(levelcounter[level]) + ". " + name;
            } else if (level == "section") {
                numbered_name = levelcounter[level] + ". " + name;
                theoremcounter = 0;
            }
            toc_tree.push({
                "h_level": h_level,
                "id": id,
                "name": name,
                "counter": levelcounter[level]
            });
            $(this).before("<h" + h_level + " id=" + id + " role=\"button\" data-toggle=\"collapse\" data-target=\"#content-" + id + "\">" + numbered_name + "</" + h_level + ">");
        } else if ($(this).hasClass("theorem") || $(this).hasClass("proposition") || $(this).hasClass("lemma") || $(this).hasClass("corollary") || $(this).hasClass("example") || $(this).hasClass("definition")) {
            var theoremtype = $(this).attr("class").split(" ")[0];
            theoremcounter++;
            if ($(this).data("label")) {
                $(this).attr("id", $(this).data("label"));
                label[$(this).data("label")] = [levelcounter["section"], theoremcounter];
            }
            var theoremtitlestr = "<strong style=\"font-style: normal\">" + theoremtype[0].toUpperCase() + theoremtype.substring(1) + " " + levelcounter["section"] + "." + theoremcounter;
            if ($(this).data("name")) {
                theoremtitlestr = theoremtitlestr + " (" + $(this).data("name") + ")";
            }
            theoremtitlestr += "</strong>";
            $(this).prepend(theoremtitlestr);
            if ($(this).data("label")) {
                var id = $(this).data("label");
                var qstr = "[href='#" + id + "']";
                var allref = document.querySelectorAll(qstr);
                for (i = 0; i < allref.length; i++) {
                    allref[i].innerHTML = label[id][0] + "." + label[id][1];
                }
            }
        } else if ($(this).hasClass("equation")) {
            theoremcounter++;
            var id = $(this).data("label");
            $(this).attr("id", id);
            var prependstr = "\\begin{equation}\\tag{" + levelcounter["section"] + "." + theoremcounter + "}";
            $(this).prepend(prependstr);
            $(this).append("\\end{equation}");
            label[id] = [levelcounter["section"], theoremcounter];
            var qstr = "[href='#" + id + "']";
            var allref = document.querySelectorAll(qstr);
            for (i = 0; i < allref.length; i++) {
                allref[i].innerHTML = label[id][0] + "." + label[id][1];
            }
        }
    });

    $(".theorem, .proposition, .lemma, .corollary").addClass("alert alert-info");
    $(".definition").addClass("alert alert-warning");
    $(".example").addClass("alert alert-secondary");

    document.getElementById("tocu").innerHTML = generateTOC("page");

    $('.collapse').on('show.bs.collapse', function() {
        if ($(this).children(".collapse").length == 0 && $(this).children(".collapsing").length == 0) {
            $(this).get(0).innerHTML = $(this).get(0).innerHTML.replace(/\$/g, "{jax}");
            try {
                MathJax.typesetPromise();
            } catch (e) {} finally {
            }
        }
        $(this).parent(".collapse").collapse("show");
    });
});

function firstshow() {
    var contentidlist = [];
    $("#anchor").parents().each(function(){
        if ($(this).attr("id") && $(this).attr("id").split("-")[0] == "content") {
            contentidlist.push("#" + $(this).attr("id"));
        }
    });
    $(contentidlist[contentidlist.length-1]).on('shown.bs.collapse', function () {
        //const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const vh = document.documentElement.clientHeight;
        document.getElementById("anchor").scrollIntoView();
        window.scrollBy(0, -0.5*vh);
    });
    return contentidlist[0];
}

function generateTOC(attr = "") {
    var toc_html = []
    var toc_html_label = []
    for (i = 0; i < toc_tree.length; i++) {
        var this_node = toc_tree[i];
        if (i != 0) {
            var prev_node = toc_tree[i - 1];
        }
        if (i != (toc_tree.length - 1)) {
            var next_node = toc_tree[i + 1]
        }
        var str_before = "<li><a href=\"#content-" + this_node["id"] + "\" data-toggle=\"collapse\" role=\"button\">" + this_node["name"] + "</a>";
        var str_after = "</li>";
        if (next_node["h_level"] > this_node["h_level"]) {
            if (attr == "page") {
                if (next_node["h_level"] == 1) {
                    str_before += "<ul>";
                    str_after = "</ul>" + str_after;
                } else if (next_node["h_level"] == 2) {
                    str_before += "<ol class=\"upperroman\" style=\"counter-reset: listcounter ";
                    str_before += (next_node["counter"] - 1);
                    str_before += "\">"
                    str_after = "</ol>" + str_after;
                } else {
                    str_before += "<ol style=\"counter-reset: listcounter ";
                    str_before += (next_node["counter"] - 1);
                    str_before += "\">"
                    str_after = "</ol>" + str_after;
                }
            } else {
                str_before += "<ul class=\"nav\">";
                str_after = "</ul>" + str_after;
            }
        }
        if (i == 0) {
            toc_html.push(str_before);
            toc_html.push(str_after);
        } else {
            if (prev_node["h_level"] < this_node["h_level"]) {
                var insert_index = toc_html_label[i - 1];
            } else {
                for (j = (i - 1); j >= 0; j--) {
                    if (toc_tree[j]["h_level"] == this_node["h_level"]) {
                        var insert_index = toc_html_label[j] + 1;
                        break;
                    }
                }
            }
            toc_html.splice(insert_index, 0, str_before, str_after);
            for (j = 0; j < i; j++) {
                if (toc_html_label[j] >= insert_index) {
                    toc_html_label[j] += 2;
                }
            }
        }
        var after_index = toc_html.indexOf(str_before) + 1;
        toc_html_label.push(after_index);
    }
    var full_html = "";
    for (i = 0; i < toc_html.length; i++) {
        full_html += toc_html[i];
    }
    return full_html;
}

//from https://stackoverflow.com/questions/9083037/
function romanize(num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
        ],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}