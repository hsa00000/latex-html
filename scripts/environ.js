var theoremcounter = 0;
var section_level = ["part", "chapter", "section"];
var levelcounter = {"part":0, "chapter":0, "section":0};
var toc_tree = [];
var label = {};

function theorem(name, info = "") {
    theoremcounter++;
    document.write("<span");
    if (info != "" && "label" in info) {
        document.write(" id=", info["label"]);
        label[info["label"]] = [levelcounter["section"], theoremcounter];
    }
    document.write("><strong>", name, "</span> ", levelcounter["section"], ".", theoremcounter);
    if (info != "" && "name" in info) {
        document.write(" (", info["name"], ")");
    }
    document.write(".</strong> ");
    if (info != "" && "label" in info) {
        var id = info["label"];
        qstr = "[href='#" + id + "']";
        var beforeref = document.querySelectorAll(qstr);
        for (i = 0; i < beforeref.length; i++){
             beforeref[i].innerHTML = label[id][0] + "." + label[id][1];
        }
    }
}

function ref(id) {
    document.write("<a href=#", id, ">", label[id][0], ".", label[id][1], "</a>");
}

function eq_before() {
    theoremcounter++;
    document.write("<p id=\"", "eq", theoremcounter, "\" hidden>");
}

function eq_id(id) {
    var hidden_id = "eq" + theoremcounter;
    var str = document.getElementById(hidden_id).innerHTML;
    document.write("<p id=", id, "></p>");
    document.write("\\begin{equation}\\tag{", levelcounter["section"], ".", theoremcounter, "}");
    document.write(str);
    document.write("\\end{equation}");
    label[id] = [levelcounter["section"], theoremcounter];
}


function section(level, name) {
    levelcounter[level]++;
    id = name.replace(/\s+/g, '-');
    h_level = section_level.indexOf(level);
    h_level++;
    document.write("<h", h_level, " id=", id, ">");
    if (level == "chapter"){
        document.write(romanize(levelcounter[level]),". ");
    }else if(level == "section"){
        document.write(levelcounter[level],". ");
    }
    document.write(name, "</h", h_level, ">");
    toc_tree.push({
        "h_level": h_level,
        "id": id,
        "name": name
    });
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
        var str_before = "<li><a href=\"#" + this_node["id"] + "\">" + this_node["name"] + "</a>";
        var str_after = "</li>";
        if (next_node["h_level"] > this_node["h_level"]) {
            if (attr == "page") {
                if (next_node["h_level"] == 1){
                    str_before += "<ul>";
                    str_after = "</ul>" + str_after;
                }else if(next_node["h_level"] == 2){
                    str_before += "<ol class=\"upperroman\">";
                    str_after = "</ol>" + str_after;
                }else{
                    str_before += "<ol>";
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
    if (attr == "page") {
        var full_html = "";
        for (i = 0; i < toc_html.length; i++) {
            full_html += toc_html[i];
        }
        return full_html;
    } else {
        for (i = 0; i < toc_html.length; i++) {
            document.write(toc_html[i]);
        }
    }

}
//from https://stackoverflow.com/questions/9083037/
function romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}