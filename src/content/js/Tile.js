// A tile is a combination of a ground area and (maybe) an object

var Tile = Class.create(
{
	initialize: function(type, image)
	{
		this.allow = engine.types[type]

		// Tile ground
		this.element = document.createElement("img");
		this.element.setAttribute("src", "content/ground/"+image);
//		this.ground.width = "100%"

//		this.ground.style.position = "absolute"
//		this.ground.style.bottom = "0px"
//		this.ground.style.left = "50%"

		this.element.addEventListener("mouseover", this.onMouseOver);
		this.element.addEventListener("mouseout", this.onMouseOut);

//		this.element.appendChild(this.ground)
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