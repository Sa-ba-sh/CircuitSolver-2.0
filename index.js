var router = new draw2d.layout.connection.CircuitConnectionRouter();
router.abortRoutingOnFirstVertexNode = false;
var createConnection = function (sourcePort, targetPort) {
  var c = new draw2d.Connection({
    outlineColor: "#ffffff",
    outlineStroke: 1,
    color: "#000000",
    router: router,
    stroke: 1,
    radius: 2,
  });
  if (sourcePort) {
    c.setSource(sourcePort);
    c.setTarget(targetPort);
  }
  return c;
};
var circuit = [];
document.addEventListener("DOMContentLoaded", function () {
  // var canvas = new draw2d.Canvas("gfx_holder");
  app = new example.Application();
  console.log("before: ", app.view);
  // app.view.installEditPolicy(
  //   new draw2d.policy.connection.DragConnectionCreatePolicy({
  //     createConnection: function () {
  //       return new HoverConnection();
  //     },
  //   })
  // );
  // setTimeout(function () {
  //   updatePreview(app.view);
  // }, 1);
  app.view.installEditPolicy(
    new draw2d.policy.canvas.FadeoutDecorationPolicy()
  );

  app.view.installEditPolicy(
    new draw2d.policy.connection.ComposedConnectionCreatePolicy([
      // create a connection via Drag&Drop of ports
      //
      new draw2d.policy.connection.DragConnectionCreatePolicy({
        createConnection: createConnection,
      }),
      // or via click and point
      //
      new draw2d.policy.connection.OrthogonalConnectionCreatePolicy({
        createConnection: createConnection,
      }),
    ])
  );
  $(".show").on("click", function () {
    $(".mask").addClass("active");
  });

  // Function for close the Modal

  function closeModal() {
    $(".mask").removeClass("active");
  }

  // Call the closeModal function on the clicks/keyboard

  $(".close").on("click", function () {
    closeModal();
  });

  $(document).keyup(function (e) {
    if (e.keyCode == 27) {
      closeModal();
    }
  });
  // Create a Connection and connect he Start and End node
  //

  // display the JSON text in the preview DIV
  //
  // var reader = new draw2d.io.json.Reader();
  // reader.unmarshal(app.view, jsonDocument);

  // display the JSON document in the preview DIV
  //

  displayJSON(app.view);

  app.view.getCommandStack().addEventListener(function (e) {
    if (e.isPostChangeEvent()) {
      displayJSON(app.view);
      updatePreview(app.view);
    }
  });
});
document.getElementById("json").style.display = "none";

function displayJSON(canvas) {
  var writer = new draw2d.io.json.Writer();
  writer.marshal(canvas, function (json) {
    $("#json").text(JSON.stringify(json, null, 2));
  });
  // Click function for show the Modal
}
function updatePreview(canvas) {
  // convert the canvas into a PNG image source string
  //
  var xCoords = [];
  var yCoords = [];
  canvas.getFigures().each(function (i, f) {
    var b = f.getBoundingBox();
    xCoords.push(b.x, b.x + b.w);
    yCoords.push(b.y, b.y + b.h);
  });
  var minX = Math.min.apply(Math, xCoords) - 40;
  var minY = Math.min.apply(Math, yCoords) - 40;
  var width = Math.max.apply(Math, xCoords) - minX + 40;
  console.log("width:", width);
  var height = Math.max.apply(Math, yCoords) - minY + 40;
  console.log("height:", height);

  var writer = new draw2d.io.png.Writer();
  writer.marshal(
    canvas,
    function (png) {
      $("#preview").attr("src", png);
    },
    new draw2d.geo.Rectangle(minX, minY, width, height)
  );
}

// document.getElementById("json").style.display = "none";

