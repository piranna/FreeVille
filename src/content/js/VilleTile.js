// A tile is a combination of a ground area and (maybe) an object

var VilleTile = Class.create(
{
	initialize: function(tile, type)
	{
		this.type = type

		this.element = document.createElement("img");
		this.element.setAttribute("src", "content/ground/"+tile.image);
//		this.ground.width = "100%"

//		this.ground.style.position = "absolute"
//		this.ground.style.bottom = "0px"
//		this.ground.style.left = "50%"

		this.element.addEventListener("mouseover", this.onMouseOver);
		this.element.addEventListener("mouseout",  this.onMouseOut);
	},

	onMouseOver: function()
	{
		this.style.outline = "#0000FF dotted thin";
	},

	onMouseOut: function()
	{
		this.style.outline = "";
	}
});