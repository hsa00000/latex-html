var num = 0;
var label = {};

function theorem(name, info = "") {
    num++;
    document.write("<span class=\"number\"");
    if (info != "" && "label" in info) {
        document.write(" id=", info["label"]);
        label[info["label"]] = num;
    }
    document.write("><strong>", name, "</span> ", num);
    if (info != "" && "name" in info) {
        document.write(" (", info["name"], ")");
    }
    document.write(".</strong> ");
}

function ref(id) {
    document.write("<a href=#", id, ">", label[id], "</a>");
}

function eq_before() {
    num++;
    document.write("<p id=\"", "eq", num, "\" hidden>");
}

function eq_id(id) {
    var hidden_id = "eq" + num;
    var str = document.getElementById(hidden_id).innerHTML;
    document.write("<p id=", id, "></p>");
    document.write("\\begin{equation}\\tag{", num, "}");
    document.write(str);
    document.write("\\end{equation}");
    label[id] = num;
}
var section_level = ["part", "chapter", "section"];
var toc_tree = [];

function section(level, name) {
    id = name.replace(/\s+/g, '-');
    h_level = section_level.indexOf(level);
    h_level++;
    document.write("<h", h_level, " id=", id, ">", name, "</h", h_level, ">");
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
                str_before += "<ul>";
            } else {
                str_before += "<ul class=\"nav\">";
            }
            str_after = "</ul>" + str_after;
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
        console.log(i, toc_html_label, toc_html);
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