function getJSON() {
  circuit = document.getElementById("json").innerHTML;
  circuit = JSON.parse(circuit);
  console.log("JSON_initial: ", circuit);

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
    if (ele_type == "Resistor") {
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

  circuit.forEach((ele) => {
    if (ele["type"] == "Resistor") {
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
          ele["labels"][1]["text"],
          ele["labels"][2]["text"],
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
          ele["labels"][1]["text"],
          ele["labels"][2]["text"],
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
          ele["labels"][1]["text"],
          ele["labels"][2]["text"],
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
          ele["labels"][1]["text"],
          ele["labels"][2]["text"],
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
          ele["labels"][1]["text"],
          ele["labels"][2]["text"],
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
          ele["labels"][1]["text"],
          ele["labels"][2]["text"],
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
  });

  circuit.forEach((ele) => {
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
  });
  function generate_node_list() {
    var nodes_list = [];
    var added_list = [];
    var cnt = 1;
    // console.log("connection_list", connection_list);
    connection_list.forEach((conn) => {
      if (nodes_list.length == 0) {
        // console.log(conn.src_node, conn.tar_node);
        nodes_list.push([0, [conn.src_node, conn.tar_node]]);
        added_list.push(conn.src_node);
        added_list.push(conn.tar_node);
        // console.log("First if");
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
    nodes_list.reverse();
    for (var i = 0; i < nodes_list.length; i++) {
      nodes_list[i][0] = i;
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
    // var value = connection_list.forEach((conn) => {
    //   if (conn.label_text == text) {
    //     console.log("name", conn.src_node, conn.tar_node);
    //     return conn.src_node, conn.tar_node;
    //   }
    // });
    // return value;
    for (var i = 0; i < connection_list.length; i++) {
      if (connection_list[i].label_text == text) {
        return [connection_list[i].src_node, connection_list[i].tar_node];
      }
    }
  }
  function ret_node_m_or_n(text) {
    var res = ret_src_tar_node_from_conn_label(text);
    // console.log("res:", res);
    var p1 = return_node_num_from_port_id(res[0]);
    var p2 = return_node_num_from_port_id(res[1]);
    if (p1 == p2) {
      return p1;
    }
  }

  resistor_list.forEach((ele) => {
    // console.log(return_node_num_from_port_id(ele.inp_port_id));
    ele.node_k = return_node_num_from_port_id(ele.inp_port_id);
    ele.node_l = return_node_num_from_port_id(ele.out_port_id);
    // console.log(ele.node_k);
  });

  curr_src_list.forEach((ele) => {
    ele.node_k = return_node_num_from_port_id(ele.out_port_id);
    ele.node_l = return_node_num_from_port_id(ele.inp_port_id);
  });

  volt_src_list.forEach((ele) => {
    ele.node_k = return_node_num_from_port_id(ele.out_port_id);
    ele.node_l = return_node_num_from_port_id(ele.inp_port_id);
  });

  vccs_list.forEach((ele) => {
    ele.node_k = return_node_num_from_port_id(ele.inp_port_id);
    ele.node_l = return_node_num_from_port_id(ele.out_port_id);
    ele.node_m = ret_node_m_or_n(ele.cont_high_node);
    ele.node_n = ret_node_m_or_n(ele.cont_low_node);
  });

  vcvs_list.forEach((ele) => {
    ele.node_k = return_node_num_from_port_id(ele.out_port_id);
    ele.node_l = return_node_num_from_port_id(ele.inp_port_id);
    ele.node_m = ret_node_m_or_n(ele.cont_high_node);
    ele.node_n = ret_node_m_or_n(ele.cont_low_node);
  });

  cccs_gen_list.forEach((ele) => {
    ele.node_k = return_node_num_from_port_id(ele.inp_port_id);
    ele.node_l = return_node_num_from_port_id(ele.out_port_id);
    ele.node_m = ret_node_m_or_n(ele.cont_high_node);
    ele.node_n = ret_node_m_or_n(ele.cont_low_node);
  });

  cccs_vs_list.forEach((ele) => {
    ele.node_k = return_node_num_from_port_id(ele.inp_port_id);
    ele.node_l = return_node_num_from_port_id(ele.out_port_id);
    ele.node_m = ret_node_m_or_n(ele.cont_high_node);
    ele.node_n = ret_node_m_or_n(ele.cont_low_node);
  });

  ccvs_gen_list.forEach((ele) => {
    ele.node_k = return_node_num_from_port_id(ele.out_port_id);
    ele.node_l = return_node_num_from_port_id(ele.inp_port_id);
    ele.node_m = ret_node_m_or_n(ele.cont_high_node);
    ele.node_n = ret_node_m_or_n(ele.cont_low_node);
  });

  ccvs_vs_list.forEach((ele) => {
    ele.node_k = return_node_num_from_port_id(ele.out_port_id);
    ele.node_l = return_node_num_from_port_id(ele.inp_port_id);
    ele.node_m = ret_node_m_or_n(ele.cont_high_node);
    ele.node_n = ret_node_m_or_n(ele.cont_low_node);
  });
  function update_conn_label() {
    for (var i = 0; i < connection_list.length; i++) {
      connection_list[i].label_text = return_node_num_from_port_id(
        connection_list[i].src_node
      );
    }
    app.view.lines.data.forEach((ele) => {
      console.log("ele: ", ele);
      connection_list.forEach((conn) => {
        if (conn.conn_id == ele["id"]) {
          console.log("Comes");
          ele.label.setText(conn.label_text);
        }
      });
    });
  }
  update_conn_label();
  console.log("Number of nodes(inc. ref node) : ", nodes_list.length);
  console.log("Number ofelements : ", element_id_list.length);
  console.log("Resistors");
  resistor_list.forEach((ele) => {
    console.log(ele.label, ele.node_k, ele.node_l);
  });
  console.log("Current_src");
  curr_src_list.forEach((ele) => {
    console.log(ele.label, ele.node_k, ele.node_l);
  });
  console.log("Volatge_src");
  volt_src_list.forEach((ele) => {
    console.log(ele.label, ele.node_k, ele.node_l);
  });
  console.log("VCCS");
  vccs_list.forEach((ele) => {
    console.log(ele.label, ele.node_k, ele.node_l, ele.node_m, ele.node_n);
  });
  console.log("VCVS");
  vcvs_list.forEach((ele) => {
    console.log(ele.label, ele.node_k, ele.node_l, ele.node_m, ele.node_n);
  });
  console.log("CCCS_Gen");
  cccs_gen_list.forEach((ele) => {
    console.log(ele.label, ele.node_k, ele.node_l, ele.node_m, ele.node_n);
  });
  console.log("CCCS_Vs");
  cccs_vs_list.forEach((ele) => {
    console.log(ele.label, ele.node_k, ele.node_l, ele.node_m, ele.node_n);
  });
  console.log("CCVS_Gen");
  ccvs_gen_list.forEach((ele) => {
    console.log(ele.label, ele.node_k, ele.node_l, ele.node_m, ele.node_n);
  });
  console.log("CCVS_Vs");
  ccvs_vs_list.forEach((ele) => {
    console.log(ele.label, ele.node_k, ele.node_l, ele.node_m, ele.node_n);
  });
  console.log("JSON_final: ", circuit);

  updatePreview(app.view);
  console.log("app.view_after: ", app.view);
  displayJSON(app.view);

  var nodes = nodes_list.length - 1;

  var size = parseInt(nodes + volt_src_list.length + vcvs_list.length);
  var cond_matrix = Array(size)
    .fill()
    .map(() => Array(size).fill(0));

  var curr_matrix = Array(size)
    .fill()
    .map(() => Array(1).fill(0));

  var var_matrix = Array(size)
    .fill()
    .map(() => Array(1).fill(0));

  var var_list = [];
  for (var i = 0; i < nodes; i++) {
    var_list.push("V_" + String(i + 1));
  }

  var obj_volt_src_cnt = 0;
  var obj_vccs_cnt = 0; // Variable for selecting the apt column if the element is a vccs
  var obj_vcvs_cnt = 0;
  var obj_cccs_gen_cnt = 0;
  var obj_cccs_vs_cnt = 0;
  var obj_ccvs_gen_cnt = 0;
  var obj_ccvs_vs_cnt = 0;

  for (var obj = 0; obj < curr_src_list.length; obj++) {
    // Contributes only to cuurent matrix
    var n_k = parseInt(curr_src_list[obj].node_k) - 1;
    var n_l = parseInt(curr_src_list[obj].node_l) - 1;
    var current = parseFloat(curr_src_list[obj].label);

    if (n_k != -1 && n_l != -1) {
      curr_matrix[n_k][0] += current;
      curr_matrix[n_l][0] -= current;
    } else if (n_k == -1 && n_l != -1) {
      curr_matrix[n_l][0] -= current;
    } else if (n_k != -1 && n_l == -1) {
      curr_matrix[n_k][0] += current;
    }
  }
  for (var obj = 0; obj < volt_src_list.length; obj++) {
    //  The following code is only when there is one voltage source in the circuit
    // Contributes to both current and conductance matrix
    var n_k = parseInt(volt_src_list[obj].node_k) - 1;
    var n_l = parseInt(volt_src_list[obj].node_l) - 1;

    var voltage = parseFloat(volt_src_list[obj].label);
    var count = 0;
    var new_var = "I_" + String(n_k + 1) + "_" + String(n_l + 1);
    for (var i = 0; i < var_list.length; i++) {
      if (var_list[i] == new_var) {
        count = count + 1;
      }
    }
    if (count == 0) {
      var_list.push(new_var);
    }
    var idx = var_list.indexOf(new_var);
    if (n_k != -1 && n_l != -1) {
      cond_matrix[n_k][idx] += 1;
      cond_matrix[n_l][idx] -= 1;
      cond_matrix[idx][n_k] += 1;
      cond_matrix[idx][n_l] -= 1;

      curr_matrix[idx][0] += voltage;
      obj_volt_src_cnt += 1;
    } else if (n_k == -1 && n_l != -1) {
      cond_matrix[n_l][idx] -= 1;
      cond_matrix[idx][n_l] -= 1;

      curr_matrix[idx][0] += voltage;

      obj_volt_src_cnt += 1;
    } else if (n_l == -1 && n_k != -1) {
      cond_matrix[n_k][idx] += 1;
      cond_matrix[idx][n_k] += 1;

      curr_matrix[idx][0] += voltage;

      obj_volt_src_cnt += 1;
    }
  }

  for (var obj = 0; obj < vccs_list.length; obj++) {
    var n_k = parseInt(vccs_list[obj].node_k) - 1;
    var n_l = parseInt(vccs_list[obj].node_l) - 1;

    var ctrl_n_m = parseInt(vccs_list[obj].node_m) - 1;
    var ctrl_n_n = parseInt(vccs_list[obj].node_n) - 1;

    var transconductance = parseFloat(vccs_list[obj].label);
    if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][ctrl_n_m] += transconductance;
      cond_matrix[n_k][ctrl_n_n] -= transconductance;
      cond_matrix[n_l][ctrl_n_m] -= transconductance;
      cond_matrix[n_l][ctrl_n_n] += transconductance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_l][ctrl_n_m] -= transconductance;
      cond_matrix[n_l][ctrl_n_n] += transconductance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][ctrl_n_m] += transconductance;
      cond_matrix[n_k][ctrl_n_n] -= transconductance;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][ctrl_n_n] -= transconductance;
      cond_matrix[n_l][ctrl_n_n] += transconductance;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_k][ctrl_n_m] += transconductance;
      cond_matrix[n_l][ctrl_n_m] -= transconductance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_l][ctrl_n_n] += transconductance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_l][ctrl_n_m] -= transconductance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][ctrl_n_n] -= transconductance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_k][ctrl_n_m] += transconductance;
    }
  }
  for (var obj = 0; obj < vcvs_list.length; obj++) {
    var n_k = parseInt(vcvs_list[obj].node_k) - 1;
    var n_l = parseInt(vcvs_list[obj].node_l) - 1;

    var ctrl_n_m = parseInt(vcvs_list[obj].node_m) - 1;
    var ctrl_n_n = parseInt(vcvs_list[obj].node_n) - 1;

    var ctrl_ftr = parseFloat(vcvs_list[obj].label);
    var new_var = "I_" + String(n_k + 1) + "_" + String(n_l + 1);
    var count = 0;
    for (var i = 0; i < var_list.length; i++) {
      if (var_list[i] == new_var) {
        count = count + 1;
      }
    }
    if (count == 0) {
      var_list.push(new_var);
    }

    var idx = var_list.indexOf(new_var);

    if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[idx][n_k] += 1;
      cond_matrix[idx][n_l] -= 1;
      cond_matrix[idx][ctrl_n_m] -= ctrl_ftr;
      cond_matrix[idx][ctrl_n_n] += ctrl_ftr;
      cond_matrix[n_k][idx] += 1;
      cond_matrix[n_l][idx] -= 1;

      obj_vcvs_cnt += 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[idx][n_l] -= 1;
      cond_matrix[idx][ctrl_n_m] -= ctrl_ftr;
      cond_matrix[idx][ctrl_n_n] += ctrl_ftr;
      cond_matrix[n_l][idx] -= 1;

      obj_vcvs_cnt += 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[idx][n_k] += 1;
      cond_matrix[idx][ctrl_n_m] -= ctrl_ftr;
      cond_matrix[idx][ctrl_n_n] += ctrl_ftr;
      cond_matrix[n_k][idx] += 1;

      obj_vcvs_cnt += 1;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[idx][n_k] += 1;
      cond_matrix[idx][n_l] -= 1;
      cond_matrix[idx][ctrl_n_n] += ctrl_ftr;
      cond_matrix[n_k][idx] += 1;
      cond_matrix[n_l][idx] -= 1;

      obj_vcvs_cnt += 1;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[idx][n_k] += 1;
      cond_matrix[idx][n_l] -= 1;
      cond_matrix[idx][ctrl_n_m] -= ctrl_ftr;
      cond_matrix[n_k][idx] += 1;
      cond_matrix[n_l][idx] -= 1;

      obj_vcvs_cnt += 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[idx][n_l] -= 1;
      cond_matrix[idx][ctrl_n_n] += ctrl_ftr;
      cond_matrix[n_l][idx] -= 1;

      obj_vcvs_cnt += 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[idx][n_l] -= 1;
      cond_matrix[idx][ctrl_n_m] -= ctrl_ftr;
      cond_matrix[n_l][idx] -= 1;

      obj_vcvs_cnt += 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[idx][n_k] += 1;
      cond_matrix[idx][ctrl_n_n] += ctrl_ftr;
      cond_matrix[n_k][idx] += 1;

      obj_vcvs_cnt += 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[idx][n_k] += 1;
      cond_matrix[idx][ctrl_n_m] -= ctrl_ftr;
      cond_matrix[n_k][idx] += 1;

      obj_vcvs_cnt += 1;
    }
  }

  for (var obj = 0; obj < cccs_gen_list.length; obj++) {
    var n_k = parseInt(cccs_gen_list[obj].node_k) - 1;
    var n_l = parseInt(cccs_gen_list[obj].node_l) - 1;
    var ctrl_n_m = parseInt(cccs_gen_list[obj].node_m) - 1;
    var ctrl_n_n = parseInt(cccs_gen_list[obj].node_n) - 1;
    var ctrl_ftr = parseFloat(cccs_gen_list[obj].label);

    var new_var_V = "V_" + String(ctrl_n_m + 1) + "_";

    var var_list1 = var_list.slice(0, ctrl_n_m + 1);
    var_list1.push(new_var_V);
    var_list2 = var_list1.concat(var_list.slice(ctrl_n_m + 1));
    var_list = var_list2;

    var cond_matrix1 = cond_matrix.slice(0, ctrl_n_m + 1);
    cond_matrix1.push(Array(size).fill(0));
    cond_matrix1 = cond_matrix1.concat(cond_matrix.slice(ctrl_n_m + 1));
    cond_matrix = cond_matrix1;

    var cond_matrix2 = cond_matrix
      .slice(0)
      .map((i) => i.slice(0, ctrl_n_m + 1));
    var cond_matrix_two = cond_matrix2;

    var cond_matrix3 = cond_matrix.slice(0).map((i) => i.slice(ctrl_n_m + 1));
    for (var j = 0; j < cond_matrix2.length; j++) {
      cond_matrix2[j][cond_matrix2[j].length] = 0;
    }

    var cond_matrix4 = [];
    for (var i = 0; i < cond_matrix2.length; i++) {
      cond_matrix4[i] = cond_matrix2[i].concat(cond_matrix3[i]);
    }
    cond_matrix = cond_matrix4;
    curr_matrix1 = curr_matrix.slice(0, ctrl_n_m + 1);
    curr_matrix1.push(Array(1).fill(0));
    curr_matrix1 = curr_matrix1.concat(curr_matrix.slice(ctrl_n_m + 1));
    curr_matrix = curr_matrix1;

    var new_var_I = "I_" + String(ctrl_n_m + 1) + "_" + String(ctrl_n_n + 1);
    var_list.push(new_var_I);
    cond_matrix.push(Array(cond_matrix[0].length).fill(0));
    var cond_matrix_check = cond_matrix;
    var length = cond_matrix.length;
    for (var k = 0; k < length; k++) {
      cond_matrix[k] = cond_matrix[k].concat(0);
    }
    curr_matrix.push(Array(1).fill(0));

    var i_mn = var_list.indexOf(
      "I_" + String(ctrl_n_m + 1) + "_" + String(ctrl_n_n + 1)
    );
    if (n_k != -1) {
      n_k = var_list.indexOf("V_" + String(n_k + 1));
    }
    if (n_l != -1) {
      n_l = var_list.indexOf("V_" + String(n_l + 1));
    }
    if (ctrl_n_m != -1) {
      ctrl_n_m = var_list.indexOf("V_" + String(ctrl_n_m + 1));
      ctrl_n_n = var_list.indexOf("V_" + String(ctrl_n_m + 1));
    }

    if (n_k != -1 && n_l != -1 && ctrl_n_m != -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1) {
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m == -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m == -1) {
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m == -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
    }
  }
  for (var obj = 0; obj < cccs_vs_list.length; obj++) {
    var n_k = parseInt(cccs_vs_list[obj].node_k) - 1;
    var n_l = parseInt(cccs_vs_list[obj].node_l) - 1;
    var ctrl_n_m = parseInt(cccs_vs_list[obj].node_m) - 1;
    var ctrl_n_n = parseInt(cccs_vs_list[obj].node_n) - 1;
    var ctrl_ftr = parseFloat(cccs_vs_list[obj].label);

    var i_mn = var_list.indexOf(
      "I_" + String(ctrl_n_m + 1) + "_" + String(ctrl_n_n + 1)
    );
    if (n_k != -1) {
      n_k = var_list.indexOf("V_" + String(n_k + 1));
    }
    if (n_l != -1) {
      n_l = var_list.indexOf("V_" + String(n_l + 1));
    }
    if (ctrl_n_m != -1) {
      ctrl_n_m = var_list.indexOf("V_" + String(ctrl_n_m + 1));
    }
    if (ctrl_n_n != -1) {
      ctrl_n_n = var_list.indexOf("V_" + String(ctrl_n_m + 1));
    }

    if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_l][i_mn] -= ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_k][i_mn] += ctrl_ftr;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
    }
  }
  for (var obj = 0; obj < ccvs_gen_list.length; obj++) {
    var n_k = parseInt(ccvs_gen_list[obj].node_k) - 1;
    var n_l = parseInt(ccvs_gen_list[obj].node_l) - 1;
    var ctrl_n_m = parseInt(ccvs_gen_list[obj].node_m) - 1;
    var ctrl_n_n = parseInt(ccvs_gen_list[obj].node_n) - 1;
    var transresistance = parseFloat(ccvs_gen_list[obj].label);

    var new_var_V = "V_" + String(ctrl_n_m + 1) + "_";
    var var_list1 = var_list.slice(0, ctrl_n_m + 1);
    var_list1.push(new_var_V);
    var_list2 = var_list1.concat(var_list.slice(ctrl_n_m + 1));
    var_list = var_list2;

    var cond_matrix1 = cond_matrix.slice(0, ctrl_n_m + 1);

    cond_matrix1.push(Array(size).fill(0));
    cond_matrix1 = cond_matrix1.concat(cond_matrix.slice(ctrl_n_m + 1));
    cond_matrix = cond_matrix1;
    var cond_matrix2 = cond_matrix
      .slice(0)
      .map((i) => i.slice(0, ctrl_n_m + 1));
    var cond_matrix3 = cond_matrix.slice(0).map((i) => i.slice(ctrl_n_m + 1));
    for (var j = 0; j < cond_matrix2.length; j++) {
      cond_matrix2[j][cond_matrix2[j].length] = 0;
    }

    var cond_matrix4 = [];
    for (var i = 0; i < cond_matrix2.length; i++) {
      cond_matrix4[i] = cond_matrix2[i].concat(cond_matrix3[i]);
    }
    cond_matrix = cond_matrix4;

    curr_matrix1 = curr_matrix.slice(0, ctrl_n_m + 1);
    curr_matrix1.push(Array(1).fill(0));
    curr_matrix1 = curr_matrix1.concat(curr_matrix.slice(ctrl_n_m + 1));
    curr_matrix = curr_matrix1;

    var new_var_I = "I_" + String(ctrl_n_m + 1) + "_" + String(ctrl_n_n + 1);
    var_list.push(new_var_I);
    cond_matrix.push(Array(cond_matrix[0].length).fill(0));
    var length = cond_matrix[0].length;
    for (var j = 0; j < cond_matrix.length; j++) {
      cond_matrix[j][length] = 0;
    }
    curr_matrix.push(Array(1).fill(0));

    var new_var_I = "I_" + String(n_k + 1) + "_" + String(n_l + 1);
    var_list.push(new_var_I);
    cond_matrix.push(Array(cond_matrix[0].length).fill(0));
    length = cond_matrix[0].length;
    for (var j = 0; j < cond_matrix.length; j++) {
      cond_matrix[j][length] = 0;
    }
    curr_matrix.push(Array(1).fill(0));

    var i_mn = var_list.indexOf(
      "I_" + String(ctrl_n_m + 1) + "_" + String(ctrl_n_n + 1)
    );
    var i_kl = var_list.indexOf("I_" + String(n_k + 1) + "_" + String(n_l + 1));
    if (n_k != -1) {
      n_k = var_list.indexOf("V_" + String(n_k + 1));
    }
    if (n_l != -1) {
      n_l = var_list.indexOf("V_" + String(n_l + 1));
    }
    if (ctrl_n_m != -1) {
      ctrl_n_m = var_list.indexOf("V_" + String(ctrl_n_m + 1));
    }
    if (ctrl_n_n != -1) {
      ctrl_n_n = var_list.indexOf("V_" + String(ctrl_n_n + 1));
    }
    if (n_k != -1 && n_l != -1 && ctrl_n_m != -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][n_l] -= 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1) {
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m == -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m == -1) {
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m == -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[ctrl_n_m + 1][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m + 1] -= 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    }
  }

  for (var obj = 0; obj < ccvs_vs_list.length; obj++) {
    var n_k = parseInt(ccvs_vs_list[obj].node_k) - 1;
    var n_l = parseInt(ccvs_vs_list[obj].node_l) - 1;
    var ctrl_n_m = parseInt(ccvs_vs_list[obj].node_m) - 1;
    var ctrl_n_n = parseInt(ccvs_vs_list[obj].node_n) - 1;
    var transresistance = parseFloat(ccvs_vs_list[obj].label);

    var new_var_I = "I_" + String(ctrl_n_m + 1) + "_" + String(ctrl_n_n + 1);
    var_list.push(new_var_I);
    cond_matrix.push(Array(size).fill(0));
    for (var j = 0; j < size; j++) {
      cond_matrix[i][size] = 0;
    }
    curr_matrix.push(0);

    var new_var_I = "I_" + String(n_k + 1) + "_" + String(n_k + 1);
    var_list.push(new_var_I);
    cond_matrix.push(Array(size).fill(0));
    for (var j = 0; j < size; j++) {
      cond_matrix[i][size] = 0;
    }
    curr_matrix.push(0);

    var i_mn = var_list.index(
      "I_" + String(ctrl_n_m + 1) + "_" + String(ctrl_n_n + 1)
    );
    var i_kl = var_list.indexOf("I_" + String(n_k + 1) + "_" + String(n_l + 1));
    if (n_k != -1) {
      n_k = var_list.indexOf("V_" + String(n_k + 1));
    }
    if (n_l != -1) {
      n_l = var_list.indexOf("V_" + String(n_l + 1));
    }
    if (ctrl_n_m != -1) {
      ctrl_n_m = var_list.indexOf("V_" + String(ctrl_n_m + 1));
    }
    if (ctrl_n_n != -1) {
      ctrl_n_n = var_list.indexOf("V_" + String(ctrl_n_m + 1));
    }

    if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_n][i_mn] -= 1;
      cond_matrix[i_mn][ctrl_n_n] -= 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k == -1 && n_l != -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_l][i_kl] -= 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_kl][n_l] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m == -1 && ctrl_n_n != -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    } else if (n_k != -1 && n_l == -1 && ctrl_n_m != -1 && ctrl_n_n == -1) {
      cond_matrix[n_k][i_kl] += 1;
      cond_matrix[ctrl_n_m][i_mn] += 1;
      cond_matrix[i_mn][ctrl_n_m] += 1;
      cond_matrix[i_kl][n_k] += 1;
      cond_matrix[i_kl][i_mn] -= transresistance;
    }
  }

  for (var obj = 0; obj < resistor_list.length; obj++) {
    var n_k = parseInt(resistor_list[obj].node_k);
    // console.log("n_k: ", n_k);

    var n_l = parseInt(resistor_list[obj].node_l);
    // console.log("n_l: ", n_l);

    if (ccvs_gen_list.length > 0) {
      var ccvs_high = parseInt(ccvs_gen_list[0].node_m);
      // console.log("ccvs_high: ", ccvs_high);
      var ccvs_low = parseInt(ccvs_gen_list[0].node_n);
      // console.log("ccvs_low: ", ccvs_low);

      if (n_l == ccvs_high && n_k == ccvs_low) {
        var temp = n_l;
        n_l = n_k;
        n_k = temp;
        if (n_l <= ccvs_high) {
          n_l = n_l - 1;
        }
      } else if (n_k == ccvs_high && n_l == ccvs_low) {
        n_k = n_k;
        if (n_l <= ccvs_high) {
          n_l = n_l - 1;
        }
      } else if (n_l <= ccvs_high && n_k <= ccvs_high) {
        n_l = n_l - 1;
        n_k = n_k - 1;
      } else if (n_k <= ccvs_high && n_l > ccvs_high) {
        n_k = n_k - 1;
      } else if (n_l <= ccvs_high && n_k > ccvs_high) {
        n_l = n_l - 1;
      }
    } else if (cccs_gen_list.length > 0) {
      var cccs_high = parseInt(cccs_gen_list[0].node_m);
      var cccs_low = parseInt(cccs_gen_list[0].node_n);

      if (n_l == cccs_high && n_k == cccs_low) {
        var temp = n_l;
        n_l = n_k;
        n_k = temp;
        if (n_l <= cccs_high) {
          n_l = n_l - 1;
        }
      } else if (n_k == cccs_high && n_l == cccs_low) {
        n_k = n_k;
        if (n_l <= cccs_high) {
          n_l = n_l - 1;
        }
      } else if (n_l <= cccs_high && n_k <= cccs_high) {
        n_l = n_l - 1;
        n_k = n_k - 1;
      } else if (n_k <= cccs_high && n_l > cccs_high) {
        n_k = n_k - 1;
      } else if (n_l <= cccs_high && n_k > cccs_high) {
        n_l = n_l - 1;
      }
    } else {
      n_k = n_k - 1;
      n_l = n_l - 1;
    }
    // console.log("n_k_after: ", n_k);
    // console.log("n_l_after: ", n_l);

    var conductance = 1.0 / parseFloat(resistor_list[obj].label);
    // console.log("conductance: ", conductance);

    if (n_k != -1 && n_l != -1) {
      cond_matrix[n_k][n_k] += conductance;
      cond_matrix[n_k][n_l] -= conductance;
      cond_matrix[n_l][n_k] -= conductance;
      cond_matrix[n_l][n_l] += conductance;
    } else if (n_k == -1 && n_l != -1) {
      cond_matrix[n_l][n_l] += conductance;
    } else if (n_l == -1 && n_k != -1) {
      cond_matrix[n_k][n_k] += conductance;
    }
  }
  console.log("cond_matrix_final: ", cond_matrix);
  cond_matrix_inv = math.inv(cond_matrix);
  var output_matrix = math.multiply(cond_matrix_inv, curr_matrix);
  console.log(output_matrix);
  var output = document.getElementById("output");
  output.innerHTML = "";
  var h2 = document.createElement("h2");
  h2.setAttribute("style", "padding-bottom: 30px");
  h2.innerHTML = "Output: ";
  output.appendChild(h2);
  for (var i = 0; i < var_list.length; i++) {
    if (var_list[i][0] == "V") {
      console.log(var_list[i] + " = " + output_matrix[i][0].toFixed(2) + " V ");
      var h3 = document.createElement("h3");
      h3.innerHTML =
        var_list[i] + " = " + output_matrix[i][0].toFixed(2) + " V ";
      output.appendChild(h3);
    }

    if (var_list[i][0] == "I") {
      console.log(var_list[i] + " = " + output_matrix[i][0].toFixed(2) + " A ");
      var h3 = document.createElement("h3");
      h3.innerHTML =
        var_list[i] + " = " + output_matrix[i][0].toFixed(2) + " A ";
      output.appendChild(h3);
    }
  }

  var button = document.createElement("button");
  button.setAttribute("class", "btn btn-primary btn-lg my-3");
  button.setAttribute("style", "width: 220px");
  button.setAttribute("onclick", "window.location.reload();");
  button.innerHTML = "Simulate Another";
  output.appendChild(button);
  var button1 = document.createElement("button");
  button1.setAttribute("class", "btn btn-primary btn-lg again my-3");
  button1.setAttribute("style", "width: 220px");
  button1.innerHTML = "Edit";
  output.appendChild(button1);
  $(".again").on("click", function () {
    console.log("again");
    closeModal();
  });
  var img = document.getElementById("preview");
  var button2 = document.createElement("a");
  button2.setAttribute("class", "btn btn-primary btn-lg again my-3");
  button2.setAttribute("style", "width: 220px");
  button2.setAttribute("href", img.src);
  button2.setAttribute("download", "diagram");
  button2.innerHTML = "Save image as PNG";
  output.appendChild(button2);
}
