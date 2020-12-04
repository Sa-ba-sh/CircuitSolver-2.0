var CCVS_Vs_high = 1;
var CCVS_Vs_low = 1;
CCVS_Vs = draw2d.SVGFigure.extend({
  NAME: "CCVS_Vs",

  init: function () {
    this._super();
    var inputLocator = new draw2d.layout.locator.InputPortLocator();
    var outputLocator = new draw2d.layout.locator.OutputPortLocator();
    
    this.createPort("hybrid", inputLocator);
    this.createPort("hybrid", outputLocator);
    this.label = new draw2d.shape.basic.Label({
      text: "CCVS_Vs",
      color: "#0d0d0d",
      fontColor: "#0d0d0d",
    });

    // add the new decoration to the connection with a position locator.
    //
    this.add(this.label, new draw2d.layout.locator.TopLocator(this));
    this.label.installEditor(new draw2d.ui.LabelInplaceEditor());

    this.label1 = new draw2d.shape.basic.Label({
      text: "High",
      color: "#0d0d0d",
      fontColor: "#0d0d0d",
    });
    this.label1.id = "highCCVS_Vs" + CCVS_Vs_high++;

    // add the new decoration to the connection with a position locator.
    //
    this.add(this.label1, new draw2d.layout.locator.LeftLocator(this));

    this.label1.installEditor(new draw2d.ui.LabelInplaceEditor());
    this.label2 = new draw2d.shape.basic.Label({
      text: "Low",
      color: "#0d0d0d",
      fontColor: "#0d0d0d",
    });
    this.label2.id = "lowCCVS_Vs" + CCVS_Vs_low++;

    // add the new decoration to the connection with a position locator.
    //
    this.add(this.label2, new draw2d.layout.locator.RightLocator(this));

    this.label2.installEditor(new draw2d.ui.LabelInplaceEditor());

    // labels are added via JSON document.
  },

  /**
   * @method
   * Return an objects with all important attributes for XML or JSON serialization
   *
   * @returns {Object}
   */
  getPersistentAttributes: function () {
    var memento = this._super();

    // add all decorations to the memento
    //
    memento.labels = [];
    this.children.each(function (i, e) {
      var labelJSON = e.figure.getPersistentAttributes();
      labelJSON.locator = e.locator.NAME;
      memento.labels.push(labelJSON);
    });

    return memento;
  },

  /**
   * @method
   * Read all attributes from the serialized properties and transfer them into the shape.
   *
   * @param {Object} memento
   * @returns
   */
  setPersistentAttributes: function (memento) {
    this._super(memento);

    // remove all decorations created in the constructor of this element
    //
    this.resetChildren();

    // and add all children of the JSON document.
    //
    $.each(
      memento.labels,
      $.proxy(function (i, json) {
        // create the figure stored in the JSON
        var figure = eval("new " + json.type + "()");

        // apply all attributes
        figure.attr(json);

        // instantiate the locator
        var locator = eval("new " + json.locator + "()");

        // add the new figure as child to this figure
        this.add(figure, locator);
      }, this)
    );
  },
  onDoubleClick: function () {
    this.setRotationAngle((this.getRotationAngle() + 90) % 360);
  },
  getSVG: function () {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">' +
      '<polygon points="20,0 40,30 20,60 0,30" style="stroke:black;stroke-width:1" />' +
      '<line x1="12.5" y1="25" x2="12.5" y2="35" style="stroke:rgb(0,0,0);stroke-width:1" />' +
      '<line x1="30" y1="25" x2="30" y2="35" style="stroke:rgb(0,0,0);stroke-width:1" />' +
      '<line x1="25" y1="30" x2="35" y2="30" style="stroke:rgb(0,0,0);stroke-width:1" />' +
      "</svg>"
    );
  },
});
