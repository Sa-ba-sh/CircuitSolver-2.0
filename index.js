function getJSON() {
    var circuit = document.getElementById("json").innerHTML;
    circuit = JSON.parse(circuit)
    console.log(circuit);

    // functionining the classes for the connection, resistor, current source, voltage source, controlled voltage and controlled current source
    class connection {
        constructor(conn_id, label_id, label_text, src_node, tar_node) {
            this.conn_id = conn_id;
            this.label_id = label_id;
            this.label_text = label_text;
            this.src_node = src_node;
            this.tar_node = tar_node;
        }
    }
    class resistor {
        constructor(
            id,
            label_id,
            inp_port_id,
            out_port_id,
            label,
            node_k,
            node_l,
            ele_code
        ) {
            this.id = id;
            this.label_id = label_id;
            this.inp_port_id = inp_port_id;
            this.out_port_id = out_port_id;
            this.label = label;
            this.node_k = node_k;
            this.node_l = node_l;
            this.ele_code = 1;
        }
    }
    class curr_src {
        constructor(
            id,
            label_id,
            inp_port_id,
            out_port_id,
            label,
            node_k,
            node_l,
            ele_code
        ) {
            this.id = id;
            this.label_id = label_id;
            this.inp_port_id = inp_port_id;
            // ## Here inp_port is the low
            this.out_port_id = out_port_id;
            // ## Here out_port is the high
            this.label = label;
            this.node_k = node_k;
            // ## The final node numbers to be used directly in our version 1 algo
            this.node_l = node_l;
            // ## The final node numbers to be used directly in our version 1 algo
            this.ele_code = 2;
        }
    }

    class volt_src {
        constructor(
            id,
            label_id,
            inp_port_id,
            out_port_id,
            label,
            node_k,
            node_l,
            ele_code
        ) {
            this.id = id;
            this.label_id = label_id;
            this.inp_port_id = inp_port_id;
            // ## Here inp_port is the low
            this.out_port_id = out_port_id;
            // ## Here out_port is the high
            this.label = label;
            this.node_k = node_k;
            // ## The final node numbers to be used directly in our version 1 algo
            this.node_l = node_l;
            // ## The final node numbers to be used directly in our version 1 algo
            this.ele_code = 3;
        }
    }

    class volt_cont_curr_src {
        constructor(
            id,
            label_id,
            inp_port_id,
            out_port_id,
            label,
            node_k,
            node_l,
            cont_high_node,
            cont_low_node,
            node_m,
            node_n,
            ele_code
        ) {
            this.id = id;
            this.label_id = label_id;
            this.inp_port_id = inp_port_id;
            // ## Here inp_port is the low
            this.out_port_id = out_port_id;
            // ## Here out_port is the high
            this.label = label;
            this.node_k = node_k;
            // ## The final node numbers to be used directly in our version 1 algo
            this.node_l = node_l;
            // ## The final node numbers to be used directly in our version 1 algo
            this.cont_high_node = cont_high_node;
            this.cont_low_node = cont_low_node;
            this.node_m = node_m;
            this.node_n = node_n;
            this.ele_code = 4;
        }
    }

    class volt_cont_volt_src {
        constructor(
            id,
            label_id,
            inp_port_id,
            out_port_id,
            label,
            node_k,
            node_l,
            cont_high_node,
            cont_low_node,
            node_m,
            node_n,
            ele_code
        ) {
            this.id = id;
            this.label_id = label_id;
            this.inp_port_id = inp_port_id;
            // ## Here inp_port is the low
            this.out_port_id = out_port_id;
            // ## Here out_port is the high
            this.label = label;
            this.node_k = node_k;
            // ## The final node numbers to be used directly in our version 1 algo
            this.node_l = node_l;
            // ## The final node numbers to be used directly in our version 1 algo
            this.cont_high_node = cont_high_node;
            this.cont_low_node = cont_low_node;
            this.node_m = node_m;
            this.node_n = node_n;
            this.ele_code = 5;
        }
    }

    class curr_cont_curr_src_gen {
        constructor(
            id,
            label_id,
            inp_port_id,
            out_port_id,
            label,
            node_k,
            node_l,
            cont_high_node,
            cont_low_node,
            node_m,
            node_n,
            ele_code
        ) {
            this.id = id;
            this.label_id = label_id;
            this.inp_port_id = inp_port_id;
            // ## Here inp_port is the low
            this.out_port_id = out_port_id;
            // ## Here out_port is the high
            this.label = label;
            this.node_k = node_k;
            // ## The final node numbers to be used directly in our version 1 algo
            this.node_l = node_l;
            // ## The final node numbers to be used directly in our version 1 algo
            this.cont_high_node = cont_high_node;
            this.cont_low_node = cont_low_node;
            this.node_m = node_m;
            this.node_n = node_n;
            this.ele_code = 6;
        }
    }

    class curr_cont_curr_src_vs {
        constructor(
            id,
            label_id,
            inp_port_id,
            out_port_id,
            label,
            node_k,
            node_l,
            cont_high_node,
            cont_low_node,
            node_m,
            node_n,
            ele_code
        ) {
            this.id = id;
            this.label_id = label_id;
            this.inp_port_id = inp_port_id;
            // ## Here inp_port is the low
            this.out_port_id = out_port_id;
            // ## Here out_port is the high
            this.label = label;
            this.node_k = node_k;
            // ## The final node numbers to be used directly in our version 1 algo
            this.node_l = node_l;
            // ## The final node numbers to be used directly in our version 1 algo
            this.cont_high_node = cont_high_node;
            this.cont_low_node = cont_low_node;
            this.node_m = node_m;
            this.node_n = node_n;
            this.ele_code = 7;
        }
    }

    class curr_cont_volt_src_gen {
        constructor(
            id,
            label_id,
            inp_port_id,
            out_port_id,
            label,
            node_k,
            node_l,
            cont_high_node,
            cont_low_node,
            node_m,
            node_n,
            ele_code
        ) {
            this.id = id;
            this.label_id = label_id;
            this.inp_port_id = inp_port_id;
            // ## Here inp_port is the low
            this.out_port_id = out_port_id;
            // ## Here out_port is the high
            this.label = label;
            this.node_k = node_k;
            // ## The final node numbers to be used directly in our version 1 algo
            this.node_l = node_l;
            // ## The final node numbers to be used directly in our version 1 algo
            this.cont_high_node = cont_high_node;
            this.cont_low_node = cont_low_node;
            this.node_m = node_m;
            this.node_n = node_n;
            this.ele_code = 8;
        }
    }

    class curr_cont_volt_src_vs {
        constructor(
            id,
            label_id,
            inp_port_id,
            out_port_id,
            label,
            node_k,
            node_l,
            cont_high_node,
            cont_low_node,
            node_m,
            node_n,
            ele_code
        ) {
            this.id = id;
            this.label_id = label_id;
            this.inp_port_id = inp_port_id;
            // ## Here inp_port is the low
            this.out_port_id = out_port_id;
            // ## Here out_port is the high
            this.label = label;
            this.node_k = node_k;
            // ## The final node numbers to be used directly in our version 1 algo
            this.node_l = node_l;
            // ## The final node numbers to be used directly in our version 1 algo
            this.cont_high_node = cont_high_node;
            this.cont_low_node = cont_low_node;
            this.node_m = node_m;
            this.node_n = node_n;
            this.ele_code = 9;
        }
    }

    function ret_type_from_id(id) {
        return element_type_list[element_id_list.indexOf(id)];
    }

    function ret_source_target_nodes_from_id(id, port_type) {
        var ele_type = ret_type_from_id(id);
        if (ele_type == "draw2d.shape.analog.ResistorVertical") {
            for (var i = 0; i < resistor_list.length; i++) {
                if (resistor_list[i].id == id) {
                    if (port_type == "hybrid0") {
                        return resistor_list[i].inp_port_id;
                    } else if (port_type == "hybrid1") {
                        return resistor_list[i].out_port_id;
                    }
                }
            }
        } else if (ele_type == "CurrentSource") {
            for (var i = 0; i < curr_src_list.length; i++) {
                if (curr_src_list[i].id == id) {
                    if (port_type == "hybrid0") {
                        return curr_src_list[i].inp_port_id;
                    } else if (port_type == "hybrid1") {
                        return curr_src_list[i].out_port_id;
                    }
                }
            }
        } else if (ele_type == "VoltageSource") {
            for (var i = 0; i < volt_src_list.length; i++) {
                if (volt_src_list[i].id == id) {
                    if (port_type == "hybrid0") {
                        return volt_src_list[i].inp_port_id;
                    } else if (port_type == "hybrid1") {
                        return volt_src_list[i].out_port_id;
                    }
                }
            }
        } else if (ele_type == "VCCS") {
            for (var i = 0; i < vccs_list.length; i++) {
                if (vccs_list[i].id == id) {
                    if (port_type == "hybrid0") {
                        return vccs_list[i].inp_port_id;
                    } else if (port_type == "hybrid1") {
                        return vccs_list[i].out_port_id;
                    }
                }
            }
        } else if (ele_type == "VCVS") {
            for (var i = 0; i < vcvs_list.length; i++) {
                if (vcvs_list[i].id == id) {
                    if (port_type == "hybrid0") {
                        return vcvs_list[i].inp_port_id;
                    } else if (port_type == "hybrid1") {
                        return vcvs_list[i].out_port_id;
                    }
                }
            }
        } else if (ele_type == "CCCS_Gen") {
            for (var i = 0; i < cccs_gen_list.length; i++) {
                if (cccs_gen_list[i].id == id) {
                    if (port_type == "hybrid0") {
                        return cccs_gen_list[i].inp_port_id;
                    } else if (port_type == "hybrid1") {
                        return cccs_gen_list[i].out_port_id;
                    }
                }
            }
        } else if (ele_type == "CCCS_Vs") {
            for (var i = 0; i < cccs_vs_list.length; i++) {
                if (cccs_vs_list[i].id == id) {
                    if (port_type == "hybrid0") {
                        return cccs_vs_list[i].inp_port_id;
                    } else if (port_type == "hybrid1") {
                        return cccs_vs_list[i].out_port_id;
                    }
                }
            }
        } else if (ele_type == "CCVS_Gen") {
            for (var i = 0; i < ccvs_gen_list.length; i++) {
                if (ccvs_gen_list[i].id == id) {
                    if (port_type == "hybrid0") {
                        return ccvs_gen_list[i].inp_port_id;
                    } else if (port_type == "hybrid1") {
                        return ccvs_gen_list[i].out_port_id;
                    }
                }
            }
        } else if (ele_type == "CCVS_Vs") {
            for (var i = 0; i < ccvs_vs_list.length; i++) {
                if (ccvs_vs_list[i].id == id) {
                    if (port_type == "hybrid0") {
                        return ccvs_vs_list[i].inp_port_id;
                    } else if (port_type == "hybrid1") {
                        return ccvs_vs_list[i].out_port_id;
                    }
                }
            }
        }
    }

    var resistor_list = [];
    var curr_src_list = [];
    var volt_src_list = [];
    var vccs_list = [];
    var vcvs_list = [];
    var cccs_gen_list = [];
    var cccs_vs_list = [];
    var ccvs_gen_list = [];
    var ccvs_vs_list = [];

    var connection_list = [];
    var element_id_list = [];
    var element_type_list = [];
    var connection_id_list = [];
    var raw_nodes_list = [];

    circuit.forEach(ele => {

        if (ele["type"] == "draw2d.shape.analog.ResistorVertical") {
            resistor_list.push(
                new resistor(
                    ele["id"],
                    ele["labels"][0]["id"],
                    ele["ports"][0]["id"],
                    ele["ports"][1]["id"],
                    ele["labels"][0]["text"],
                    -1,
                    -1,
                    1
                )
            );
            element_id_list.push(ele["id"]);
            element_type_list.push(ele["type"]);
            if (raw_nodes_list.includes(ele["ports"][0]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][0]["id"]);
            }
            if (raw_nodes_list.includes(ele["ports"][1]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][1]["id"]);
            }
        } else if (ele["type"] == "CurrentSource") {
            curr_src_list.push(
                new curr_src(
                    ele["id"],
                    ele["labels"][0]["id"],
                    ele["ports"][0]["id"],
                    ele["ports"][1]["id"],
                    ele["labels"][0]["text"],
                    -1,
                    -1,
                    2
                )
            );
            element_id_list.push(ele["id"]);
            element_type_list.push(ele["type"]);
            if (raw_nodes_list.includes(ele["ports"][0]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][0]["id"]);
            }
            if (raw_nodes_list.includes(ele["ports"][1]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][1]["id"]);
            }
        } else if (ele["type"] == "VoltageSource") {
            volt_src_list.push(
                new volt_src(
                    ele["id"],
                    ele["labels"][0]["id"],
                    ele["ports"][0]["id"],
                    ele["ports"][1]["id"],
                    ele["labels"][0]["text"],
                    -1,
                    -1,
                    3
                )
            );
            element_id_list.push(ele["id"]);
            element_type_list.push(ele["type"]);
            if (raw_nodes_list.includes(ele["ports"][0]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][0]["id"]);
            }
            if (raw_nodes_list.includes(ele["ports"][1]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][1]["id"]);
            }
        } else if (ele["type"] == "VCCS") {
            vccs_list.push(
                new volt_cont_curr_src(
                    ele["id"],
                    ele["labels"][0]["id"],
                    ele["ports"][0]["id"],
                    ele["ports"][1]["id"],
                    ele["labels"][0]["text"],
                    -1,
                    -1,
                    4
                )
            );
            element_id_list.push(ele["id"]);
            element_type_list.push(ele["type"]);
            if (raw_nodes_list.includes(ele["ports"][0]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][0]["id"]);
            }
            if (raw_nodes_list.includes(ele["ports"][1]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][1]["id"]);
            }
        } else if (ele["type"] == "VCVS") {
            vcvs_list.push(
                new volt_cont_volt_src(
                    ele["id"],
                    ele["labels"][0]["id"],
                    ele["ports"][0]["id"],
                    ele["ports"][1]["id"],
                    ele["labels"][0]["text"],
                    -1,
                    -1,
                    5
                )
            );
            element_id_list.push(ele["id"]);
            element_type_list.push(ele["type"]);
            if (raw_nodes_list.includes(ele["ports"][0]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][0]["id"]);
            }
            if (raw_nodes_list.includes(ele["ports"][1]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][1]["id"]);
            }
        } else if (ele["type"] == "CCCS_Gen") {
            cccs_gen_list.push(
                new curr_cont_curr_src_gen(
                    ele["id"],
                    ele["labels"][0]["id"],
                    ele["ports"][0]["id"],
                    ele["ports"][1]["id"],
                    ele["labels"][0]["text"],
                    -1,
                    -1,
                    6
                )
            );
            element_id_list.push(ele["id"]);
            element_type_list.push(ele["type"]);
            if (raw_nodes_list.includes(ele["ports"][0]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][0]["id"]);
            }
            if (raw_nodes_list.includes(ele["ports"][1]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][1]["id"]);
            }
        } else if (ele["type"] == "CCCS_Vs") {
            cccs_vs_list.push(
                new curr_cont_curr_src_vs(
                    ele["id"],
                    ele["labels"][0]["id"],
                    ele["ports"][0]["id"],
                    ele["ports"][1]["id"],
                    ele["labels"][0]["text"],
                    -1,
                    -1,
                    7
                )
            );
            element_id_list.push(ele["id"]);
            element_type_list.push(ele["type"]);
            if (raw_nodes_list.includes(ele["ports"][0]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][0]["id"]);
            }
            if (raw_nodes_list.includes(ele["ports"][1]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][1]["id"]);
            }
        } else if (ele["type"] == "CCVS_Gen") {
            ccvs_gen_list.push(
                new curr_cont_volt_src_gen(
                    ele["id"],
                    ele["labels"][0]["id"],
                    ele["ports"][0]["id"],
                    ele["ports"][1]["id"],
                    ele["labels"][0]["text"],
                    -1,
                    -1,
                    8
                )
            );
            element_id_list.push(ele["id"]);
            element_type_list.push(ele["type"]);
            if (raw_nodes_list.includes(ele["ports"][0]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][0]["id"]);
            }
            if (raw_nodes_list.includes(ele["ports"][1]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][1]["id"]);
            }
        } else if (ele["type"] == "CCVS_Vs") {
            ccvs_vs_list.push(
                new curr_cont_volt_src_vs(
                    ele["id"],
                    ele["labels"][0]["id"],
                    ele["ports"][0]["id"],
                    ele["ports"][1]["id"],
                    ele["labels"][0]["text"],
                    -1,
                    -1,
                    9
                )
            );
            element_id_list.push(ele["id"]);
            element_type_list.push(ele["type"]);
            if (raw_nodes_list.includes(ele["ports"][0]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][0]["id"]);
            }
            if (raw_nodes_list.includes(ele["ports"][1]["id"] == false)) {
                raw_nodes_list.push(ele["ports"][1]["id"]);
            }
        }
    })

    circuit.forEach(ele => {
        if (ele["type"] == "draw2d.Connection") {
            connection_list.push(
                new connection(
                    ele["id"],
                    ele["labels"][0]["id"],
                    ele["labels"][0]["text"],
                    ret_source_target_nodes_from_id(
                        ele["source"]["node"],
                        ele["source"]["port"]
                    ),
                    ret_source_target_nodes_from_id(
                        ele["target"]["node"],
                        ele["target"]["port"]
                    )
                )
            );
            connection_id_list.push(ele["id"]);
        }
    })
    function generate_node_list() {
        var nodes_list = [];
        var added_list = [];
        var cnt = 1;
        console.log("connection_list", connection_list);
        connection_list.forEach((conn) => {
            if (nodes_list.length == 0) {
                console.log(conn.src_node, conn.tar_node);
                nodes_list.push([0, [conn.src_node, conn.tar_node]]);
                added_list.push(conn.src_node);
                added_list.push(conn.tar_node);
                console.log("First if")
            } else if (
                added_list.includes(conn.src_node) == false &&
                added_list.includes(conn.tar_node)
            ) {
                nodes_list.forEach((n) => {
                    if (n[1].includes(conn.tar_node)) {
                        n[1].push(conn.src_node);
                        added_list.push(conn.src_node);
                    }
                });
            } else if (
                added_list.includes(conn.tar_node) == false &&
                added_list.includes(conn.src_node)
            ) {
                nodes_list.forEach((n) => {
                    if (n[1].includes(conn.src_node)) {
                        n[1].push(conn.tar_node);
                        added_list.push(conn.tar_node);
                    }
                });
            } else {
                nodes_list.push([cnt, [conn.src_node, conn.tar_node]]);
                added_list.push(conn.src_node);
                added_list.push(conn.tar_node);
                cnt += 1;
            }
        });
        for (var i = 0; i < nodes_list.length; i++) {
            for (var j = 0; j < nodes_list.length - i - 1; j++) {
                if (nodes_list[j][1].length > nodes_list[j + 1][1].length) {
                    var temp = nodes_list[j];
                    nodes_list[j] = nodes_list[j + 1];
                    nodes_list[j + 1] = temp;
                }
            }
        }
        return nodes_list;
    }
    nodes_list = generate_node_list();
    console.log("nodes_list", nodes_list);
    //  It is the one that contains the final mapping of the number of nodes

    function return_node_num_from_port_id(port_id) {
        // nodes_list.forEach(n => {
        //     if (n[1].includes(port_id)) {
        //         console.log("n[0]: ", n[0]);
        //         return n[0];
        //     }
        // });
        for (var i = 0; i < nodes_list.length; i++) {
            if (nodes_list[i][1].includes(port_id)) {
                return nodes_list[i][0];
            }
        }
    }
    function ret_src_tar_node_from_conn_label(text) {
        var value = connection_list.forEach((conn) => {
            if (conn.label_text == text) {
                console.log("name", conn.src_node, conn.tar_node);
                return conn.src_node, conn.tar_node;
            }
        });
        return value;
    }
    function ret_node_m_or_n(text) {
        res = ret_src_tar_node_from_conn_label(text);
        console.log("res:", res);
        p1 = return_node_num_from_port_id(res[0]);
        p2 = return_node_num_from_port_id(res[1]);
        if (p1 == p2) {
            return p1;
        }
    }

    resistor_list.forEach((ele) => {
        console.log(return_node_num_from_port_id(ele.inp_port_id));
        ele.node_k = return_node_num_from_port_id(ele.inp_port_id);
        ele.node_l = return_node_num_from_port_id(ele.out_port_id);
        // console.log(ele.node_k);

    });

    curr_src_list.forEach((ele) => {
        ele.node_k = return_node_num_from_port_id(ele.inp_port_id)
        ele.node_l = return_node_num_from_port_id(ele.out_port_id)
    })

    volt_src_list.forEach((ele) => {
        ele.node_k = return_node_num_from_port_id(ele.inp_port_id)
        ele.node_l = return_node_num_from_port_id(ele.out_port_id)
    })

    vccs_list.forEach((ele) => {
        ele.node_k = return_node_num_from_port_id(ele.inp_port_id)
        ele.node_l = return_node_num_from_port_id(ele.out_port_id)
        ele.node_m = ret_node_m_or_n(ele.cont_high_node)
        ele.node_n = ret_node_m_or_n(ele.cont_low_node)

    })

    vcvs_list.forEach((ele) => {
        ele.node_k = return_node_num_from_port_id(ele.inp_port_id)
        ele.node_l = return_node_num_from_port_id(ele.out_port_id)
        ele.node_m = ret_node_m_or_n(ele.cont_high_node)
        ele.node_n = ret_node_m_or_n(ele.cont_low_node)

    })

    cccs_gen_list.forEach((ele) => {
        ele.node_k = return_node_num_from_port_id(ele.inp_port_id)
        ele.node_l = return_node_num_from_port_id(ele.out_port_id)
        ele.node_m = ret_node_m_or_n(ele.cont_high_node)
        ele.node_n = ret_node_m_or_n(ele.cont_low_node)

    })

    cccs_vs_list.forEach((ele) => {
        ele.node_k = return_node_num_from_port_id(ele.inp_port_id)
        ele.node_l = return_node_num_from_port_id(ele.out_port_id)
        ele.node_m = ret_node_m_or_n(ele.cont_high_node)
        ele.node_n = ret_node_m_or_n(ele.cont_low_node)

    })

    cccs_gen_list.forEach((ele) => {
        ele.node_k = return_node_num_from_port_id(ele.inp_port_id)
        ele.node_l = return_node_num_from_port_id(ele.out_port_id)
        ele.node_m = ret_node_m_or_n(ele.cont_high_node)
        ele.node_n = ret_node_m_or_n(ele.cont_low_node)

    })

    cccs_vs_list.forEach((ele) => {
        ele.node_k = return_node_num_from_port_id(ele.inp_port_id)
        ele.node_l = return_node_num_from_port_id(ele.out_port_id)
        ele.node_m = ret_node_m_or_n(ele.cont_high_node)
        ele.node_n = ret_node_m_or_n(ele.cont_low_node)

    })
    console.log("Number of nodes(inc. ref node) : ", nodes_list.length)
    console.log("Number ofelements : ", element_id_list.length)
    console.log("Resistors")
    resistor_list.forEach(ele => {

        console.log(ele.label, ele.node_k, ele.node_l)
    })
    console.log("Current_src")
    curr_src_list.forEach(ele => {
        console.log(ele.label, ele.node_k, ele.node_l)
    })
    console.log("Volatge_src")
    volt_src_list.forEach(ele => {
        console.log(ele.label, ele.node_k, ele.node_l)
    })
    console.log("VCCS")
    vccs_list.forEach(ele => {
        console.log(ele.label, ele.node_k, ele.node_l, ele.node_m, ele.node_n)
    })
    console.log("VCVS")
    vcvs_list.forEach(ele => {
        console.log(ele.label, ele.node_k, ele.node_l, ele.node_m, ele.node_n)
    })
    console.log("CCCS_Gen")
    cccs_gen_list.forEach(ele => {
        console.log(ele.label, ele.node_k, ele.node_l, ele.node_m, ele.node_n)
    });
    console.log("CCCS")
    cccs_vs_list.forEach(ele => {
        console.log(ele.label, ele.node_k, ele.node_l, ele.node_m, ele.node_n)
    })
    console.log("CCVS_Gen")
    ccvs_gen_list.forEach(ele => {
        console.log(ele.label, ele.node_k, ele.node_l, ele.node_m, ele.node_n)
    })
    console.log("CCVS")
    ccvs_vs_list.forEach(ele => {
        console.log(ele.label, ele.node_k, ele.node_l, ele.node_m, ele.node_n)
    })

}